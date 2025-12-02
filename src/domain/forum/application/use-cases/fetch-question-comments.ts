import { Either, right } from '../../../core/either'
import { QuestionComment } from '../../enterprise/entities/question-comment'
import { QuestionCommentsRepository } from '../repositories/question-comments-repository'

interface FetchQuestionCommentsRequest {
  page: number
  questionId: string
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>
export class FetchQuestionCommentsUseCase {
  constructor(private commentRepository: QuestionCommentsRepository) {}

  async execute({
    page,
    questionId,
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.commentRepository.findManyByQuestionId(
      { page },
      questionId,
    )

    return right({ questionComments })
  }
}
