import { Args, Query, Resolver } from '@nestjs/graphql';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './create-student.input';

@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => StudentType)
  async getStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    this.studentService.createStudent(createStudentInput);
  }
}
