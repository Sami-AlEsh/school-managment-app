import { Field, InputType } from '@nestjs/graphql';
import { IsDateString, IsNotEmpty } from 'class-validator';

@InputType()
export class createLessonInput {
  @IsNotEmpty()
  @Field()
  name: string;

  @IsDateString()
  @Field()
  startDate: string;

  @IsDateString()
  @Field()
  endDate: string;
}
