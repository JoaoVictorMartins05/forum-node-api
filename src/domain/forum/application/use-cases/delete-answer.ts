
import { AnswersRepository } from '../repositories/answer-repository'

interface DeleteAnswerRequest {
    answerId: string,
    userId: string
}

interface DeleteAnswerResponse {
}

export class DeleteAnswerUseCase {
    constructor(private AnswerRepository: AnswersRepository) { }

    async execute({
        answerId,
        userId
    }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {

        const answer = await this.AnswerRepository.findById(answerId)

        if (!answer) {
            throw new Error('Answer not found.')
        }

        if (answer.authorId.toString() !== userId) {
            throw new Error('You are not the author of this answer.')
        }

        await this.AnswerRepository.delete(answer)

        return { }
    }
}
