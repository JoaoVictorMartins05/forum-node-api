import { UseCaseError } from '../../../../core/errors/use-case-error'

export class ResourceNotFoundErrorMessage
  extends Error
  implements UseCaseError
{
  constructor() {
    super('Resource not found.')
  }
}
