import { BindingKey } from '@loopback/core';
import { CurrencyConversionService } from 'common-models';

export const CURRENCY_CONVERSION_SERVICE = BindingKey.create<CurrencyConversionService>(
  'services.currency.conversion.service',
);
