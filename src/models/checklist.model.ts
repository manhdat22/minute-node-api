import {
  Model,
  DataTypes,
  Optional,
  ModelScopeOptions,
  ModelValidateOptions,
  BelongsToGetAssociationMixin,
} from 'sequelize'
import { CustomValidationError } from '../utils/exceptions/custom_validation_error'
import { sequelize } from '.'
import { Repository } from './repository.model'

const ChecklistDefinition = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  repositoryId: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  type: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  pattern: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  note: {
    allowNull: false,
    type: DataTypes.TEXT,
  },
  file: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  regex: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
}

export interface ChecklistAttributes {
  id?: number
  repositoryId?: number
  type: number
  pattern: string
  note: string
  file: string
  regex: boolean
}

export interface ChecklistCreationAttributes
  extends Optional<ChecklistAttributes, 'id'> {}

export class Checklist
  extends Model<ChecklistAttributes, ChecklistCreationAttributes>
  implements ChecklistAttributes
{
  public id?: number
  public repositoryId?: number
  public type: number
  public pattern: string
  public note: string
  public file: string
  public regex: boolean

  public getRepository!: BelongsToGetAssociationMixin<Repository>

  static readonly scopes: ModelScopeOptions = {}

  static readonly validations: ModelValidateOptions = {}
}

// Initialization
Checklist.init(ChecklistDefinition, {
  sequelize,
  tableName: 'checklists',
  underscored: true,
  updatedAt: true,
  createdAt: true,
  scopes: Checklist.scopes,
  validate: Checklist.validations,
})

// Association
Repository.hasMany(Checklist, { as: 'checklists' })
Checklist.belongsTo(Repository)
