import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { InMemoryAnswerCommentsRepository } from '../../../../test/repositories/in-memory-answer-comments-repository'
import { FetchAnswerCommentsUseCase } from './fetch-answer-comments'
import { makeAnswerComment } from '../../../../test/factories/make-answer-comment'

let inMemoryRepository: InMemoryAnswerCommentsRepository
let sut: FetchAnswerCommentsUseCase

describe('Fetch answer comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswerCommentsRepository()
    sut = new FetchAnswerCommentsUseCase(inMemoryRepository)
  })

  it('Should be able to fetch the answer comments', async () => {
    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    await inMemoryRepository.create(
      makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
    )

    const { answerComments } = await sut.execute({
      page: 1,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(3)
  })

  it('Should be able to fetch paginated answer comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeAnswerComment({ answerId: new UniqueEntityId('answer-1') }),
      )
    }

    const { answerComments } = await sut.execute({
      page: 2,
      answerId: 'answer-1',
    })

    expect(answerComments).toHaveLength(2)
  })
})
