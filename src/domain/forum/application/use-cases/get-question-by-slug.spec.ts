import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from '../../../../test/factories/make-question'

let inMemoryRepository: InMemoryQuestionsRepository
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryRepository)
  })

  it('Should be able to get a question by slug', async () => {
    const newQuestion = makeQuestion({ slug: Slug.create('test-example-slug') })

    await inMemoryRepository.create(newQuestion)

    const result = await sut.execute({
      slug: 'test-example-slug',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.question.id).toBeTruthy()
    expect(inMemoryRepository.items).toHaveLength(1)
    expect(inMemoryRepository.items[0]).toEqual(result.value?.question)
  })
})
