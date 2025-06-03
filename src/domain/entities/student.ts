import { Entity } from '../core/entities/entity'

interface IStudent {
  name: string
}

export class Student extends Entity<IStudent> {}
