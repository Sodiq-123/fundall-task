import {
  AutoIncrement,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import Cards from './cards.models';
import Users from './users.models';

@Table({ tableName: 'transactions' })
class Transactions extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  public id!: number;

  @Column(DataType.INTEGER)
  public counts!: number;

  @Column(DataType.UUID)
  public reference!: string;

  @Column(DataType.STRING)
  public category!: string;

  @Column(DataType.INTEGER)
  public amount!: number;

  @Column(DataType.STRING)
  public merchant!: string;

  @Column(DataType.ENUM('debit', 'credit'))
  public transactionType!: string;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  public userId!: number;

  @ForeignKey(() => Cards)
  @Column(DataType.INTEGER)
  public cardId: number;

  @CreatedAt
  @Column(DataType.DATE)
  public createdAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  public deletedAt!: Date;
}

export default Transactions;
