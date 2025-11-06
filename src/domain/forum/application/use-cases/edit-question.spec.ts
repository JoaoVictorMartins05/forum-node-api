import { makeQuestion } from '../../../../test/factories/make-question'
import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryRepository)
  })

  it('Should be able to edit a question', async () => {
    const question = makeQuestion(
      {
        authorId: new UniqueEntityId('author-1'),
        title: 'Original Title',
        content: 'Original Content',
      },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(question)

    expect(inMemoryRepository.items).toHaveLength(1)

    await sut.execute({
      questionId: 'question-1',
      userId: 'author-1',
      title: 'Edited Title',
      content: 'Edited Content',
    })

    expect(inMemoryRepository.items[0]).toMatchObject({
      title: 'Edited Title',
      content: 'Edited Content',
    })
  })

  it('Should be not allowed to edit a question from another user', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(question)

    expect(inMemoryRepository.items).toHaveLength(1)

    expect(
      async () =>
        await sut.execute({
          questionId: 'question-1',
          userId: 'other-author',
          title: 'Edited Title',
          content: 'Edited Content',
        }),
    ).rejects.toThrowError('You are not the author of this question.')

    expect(inMemoryRepository.items).toHaveLength(1)
  })
})
