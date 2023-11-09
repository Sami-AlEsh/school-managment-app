import { Repository, In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

import { Student } from './student.entity';
import { CreateStudentInput } from './inputs/create-student.input';
import { GetStudentInput } from './inputs/get-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async getStudentById(getStudentInput: GetStudentInput): Promise<Student> {
    const { id } = getStudentInput;
    return this.studentRepository.findOne({ where: { id } });
  }

  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async createStudent(createStudentInput: CreateStudentInput) {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uuid(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  async getStudentsByIds(studentsIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: In(studentsIds),
      },
    });
  }
}
