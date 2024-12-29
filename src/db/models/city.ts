import { Table, Column, Model, DataType, ForeignKey, BelongsTo, HasMany } from 'sequelize-typescript';
import { Region } from './region';
import { Street } from './street';

@Table({
  tableName: 'cities',
  timestamps: false,
})
export class City extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  city_code!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  city_name!: string;

  @ForeignKey(() => Region)
  @Column({
    type: DataType.INTEGER,
  })
  region_code!: number;

  @BelongsTo(() => Region)
  region!: Region;

  @HasMany(() => Street)
  streets!: Street[];
}
