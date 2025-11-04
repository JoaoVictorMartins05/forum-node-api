import { UniqueEntityId } from "../../domain/core/entities/unique-entity-id";
import { Question } from "../../domain/forum/enterprise/entities/question";
import { Slug } from "../../domain/forum/enterprise/entities/value-objects/slug";

export function makeQuestion(
    override: Partial<Question> = {}
) {

    const question = Question.create({
        authorId: new UniqueEntityId("author-1"),
        content: 'Example content',
        title: 'Example title',
        slug: Slug.create("example-slug"),
        ...override
    })

    return question;

}