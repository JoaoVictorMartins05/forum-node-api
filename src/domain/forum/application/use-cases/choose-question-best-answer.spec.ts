import { makeAnswer } from '../../../../test/factories/make-answer'
import { makeQuestion } from '../../../../test/factories/make-question'
import { InMemoryAnswersRepository } from '../../../../test/repositories/in-memory-answers-repository'
import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { ChooseQuestionBestAnswerUseCase } from './choose-question-best-answer'

let inMemoryQuestionRepository: InMemoryQuestionsRepository
let inMemoryAnswerRepository: InMemoryAnswersRepository
let sut: ChooseQuestionBestAnswerUseCase

describe('Choose Question Best Answer', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionsRepository()
    inMemoryAnswerRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionRepository,
      inMemoryAnswerRepository,
    )
  })

  it('Should be able to choose question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswerRepository.create(answer)
    await inMemoryQuestionRepository.create(question)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString(),
    })

    expect(inMemoryQuestionRepository.items[0].bestAnswerId).toEqual(answer.id)
  })

  it('Should be not allowed to choose question best answer', async () => {
    const question = makeQuestion()

    const answer = makeAnswer({
      questionId: question.id,
    })

    await inMemoryAnswerRepository.create(answer)
    await inMemoryQuestionRepository.create(question)

    expect(
      async () =>
        await sut.execute({
          answerId: answer.id.toString(),
          authorId: 'other-author',
        }),
    ).rejects.toThrowError('Not Allowed.')
  })
})
