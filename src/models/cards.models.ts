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
} from 'sequelize-typescript';
import Users from './users.models';

@Table({ tableName: 'cards' })
class Cards extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  id!: number;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.INTEGER)
  counts!: number;

  @BelongsTo(() => Users)
  users!: Users;

  @ForeignKey(() => Users)
  @Column(DataType.INTEGER)
  userId!: number;

  @CreatedAt
  @Column(DataType.DATE)
  createdAt!: Date;

  @UpdatedAt
  @Column(DataType.DATE)
  updatedAt!: Date;

  @DeletedAt
  @Column(DataType.DATE)
  deletedAt!: Date;
}

export default Cards;
