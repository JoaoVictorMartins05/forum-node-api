import { UniqueEntityId } from '../../../core/entities/unique-entity-id'
import { Optional } from '../../../core/types/optional'
import { ICommentProps, Comment } from './comment'

interface IQuestionComment extends ICommentProps {
  questionId: UniqueEntityId
}

export class QuestionComment extends Comment<IQuestionComment> {
  get questionId(): UniqueEntityId {
    return this.props.questionId
  }

  static create(
    props: Optional<IQuestionComment, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return questionComment
  }
}
