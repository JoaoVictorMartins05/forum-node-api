import { Entity } from '../core/entities/entity'

interface IInstructor {
  name: string
}

export class Instructor extends Entity<IInstructor> {}
