import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'
import { ICommentProps, Comment } from './comment'

interface IAnswerComment extends ICommentProps {
  answerId: UniqueEntityId
}

export class AnswerComment extends Comment<IAnswerComment> {
  get answerId(): UniqueEntityId {
    return this.props.answerId
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
