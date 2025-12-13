import { makeQuestion } from '../../../../test/factories/make-question'
import { makeQuestionAttachment } from '../../../../test/factories/make-question-attachments'
import { InMemoryQuestionAttachmentsRepository } from '../../../../test/repositories/in-memory-question-attachments-repository'
import { InMemoryQuestionsRepository } from '../../../../test/repositories/in-memory-questions-repository'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { EditQuestionUseCase } from './edit-question'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryRepository: InMemoryQuestionsRepository
let inMemoryQuestionAttachmentsRepository: InMemoryQuestionAttachmentsRepository
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryRepository = new InMemoryQuestionsRepository()
    inMemoryQuestionAttachmentsRepository =
      new InMemoryQuestionAttachmentsRepository()
    sut = new EditQuestionUseCase(
      inMemoryRepository,
      inMemoryQuestionAttachmentsRepository,
    )
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

    inMemoryQuestionAttachmentsRepository.items.push(
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityId('1'),
      }),
      makeQuestionAttachment({
        questionId: question.id,
        attachmentId: new UniqueEntityId('2'),
      }),
    )

    await sut.execute({
      questionId: 'question-1',
      userId: 'author-1',
      title: 'Edited Title',
      content: 'Edited Content',
      attachmentsIds: ['1', '3'],
    })

    expect(inMemoryRepository.items[0]).toMatchObject({
      title: 'Edited Title',
      content: 'Edited Content',
    })

    expect(inMemoryRepository.items[0].attachments.currentItems).toHaveLength(2)
    expect(inMemoryRepository.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntityId('1') }),
      expect.objectContaining({ attachmentId: new UniqueEntityId('3') }),
    ])
  })

  it('Should be not allowed to edit a question from another user', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    )
    await inMemoryRepository.create(question)

    expect(inMemoryRepository.items).toHaveLength(1)

    const result = await sut.execute({
      questionId: 'question-1',
      userId: 'other-author',
      title: 'Edited Title',
      content: 'Edited Content',
      attachmentsIds: [],
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
    expect(inMemoryRepository.items).toHaveLength(1)
  })
})
