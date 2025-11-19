import { QuestionCommentsRepository } from '../../domain/forum/application/repositories/question-comments-repository'
import { QuestionComment } from '../../domain/forum/enterprise/entities/question-comment'

export class InMemoryQuestionCommentsRepository
  implements QuestionCommentsRepository
{
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment): Promise<void> {
    this.items.push(questionComment)
  }

  async findById(questionCommentId: string): Promise<QuestionComment | null> {
    return (
      this.items.find(
        (questionComment) =>
          questionComment.id.toString() === questionCommentId,
      ) || null
    )
  }

  async delete(questionComment: QuestionComment): Promise<void> {
    const itemId = this.items.findIndex(
      (item) => item.id === questionComment.id,
    )
    if (itemId >= 0) {
      this.items.splice(itemId, 1)
    }
  }

  async findManyByQuestionId(
    { page }: { page: number },
    questionId: string,
  ): Promise<QuestionComment[]> {
    const COMMENTS_PER_PAGE = 20
    return this.items
      .filter(
        (questionComment) =>
          questionComment.questionId.toString() === questionId,
      )
      .slice((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE)
  }
}
