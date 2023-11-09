import {
  Query,
  Resolver,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';

import { Lesson } from './lesson.entity';
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { Student } from 'src/student/student.entity';
import { CreateLessonInput } from './input/lesson.input';
import { StudentService } from 'src/student/student.service';
import { AssignStudentsInput } from './input/assign-students.input';
import { StudentType } from 'src/student/student.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  @Query((returns) => LessonType)
  async getLesson(@Args('id') id: string): Promise<Lesson> {
    return this.lessonService.getLesson(id);
  }

  @Query((returns) => [LessonType])
  async getLessons(): Promise<Lesson[]> {
    return this.lessonService.getLessons();
  }

  @Mutation((returns) => LessonType)
  async createLesson(
    @Args('createLessonInput') createLesson: CreateLessonInput,
  ): Promise<Lesson> {
    return this.lessonService.createLesson(createLesson);
  }

  @Mutation((returns) => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsInput')
    assignStudentsInput: AssignStudentsInput,
  ): Promise<Lesson> {
    return this.lessonService.assignStudentsToLesson(assignStudentsInput);
  }

  @ResolveField('students', (type) => [StudentType])
  async getStudents(@Parent() lesson: Lesson): Promise<Student[]> {
    return this.studentService.getStudentsByIds(lesson.studentsIds);
  }
}
