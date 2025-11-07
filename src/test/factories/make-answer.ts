import { UniqueEntityId } from '../../domain/core/entities/unique-entity-id'
import { Answer } from '../../domain/forum/enterprise/entities/answer'
import { faker } from '@faker-js/faker'

export function makeAnswer(
  override: Partial<Answer> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      questionId: new UniqueEntityId(),
      authorId: new UniqueEntityId(),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return answer
}
