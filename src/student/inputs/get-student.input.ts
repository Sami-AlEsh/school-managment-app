import { IsNotEmpty, IsUUID } from 'class-validator';
import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class GetStudentInput {
  @IsUUID()
  @IsNotEmpty()
  @Field((type) => ID)
  id: string;
}
