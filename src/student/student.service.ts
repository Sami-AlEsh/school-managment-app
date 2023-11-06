import { Repository } from 'typeorm';
import { Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Student } from './student.entity';
import { CreateStudentInput } from './create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) {}

  async createStudent(
    @Args('createStudentInput')
    createStudentInput: CreateStudentInput,
  ) {
    const { name, fname, lname } = createStudentInput;

    const student = this.studentRepository.create({
      name,
      fname,
      lname,
    });

    return this.studentRepository.save(student);
  }
}
