import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { Student } from './student.entity';
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './inputs/create-student.input';
import { GetStudentInput } from './inputs/get-student.input';
@Resolver((of) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => StudentType)
  async getStudentById(
    @Args('getStudentInput')
    getStudentInput: GetStudentInput,
  ): Promise<Student> {
    return this.studentService.getStudentById(getStudentInput);
  }

  @Query((returns) => [StudentType])
  async getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Mutation((returns) => StudentType)
  async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }
}
