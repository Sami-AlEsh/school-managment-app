import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class GetStudentInput {
  @Field()
  id: string;
}
