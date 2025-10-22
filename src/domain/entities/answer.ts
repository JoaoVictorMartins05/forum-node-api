import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'

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

  static create(props: Optional<IAnswer, "createdAt">, id?: UniqueEntityId) {
    const answer = new Answer(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answer
  }
}
