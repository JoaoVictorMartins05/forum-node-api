import { PaginationParams } from '../../../core/repositories/pagination-params'
import { Question } from '../../enterprise/entities/question'

export interface QuestionRepository {
  getQuestionBySlug(slug: string): Promise<Question | null>
  create(question: Question): Promise<void>
  delete(question: Question): Promise<void>
  findById(questionId: string): Promise<Question | null>
  findManyRecent(params: PaginationParams): Promise<Question[]>
  save(question: Question): Promise<void>
}
