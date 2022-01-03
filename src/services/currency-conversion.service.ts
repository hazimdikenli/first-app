/* eslint-disable @typescript-eslint/naming-convention */
import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CurrencyExchangeRate} from '../models';
import {CurrencyExchangeRateRepository} from '../repositories';

type CurrencyCode = 'TRY' | 'GBP' | 'USD' | 'EUR' | string;

/* this service just uses TCMB - Turkish Central Bank Rates at the moment
Our scope is limited to above currency codes
*/
export interface ConversionParams {
  amount: number;
  sourceCC: CurrencyCode;
  dateAsIso: string;
  targetCC: CurrencyCode;
  exchangeType: string;
}
export class CurrencyConversionService {
  constructor(
    @repository(CurrencyExchangeRateRepository)
    public currencyExchangeRateRepository: CurrencyExchangeRateRepository,
  ) {}

  async convert({
    amount,
    sourceCC,
    dateAsIso,
    targetCC,
    exchangeType,
  }: ConversionParams): Promise<number> {
    if (sourceCC === targetCC) return amount;
    if (Number(amount) === 0) return amount;

    const sourceRate = await this.getExchangeRateForDate({
      targetCC: sourceCC,
      dateAsIso,
      exchangeType,
    });
    if (isNaN(sourceRate) || !sourceRate) {
      throw new Error(`${sourceCC} ${dateAsIso}`);
    }
    const targetRate = await this.getExchangeRateForDate({
      targetCC,
      dateAsIso,
      exchangeType,
    });
    if (isNaN(targetRate) || !targetRate) {
      throw new Error(`${targetCC} ${dateAsIso}`);
    }

    const value = (amount * sourceRate) / targetRate;
    const valueRounded = Math.round(value * 100) / 100;
    return valueRounded;
  }

  async getExchangeRateForDate({
    targetCC,
    dateAsIso,
    exchangeType,
  }: {
    dateAsIso: string;
    targetCC: CurrencyCode;
    exchangeType: string;
  }): Promise<number> {
    if (targetCC === 'TL') targetCC = 'TRY';
    if (targetCC === 'TRY' && exchangeType.includes('TCMB.')) return 1;

    let exchangeRatesFromDB = await this.getExchangeRateFromDBbyDate(dateAsIso);
    const currencyExchangeRate = exchangeRatesFromDB?.find(
      exchangeRate =>
        exchangeRate.currency_code === targetCC &&
        exchangeRate.exchange_type === exchangeType,
    );
    return currencyExchangeRate?.target_amount ?? NaN;
  }

  async getExchangeRateFromDBbyDate(
    dateAsIso: string,
  ): Promise<CurrencyExchangeRate[]> {
    let exchangeRateFromDB: CurrencyExchangeRate[];
    try {
      exchangeRateFromDB = await this.currencyExchangeRateRepository.find({
        where: {
          date: dateAsIso,
        },
      });
    } catch (err) {
      console.error('Something went wrong getting exhange rates by date', err);
      throw err;
    }

    return exchangeRateFromDB;
  }
}
