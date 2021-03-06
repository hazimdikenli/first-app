import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import path from 'path';
import {MySequence} from './sequence';
import {CURRENCY_CONVERSION_SERVICE} from './keys';
import {CurrencyConversionService} from 'common-models';
import {CurrencyExchangeRateRepository} from 'common-models';

export {ApplicationConfig};

export class FirstAppApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.configure(RestExplorerBindings.COMPONENT).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.setUpBindings();

    this.projectRoot = __dirname;
    
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
      // this is not working, we still need to bind for the repository
      repositories: {
        dirs: [
          'repositories',
          'node_modules/common-models/dist/repositories',
          '../../../packages/common-models/dist/repositories',
        ],
      },
    };
  }
  private setUpBindings(): void {
    this.bind(CURRENCY_CONVERSION_SERVICE).toClass(CurrencyConversionService);

    this.bind('repositories.CurrencyExchangeRateRepository').toClass(
      CurrencyExchangeRateRepository,
    );
  }
}
