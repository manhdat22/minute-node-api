import {
  Model,
  DataTypes,
  Optional,
  ModelScopeOptions,
  ModelValidateOptions,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyCreateAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyHasAssociationMixin,
} from 'sequelize'
import { CustomValidationError } from '../utils/exceptions/custom_validation_error'
import { sequelize } from '.'
import { Checklist } from './checklist.model'

const RepositoryDefinition = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  userId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
  },
  url: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  username: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}

export interface RepositoryAttributes {
  id?: number
  userId?: number
  name: string
  url: string
  username: string
  password: string
}

export interface RepositoryCreationAttributes
  extends Optional<RepositoryAttributes, 'id'> {}

export class Repository
  extends Model<RepositoryAttributes, RepositoryCreationAttributes>
  implements RepositoryAttributes
{
  public id?: number
  public userId: number
  public name: string
  public url: string
  public username: string
  public password: string

  public getChecklists!: HasManyGetAssociationsMixin<Checklist>
  public addChecklist!: HasManyAddAssociationMixin<Checklist, number>
  public hasChecklist!: HasManyHasAssociationMixin<Checklist, number>
  public createChecklist!: HasManyCreateAssociationMixin<Checklist>
  public countChecklist!: HasManyCountAssociationsMixin

  static readonly scopes: ModelScopeOptions = {}

  static readonly validations: ModelValidateOptions = {
    titleMaxLength() {
      if (this.name.length > 10) {
        throw new CustomValidationError('name', 'title max length')
      }
    },
  }
}

// Initialization
Repository.init(RepositoryDefinition, {
  sequelize,
  tableName: 'repositories',
  underscored: true,
  updatedAt: true,
  createdAt: true,
  scopes: Repository.scopes,
  validate: Repository.validations,
})
