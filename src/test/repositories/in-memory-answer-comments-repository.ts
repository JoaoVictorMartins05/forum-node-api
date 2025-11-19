import { AnswerCommentsRepository } from '../../domain/forum/application/repositories/answer-comments-repository'
import { AnswerComment } from '../../domain/forum/enterprise/entities/answer-comment'

export class InMemoryAnswerCommentsRepository
  implements AnswerCommentsRepository
{
  public items: AnswerComment[] = []

  async create(answerComment: AnswerComment): Promise<void> {
    this.items.push(answerComment)
  }

  async findById(answerCommentId: string): Promise<AnswerComment | null> {
      return (
        this.items.find(
          (answerComment) =>
            answerComment.id.toString() === answerCommentId,
        ) || null
      )
    }
  
  async delete(answerComment: AnswerComment): Promise<void> {
      const itemId = this.items.findIndex(
        (item) => item.id === answerComment.id,
      )
      if (itemId >= 0) {
        this.items.splice(itemId, 1)
      }
    }

  async findManyByAnswerId(
      { page }: { page: number },
      answerId: string,
    ): Promise<AnswerComment[]> {
      const COMMENTS_PER_PAGE = 20
      return this.items
        .filter(
          (answerComment) =>
            answerComment.answerId.toString() === answerId,
        )
        .slice((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE)
    }
}
