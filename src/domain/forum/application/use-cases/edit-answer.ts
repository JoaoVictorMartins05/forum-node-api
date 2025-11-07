import { Answer } from '../../enterprise/entities/answer'
import { AnswersRepository } from '../repositories/answer-repository'

interface EditAnswerRequest {
  answerId: string
  userId: string
  content: string
}

interface EditAnswerResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(private answerRepository: AnswersRepository) {}

  async execute({
    answerId,
    userId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (answer.authorId.toString() !== userId) {
      throw new Error('You are not the author of this answer.')
    }

    answer.content = content

    await this.answerRepository.save(answer)

    return { answer }
  }
}
