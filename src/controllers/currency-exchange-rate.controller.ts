import {repository} from '@loopback/repository';
import {get, param, post} from '@loopback/rest';
import {CurrencyExchangeRateRepository} from '../repositories';
import {inject} from '@loopback/core';
import { CURRENCY_CONVERSION_SERVICE } from '../keys';
import { CurrencyConversionService } from '../services';

//const debug = require('debug')('tramas-app:CurrencyExchangeRateController');

export class CurrencyExchangeRateController {
  constructor(
    @repository(CurrencyExchangeRateRepository)
    public currencyExchangeRateRepository: CurrencyExchangeRateRepository,
    @inject(CURRENCY_CONVERSION_SERVICE)
    public currencyConversionService: CurrencyConversionService,
  ) {}

  // ¢ data query

  @get('/public/exchange-rate/convert-currency', {
    responses: {
      '200': {
        description: 'A conversion amount of spesified params was gotten',
      },
    },
  })
  async getRate(
    @param.query.number('amount') amount: number,
    @param.query.string('sourceCC') sourceCC: string,
    @param.query.string('dateAsIso') dateAsIso: string,
    @param.query.string('targetCC') targetCC: string,
    @param.query.string('exchangeType') exchangeType: string,
  ): Promise<number | undefined> {
    const value = await this.currencyConversionService.convert({
      amount,
      sourceCC,
      dateAsIso,
      targetCC,
      exchangeType,
    });
    return value;
  }

  @get('/exchange-rates',{
    responses: {
      '200': {
        description: 'Return tcmb rates for the date',
      },
    },

  })
  async getRates(
    @param.query.string('dateAsIso') dateAsIso: string,

  ){
    return this.currencyConversionService.getExchangeRateFromDBbyDate(dateAsIso);
  }
}
