import { UniqueEntityId } from '../../domain/core/entities/unique-entity-id'
import { Question } from '../../domain/forum/enterprise/entities/question'
import { Slug } from '../../domain/forum/enterprise/entities/value-objects/slug'
import { faker } from '@faker-js/faker'

export function makeQuestion(
  override: Partial<Question> = {},
  id?: UniqueEntityId,
) {
  const question = Question.create(
    {
      authorId: new UniqueEntityId(),
      title: faker.lorem.sentence(),
      content: faker.lorem.text(),
      slug: Slug.create(faker.lorem.sentence()),
      ...override,
    },
    id,
  )

  return question
}
