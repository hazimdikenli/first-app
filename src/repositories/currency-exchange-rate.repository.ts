import {DefaultCrudRepository} from '@loopback/repository';
import {CurrencyExchangeRate, CurrencyExchangeRateRelations} from '../models';
import {MyLocalDbDataSource} from '../datasources';
import {inject} from '@loopback/core';

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
