import { makeAnswer } from '../../../../test/factories/make-answer'
import { InMemoryAnswersRepository } from '../../../../test/repositories/in-memory-answers-repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { EditAnswerUseCase } from './edit-answer'

let inMemoryRepository: InMemoryAnswersRepository
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryRepository)
  })

  it('Should be able to edit a answer', async () => {
    const answer = makeAnswer(
      {
        authorId: new UniqueEntityId('author-1'),
        content: 'Original Content',
      },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(answer)

    expect(inMemoryRepository.items).toHaveLength(1)

    await sut.execute({
      answerId: 'answer-1',
      userId: 'author-1',
      content: 'Edited Content',
    })

    expect(inMemoryRepository.items[0]).toMatchObject({
      content: 'Edited Content',
    })
  })

  it('Should be not allowed to edit a answer from another user', async () => {
    const answer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    )
    await inMemoryRepository.create(answer)

    expect(inMemoryRepository.items).toHaveLength(1)

    expect(
      async () =>
        await sut.execute({
          answerId: 'answer-1',
          userId: 'other-author',
          content: 'Edited Content',
        }),
    ).rejects.toThrowError('You are not the author of this answer.')

    expect(inMemoryRepository.items).toHaveLength(1)
  })
})
