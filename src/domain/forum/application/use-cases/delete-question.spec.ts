import { makeQuestion } from '../../../../test/factories/make-question'
import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { DeleteQuestionUseCase } from './delete-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryRepository)
  })

  it('Should be able to delete a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(question)

    expect(inMemoryRepository.items).toHaveLength(1)

    await sut.execute({ questionId: 'question-1', userId: 'author-1' })

    expect(inMemoryRepository.items).toHaveLength(0)
  })

  it('Should be not allowed to delete a question from another user', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(question)

    expect(inMemoryRepository.items).toHaveLength(1)

    const result = await sut.execute({
      questionId: 'question-1',
      userId: 'other-author',
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryRepository.items).toHaveLength(1)
  })
})
