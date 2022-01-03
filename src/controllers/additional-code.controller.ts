import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {AdditionalCode} from '../models';
import {AdditionalCodeRepository} from '../repositories';

export class AdditionalCodeController {
  constructor(
    @repository(AdditionalCodeRepository)
    public additionalCodeRepository : AdditionalCodeRepository,
  ) {}

  @post('/additional-codes')
  @response(200, {
    description: 'AdditionalCode model instance',
    content: {'application/json': {schema: getModelSchemaRef(AdditionalCode)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalCode, {
            title: 'NewAdditionalCode',
            exclude: ['id'],
          }),
        },
      },
    })
    additionalCode: Omit<AdditionalCode, 'id'>,
  ): Promise<AdditionalCode> {
    return this.additionalCodeRepository.create(additionalCode);
  }

  @get('/additional-codes/count')
  @response(200, {
    description: 'AdditionalCode model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AdditionalCode) where?: Where<AdditionalCode>,
  ): Promise<Count> {
    return this.additionalCodeRepository.count(where);
  }

  @get('/additional-codes')
  @response(200, {
    description: 'Array of AdditionalCode model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AdditionalCode, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AdditionalCode) filter?: Filter<AdditionalCode>,
  ): Promise<AdditionalCode[]> {
    return this.additionalCodeRepository.find(filter);
  }

  @patch('/additional-codes')
  @response(200, {
    description: 'AdditionalCode PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalCode, {partial: true}),
        },
      },
    })
    additionalCode: AdditionalCode,
    @param.where(AdditionalCode) where?: Where<AdditionalCode>,
  ): Promise<Count> {
    return this.additionalCodeRepository.updateAll(additionalCode, where);
  }

  @get('/additional-codes/{id}')
  @response(200, {
    description: 'AdditionalCode model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AdditionalCode, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AdditionalCode, {exclude: 'where'}) filter?: FilterExcludingWhere<AdditionalCode>
  ): Promise<AdditionalCode> {
    return this.additionalCodeRepository.findById(id, filter);
  }

  @patch('/additional-codes/{id}')
  @response(204, {
    description: 'AdditionalCode PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AdditionalCode, {partial: true}),
        },
      },
    })
    additionalCode: AdditionalCode,
  ): Promise<void> {
    await this.additionalCodeRepository.updateById(id, additionalCode);
  }

  @put('/additional-codes/{id}')
  @response(204, {
    description: 'AdditionalCode PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() additionalCode: AdditionalCode,
  ): Promise<void> {
    await this.additionalCodeRepository.replaceById(id, additionalCode);
  }

  @del('/additional-codes/{id}')
  @response(204, {
    description: 'AdditionalCode DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.additionalCodeRepository.deleteById(id);
  }
}
