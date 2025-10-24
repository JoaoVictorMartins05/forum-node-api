import { AnswerQuestionUseCase } from './answer-question'
import { AnswersRepository } from '../repositories/answer-repository'
import { Answer } from '../entities/answer'

const fakeAnswersRepository: AnswersRepository = {
  create: async function (answer: Answer): Promise<void> {
    return Promise.resolve()
  },
}

test('Create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    instructorId: 'instructor-01',
    questionId: 'question-01',
    content: 'This is an answer to the question.',
  })

  expect(answer.content).toEqual('This is an answer to the question.')
})
