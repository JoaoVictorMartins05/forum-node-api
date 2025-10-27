import { Slug } from './value-objects/slug'
import { Entity } from '../core/entities/entity'
import { UniqueEntityId } from '../core/entities/unique-entity-id'
import { Optional } from '../core/types/optional'
import dayJs from 'dayjs'

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
  get title(): string {
    return this.props.title
  }

  get content(): string {
    return this.props.content
  }

  get authorId(): UniqueEntityId {
    return this.props.authorId
  }

  get slug(): Slug {
    return this.props.slug
  }

  get bestAnswerId(): UniqueEntityId {
    return this.props.authorId
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt
  }

  get isNew(): boolean {
    return dayJs().diff(this.createdAt, 'day') <= 3
  }

  get excerpt(): string {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
    this.touch()
  }

  static create(
    props: Optional<IQuestion, 'createdAt' | 'slug'>,
    id?: UniqueEntityId,
  ) {
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
