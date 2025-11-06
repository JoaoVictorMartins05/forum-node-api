import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  getQuestionBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  delete(answer: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
  save(question: Question): Promise<void>
}
