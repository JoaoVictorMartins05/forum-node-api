import { QuestionRepository } from '../repositories/question-repository'

interface EditQuestionRequest {
  questionId: string
  userId: string
  title: string
  content: string
}

interface EditQuestionResponse {}

export class EditQuestionUseCase {
  constructor(private questionRepository: QuestionRepository) {}

  async execute({
    questionId,
    userId,
    title,
    content,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.questionRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== userId) {
      throw new Error('You are not the author of this question.')
    }

    question.title = title
    question.content = content

    await this.questionRepository.save(question)

    return {}
  }
}
