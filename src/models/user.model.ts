import {
  Model,
  DataTypes,
  Optional,
  Sequelize,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
} from 'sequelize'
import { sequelize } from '.'
import { Post } from './post.model'

const UserDefinition = {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}
export interface UserAttributes {
  id: number
  userName: string
  email: string
}

export interface UserCreationAttributes
  extends Optional<UserAttributes, 'id'> {}

export class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number
  public userName!: string
  public email!: string

  public getPosts!: HasManyGetAssociationsMixin<Post>
  public addPost!: HasManyAddAssociationMixin<Post, number>
  public hasPost!: HasManyHasAssociationMixin<Post, number>
  public countPosts!: HasManyCountAssociationsMixin
  public createPost!: HasManyCreateAssociationMixin<Post>
}

// Initialization
User.init(UserDefinition, {
  sequelize,
  tableName: 'users',
  underscored: true,
  updatedAt: true,
  createdAt: true,
})
