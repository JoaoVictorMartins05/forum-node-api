import { InMemoryAnswersRepository } from '../../../../test/repositories/in-memory-answers-repository'
import { FetchQuestionAnswersUseCase } from './fetch-question-answers'
import { makeAnswer } from '../../../../test/factories/make-answer'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'

let inMemoryRepository: InMemoryAnswersRepository
let sut: FetchQuestionAnswersUseCase

describe('Fetch question answers', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new FetchQuestionAnswersUseCase(inMemoryRepository)
  })

  it('Should be able to fetch the question asnwers', async () => {
    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryRepository.create(
      makeAnswer({ questionId: new UniqueEntityId('question-1') }),
    )

    const { answers } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(3)
  })

  it('Should be able to fetch paginated question answers', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswer({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { answers } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(answers).toHaveLength(2)
  })
})
