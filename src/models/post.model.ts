import { type } from 'os'
import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  ModelDefined,
  ModelAttributes,
  ModelScopeOptions,
  ModelValidateOptions,
  ValidationError,
  ValidationErrorItem,
} from 'sequelize'
import { CustomValidationError } from '../utils/exceptions/custom_validation_error'
import { sequelize } from '../models'
import { User } from './user.model'

const PostDefinition = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT({ length: 'medium' }),
    allowNull: false,
  },
}

export interface PostAttributes {
  id: number
  title: string
  content: string
}

export interface PostCreationAttributes
  extends Optional<PostAttributes, 'id'> {}

export class Post
  extends Model<PostAttributes, PostCreationAttributes>
  implements PostAttributes
{
  public id!: number
  public title!: string
  public content!: string

  static readonly scopes: ModelScopeOptions = {}

  static readonly validations: ModelValidateOptions = {
    titleMaxLength() {
      if (this.title.length > 10) {
        throw new CustomValidationError('title', 'title max length')
      }
    },
  }
}

// Initialization
Post.init(PostDefinition, {
  sequelize,
  tableName: 'posts',
  underscored: true,
  updatedAt: true,
  createdAt: true,
  scopes: Post.scopes,
  validate: Post.validations,
})

// Associations
Post.belongsTo(User)
User.hasMany(Post, { as: 'posts' })
