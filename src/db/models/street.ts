import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { City } from './city';

@Table({
  tableName: 'streets',
  timestamps: false,
})
export class Street extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
  })
  street_code!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  street_name_status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  official_code!: number;

  @ForeignKey(() => City)
  @Column({
    type: DataType.INTEGER,
  })
  city_code!: number;

  @BelongsTo(() => City)
  city!: City;
}
