import { AnswerQuestionUseCase } from './answer-question'
import { InMemoryAnswersRepository } from '../../../../test/repositories/in-memory-answers-repository'

let inMemoryRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryRepository)
  })

  it('Should be able to answer a question', async () => {
    const answer = await sut.execute({
      instructorId: 'instructor-01',
      questionId: 'question-01',
      content: 'This is an answer to the question.',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryRepository.items).toHaveLength(1)
    expect(inMemoryRepository.items[0]).toEqual(answer)
  })
})
