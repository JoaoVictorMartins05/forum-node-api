import { Entity } from '../../../core/entities/entity'
import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'

interface IAnswerComment {
  answerId: UniqueEntityId
  authorId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class AnswerComment extends Entity<IAnswerComment> {
  get answerId(): UniqueEntityId {
    return this.props.answerId
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get content(): string {
    return this.props.content
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  static create(
    props: Optional<IAnswerComment, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const answerComment = new AnswerComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return answerComment
  }
}
