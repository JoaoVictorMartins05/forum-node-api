import { QuestionRepository } from '../repositories/question-repository'

interface DeleteQuestionRequest {
  questionId: string
  userId: string
}

interface DeleteQuestionResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    userId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== userId) {
      throw new Error('You are not the author of this question.')
    }

    await this.questionRepository.delete(question)

    return {}
  }
}
