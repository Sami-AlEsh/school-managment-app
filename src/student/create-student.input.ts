import { ObjectType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@ObjectType('Student')
export class CreateStudentInput {
  @IsNotEmpty()
  fname: string;

  @IsNotEmpty()
  lname: string;
}
