export class Slug {
  public value: string

  constructor(value: string) {
    this.value = value
  }

  /**
   * Receives a string and normalize it as a slug.
   * @param text
   * @returns
   */
  static createFromText(text: string): Slug {
    const slugText = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/_/g, '-')
      .replace(/--+/g, '-')
      .replace(/-$/g, '')

    return new Slug(slugText)
  }
}
