import { AnswersRepository } from '../../domain/forum/application/repositories/answer-repository'
import { Answer } from '../../domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async create(answer: Answer): Promise<void> {
    this.items.push(answer)
  }

  async delete(answer: Answer): Promise<void> {
    const itemId = this.items.findIndex((item) => item.id === answer.id)
    if (itemId >= 0) {
      this.items.splice(itemId, 1)
    }
  }

  async findById(answerId: string): Promise<Answer | null> {
    return (
      this.items.find((answer) => answer.id.toString() === answerId) || null
    )
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    if (itemIndex >= 0) {
      this.items[itemIndex] = answer
    }
  }
}
