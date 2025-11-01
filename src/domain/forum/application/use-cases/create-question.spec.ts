import { Question } from "../../enterprise/entities/question"
import { QuestionRepository } from "../repositories/question-repository"
import { CreateQuestionUseCase } from "./create-question"

const fakeQuestionRepository: QuestionRepository = {
  create: async function (question: Question): Promise<void> {
    return Promise.resolve()
  },
}

test('Create an answer', async () => {
  const createQuestion = new CreateQuestionUseCase(fakeQuestionRepository)

  const {question} = await createQuestion.execute({
    authorId: 'author-01',
    title: 'title-01',
    content: 'This is a content to the question.',
  })

  expect(question.id).toBeTruthy()
})
