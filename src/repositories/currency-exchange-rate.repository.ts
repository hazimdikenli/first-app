import {DefaultCrudRepository} from '@loopback/repository';
import {MyLocalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';
import { CurrencyExchangeRate, CurrencyExchangeRateRelations } from 'common-models';

export class CurrencyExchangeRateRepository extends DefaultCrudRepository<
  CurrencyExchangeRate,
  typeof CurrencyExchangeRate.prototype.id,
  CurrencyExchangeRateRelations
> {
  constructor(
    @inject('datasources.MyLocalDb') dataSource: MyLocalDbDataSource,
  ) {
    super(CurrencyExchangeRate, dataSource);
  }
}
