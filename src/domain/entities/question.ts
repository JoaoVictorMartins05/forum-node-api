import { Slug } from './value-objects/slug'
import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'

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

  constructor(props: IQuestion, id?: string) {
    super(props, id)
  }
}
