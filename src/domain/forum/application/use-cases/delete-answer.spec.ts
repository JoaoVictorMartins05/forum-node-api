import { makeAnswer } from "../../../../test/factories/make-answer"
import { InMemoryAnswersRepository } from "../../../../test/repositories/in-memory-answers-repository"
import { UniqueEntityId } from "../../../core/entities/unique-entity-id"
import { DeleteAnswerUseCase } from "./delete-answer"

let inMemoryRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
    
    beforeEach(() => {
        inMemoryRepository = new InMemoryAnswersRepository()
        sut = new DeleteAnswerUseCase(inMemoryRepository)
    })

    it('Should be able to delete a answer', async () => {

        const answer = makeAnswer({authorId: new UniqueEntityId("author-1")}, new UniqueEntityId("answer-1"))
        await inMemoryRepository.create(answer)

        expect(inMemoryRepository.items).toHaveLength(1)

        await sut.execute({ answerId: "answer-1", userId: "author-1" })

        expect(inMemoryRepository.items).toHaveLength(0)
    })

    it('Should be not allowed to delete a answer from another user', async () => {

        const answer = makeAnswer({authorId: new UniqueEntityId("author-1")}, new UniqueEntityId("answer-1"))
        await inMemoryRepository.create(answer)

        expect(inMemoryRepository.items).toHaveLength(1)

        expect(async () =>
            await sut.execute({ answerId: "answer-1", userId: "other-author" })
        ).rejects.toThrowError('You are not the author of this answer.')
        
        expect(inMemoryRepository.items).toHaveLength(1)
    })
}
)
