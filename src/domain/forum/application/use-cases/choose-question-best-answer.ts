import { Question } from '../../enterprise/entities/question'
import { AnswersRepository } from '../repositories/answer-repository'
import { QuestionRepository } from '../repositories/question-repository'

interface ChooseQuestionBestAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface ChooseQuestionBestAnswerUseCaseResponse {
  question: Question
}

export class ChooseQuestionBestAnswerUseCase {
  constructor(
    private questionRepository: QuestionRepository,
    private answerRepository: AnswersRepository,
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestAnswerUseCaseRequest): Promise<ChooseQuestionBestAnswerUseCaseResponse> {
    const answer = await this.answerRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    const question = await this.questionRepository.findById(
      answer.questionId.toString(),
    )

    if (!question) {
      throw new Error('Question not found.')
    }

    if (question.authorId.toString() !== authorId) {
      throw new Error('Not Allowed.')
    }

    console.log('answer.id => ', answer.id)
    console.log('question before => ', question.bestAnswerId, question.title)

    question.title = 'testes'
    question.bestAnswerId = answer.id

    console.log('question after => ', question.bestAnswerId, question.title)

    await this.questionRepository.save(question)

    return { question }
  }
}
