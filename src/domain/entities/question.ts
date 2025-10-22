import { Slug } from './value-objects/slug'
import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

interface IQuestion {
  title: string
  content: string
  authorId: UniqueEntityId
  slug: Slug
  bestAnswerId?: UniqueEntityId
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<IQuestion> {

  static create(props: Optional<IQuestion, "createdAt">, id?: UniqueEntityId) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return question
  }
}
