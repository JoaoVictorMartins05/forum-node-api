import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'

interface IAnswer {
  questionId: UniqueEntityId
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<IAnswer> {
  get content(): string {
    return this.props.content
  }

  constructor(props: IAnswer, id?: string) {
    super(props, id)
  }
}
