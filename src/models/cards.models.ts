import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  UpdatedAt,
  HasMany,
} from 'sequelize-typescript';
import Transactions from './transaction.models';
import Users from './users.models';

@Table({ tableName: 'cards' })
class Cards extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.STRING)
  public name: string;

  @Column(DataType.INTEGER)
  public counts!: number;

  @Column(DataType.INTEGER)
  public balance!: number;

  @HasMany(() => Transactions)
  public transactions!: Transactions;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  public userId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  public updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  public deletedAt!: Date;
}

export default Cards;
