import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryRepository)
  })

  it('Should be able to create an answer', async () => {
    const { question } = await sut.execute({
      authorId: 'author-01',
      title: 'title-01',
      content: 'This is a content to the question.',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryRepository.items).toHaveLength(1)
    expect(inMemoryRepository.items[0]).toEqual(question)
  })
})
