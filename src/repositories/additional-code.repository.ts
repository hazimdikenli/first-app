import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MyLocalDbDataSource} from '../datasources';
import {AdditionalCode, AdditionalCodeRelations} from '../models';

export class AdditionalCodeRepository extends DefaultCrudRepository<
  AdditionalCode,
  typeof AdditionalCode.prototype.id,
  AdditionalCodeRelations
> {
  constructor(
    @inject('datasources.MyLocalDb') dataSource: MyLocalDbDataSource,
  ) {
    super(AdditionalCode, dataSource);
  }
}
