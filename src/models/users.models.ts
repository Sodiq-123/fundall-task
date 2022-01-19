import bcrypt from 'bcrypt';
import {
  AutoIncrement,
  BeforeCreate,
  Column,
  CreatedAt,
  DataType,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
  UpdatedAt,
} from 'sequelize-typescript';
import Cards from './cards.models';

@Table({ tableName: 'users' })
class Users extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.STRING)
  firstname!: string;

  @Column(DataType.STRING)
  lastname!: string;

  @Column(DataType.STRING)
  phonenumber!: string;

  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  merchant!: string;

  @HasMany(() => Cards)
  cards: Cards[];

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @BeforeCreate
  static encryptPassword(user: Users) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
}

export default Users;
