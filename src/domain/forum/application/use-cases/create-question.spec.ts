import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { CreateQuestionUseCase } from './create-question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryRepository)
  })

  it('Should be able to create an answer', async () => {
    const result = await sut.execute({
      authorId: 'author-01',
      title: 'title-01',
      content: 'This is a content to the question.',
      attachmentsIds: ['1', '2'],
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.id).toBeTruthy()
    expect(inMemoryRepository.items).toHaveLength(1)
    expect(inMemoryRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryRepository.items[0].attachments).toHaveLength(2)
    expect(inMemoryRepository.items[0].attachments).toEqual([
      expect.objectContaining({
        attachmentId: new UniqueEntityId('1'),
      }),
      expect.objectContaining({
        attachmentId: new UniqueEntityId('2'),
      }),
    ])
  })
})
