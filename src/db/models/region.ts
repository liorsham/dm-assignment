import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'regions',
  timestamps: false
})
export class Region extends Model {
  @Column({
    type: DataType.STRING,
    primaryKey: true
  })
  region_code!: string;

  @Column({
    type: DataType.STRING
  })
  region_name!: string;
}
