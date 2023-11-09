import { v4 as uuid } from 'uuid';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './input/lesson.input';
import { AssignStudentsInput } from './input/assign-students.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ where: { id } });
  }

  getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  async createLesson(createLessonInput: CreateLessonInput): Promise<Lesson> {
    const { name, startDate, endDate, studentsIds } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      studentsIds,
    });

    return this.lessonRepository.save(lesson);
  }

  async assignStudentsToLesson(
    assignStudentsInput: AssignStudentsInput,
  ): Promise<Lesson> {
    const { lessonId, studentsIds } = assignStudentsInput;
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    const studentsIdsSet = new Set(...lesson.studentsIds, ...studentsIds);
    lesson.studentsIds = Array.from(studentsIdsSet);
    return this.lessonRepository.save(lesson);
  }
}
