import { randomUUID } from 'node:crypto'

interface IAnswer {
  content: string
  questionId: string
  authorId: string
}

export class Answer {
  public id: string
  public content: string
  public authorId: string
  public questionId: string

  constructor(props: IAnswer, id?: string) {
    this.id = id || randomUUID()
    this.authorId = props.authorId
    this.questionId = props.questionId
    this.content = props.content
  }
}
