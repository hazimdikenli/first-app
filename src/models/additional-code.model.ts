import {Entity, model, property} from '@loopback/repository';

@model()
export class AdditionalCode extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
  })
  code?: string;

  @property({
    type: 'string',
  })
  description?: string;


  constructor(data?: Partial<AdditionalCode>) {
    super(data);
  }
}

export interface AdditionalCodeRelations {
  // describe navigational properties here
}

export type AdditionalCodeWithRelations = AdditionalCode & AdditionalCodeRelations;
