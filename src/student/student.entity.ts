import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

@Entity('students')
export class Student {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  id: string;

  @Column()
  fname: string;

  @Column()
  lname: string;
}
