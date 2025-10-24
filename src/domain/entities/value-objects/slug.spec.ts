import { Slug } from './slug'

test('It SHould be able to create a slug from a string', () => {
  const slug = Slug.createFromText('Hello World to a slug field')

  expect(slug).toBeInstanceOf(Slug)
  expect(slug.value).toBe('hello-world-to-a-slug-field')
})
