import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { InMemoryQuestionCommentsRepository } from '../../../../test/repositories/in-memory-question-comments-repository'
import { FetchQuestionCommentsUseCase } from './fetch-question-comments'
import { makeQuestionComment } from '../../../../test/factories/make-question-comment'

let inMemoryRepository: InMemoryQuestionCommentsRepository
let sut: FetchQuestionCommentsUseCase

describe('Fetch question comments', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionCommentsRepository()
    sut = new FetchQuestionCommentsUseCase(inMemoryRepository)
  })

  it('Should be able to fetch the question comments', async () => {
    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    await inMemoryRepository.create(
      makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
    )

    const { questionComments } = await sut.execute({
      page: 1,
      questionId: 'question-1',
    })

    expect(questionComments).toHaveLength(3)
  })

  it('Should be able to fetch paginated question comments', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryRepository.create(
        makeQuestionComment({ questionId: new UniqueEntityId('question-1') }),
      )
    }

    const { questionComments } = await sut.execute({
      page: 2,
      questionId: 'question-1',
    })

    expect(questionComments).toHaveLength(2)
  })
})
