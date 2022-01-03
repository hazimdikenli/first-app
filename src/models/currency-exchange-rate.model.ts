import {Entity, model, property} from '@loopback/repository';

@model({name: 'currency_exchange_rate'})
export class CurrencyExchangeRate extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    name: 'exchange_date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    required: true,
  })
  currency_code: string;

  @property({
    type: 'string',
    required: true,
  })
  exchange_type: string;

  @property({
    type: 'number',
    required: true,
    postgresql: {
      dataType: 'numeric(17,5)',
    },
  })
  target_amount: number;

  @property({
    type: 'string',
    required: true,
  })
  target_currency_code: string;

  @property({
    type: 'date',
  })
  created_at?: string;

  constructor(data?: Partial<CurrencyExchangeRate>) {
    super(data);
  }
}

export interface CurrencyExchangeRateRelations {
  // describe navigational properties here
}

export type CurrencyExchangeRateWithRelations = CurrencyExchangeRate &
  CurrencyExchangeRateRelations;
