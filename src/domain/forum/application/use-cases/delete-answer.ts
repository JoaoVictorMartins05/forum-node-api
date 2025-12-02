import { Either, left, right } from '../../../core/either'
import { AnswersRepository } from '../repositories/answer-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAnswerRequest {
  answerId: string
  userId: string
}

type DeleteAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Record<string, never>
>
export class DeleteAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    userId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (answer.authorId.toString() !== userId) {
      return left(new NotAllowedError())
    }

    await this.answerRepository.delete(answer)

    return right({})
  }
}
