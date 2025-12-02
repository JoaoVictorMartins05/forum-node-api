import { Either, right } from '../../../core/either'
import { AnswerComment } from '../../enterprise/entities/answer-comment'
import { AnswerCommentsRepository } from '../repositories/answer-comments-repository'

interface FetchAnswerCommentsRequest {
  page: number
  answerId: string
}

type FetchAnswerCommentsUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentsUseCase {
  constructor(private commentRepository: AnswerCommentsRepository) {}

  async execute({
    page,
    answerId,
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
    const answerComments = await this.commentRepository.findManyByAnswerId(
      { page },
      answerId,
    )

    return right({ answerComments })
  }
}
