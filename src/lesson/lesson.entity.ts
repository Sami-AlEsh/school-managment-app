import { PrimaryColumn, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Lesson {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;
}