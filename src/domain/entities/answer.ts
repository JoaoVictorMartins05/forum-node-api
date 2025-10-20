import { Entity } from '../core/entities/entity'

interface IAnswer {
  content: string
  questionId: string
  authorId: string
}

export class Answer extends Entity<IAnswer> {
  get content(): string {
    return this.props.content
  }

  constructor(props: IAnswer, id?: string) {
    super(props, id)
  }
}
