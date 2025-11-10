import { PaginationParams } from '../../domain/core/repositories/pagination-params'
import { QuestionRepository } from '../../domain/forum/application/repositories/question-repository'
import { Question } from '../../domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionRepository {
  public items: Question[] = []

  async create(question: Question): Promise<void> {
    this.items.push(question)
  }

  async getQuestionBySlug(slug: string): Promise<Question | null> {
    return this.items.find((question) => question.slug.value === slug) || null
  }

  async delete(question: Question): Promise<void> {
    const itemId = this.items.findIndex((item) => item.id === question.id)
    if (itemId >= 0) {
      this.items.splice(itemId, 1)
    }
  }

  async findById(questionId: string): Promise<Question | null> {
    return (
      this.items.find((question) => question.id.toString() === questionId) ||
      null
    )
  }

  async save(question: Question): Promise<void> {
    const itemId = this.items.findIndex((item) => item.id === question.id)
    if (itemId >= 0) {
      this.items[itemId] = question
    }
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const itemsPerPage = 20
    const startIndex = (page - 1) * itemsPerPage
    const endIndex = page * itemsPerPage

    const sortedItems = this.items.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    )

    return sortedItems.slice(startIndex, endIndex)
  }
}
