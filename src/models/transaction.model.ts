import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Users from './users.models';

@Table({ tableName: 'transactions' })
class Transactions extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.INTEGER)
  counts!: number;

  @Column(DataType.STRING)
  category!: string;

  @Column(DataType.STRING)
  merchant!: string;

  @Column(DataType.ENUM('debit', 'credit'))
  transactionType!: string;

  @BelongsTo(() => Users)
  users!: Users;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;
}

export default Transactions;
