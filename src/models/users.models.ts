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
import Transactions from './transaction.models';

@Table({ tableName: 'users' })
class Users extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Unique
  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public firstname!: string;

  @Column(DataType.STRING)
  public lastname!: string;

  @Column(DataType.STRING)
  public phonenumber!: string;

  @Column(DataType.STRING)
  public password!: string;

  @Column(DataType.STRING)
  public merchant!: string;

  @HasMany(() => Cards)
  public cards: Cards[];

  @HasMany(() => Transactions)
  public transactions: Transactions;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updatedAt!: Date;

  @BeforeCreate
  static encryptPassword(user: Users) {
    user.password = bcrypt.hashSync(user.password, 10);
  }
}

export default Users;
