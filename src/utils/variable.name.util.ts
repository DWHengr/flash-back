export class VariableNameUtil {
  /**
   * LowerCamelCase
   * @param words
   */
  static toLowerCamelCase(words: string[]): string {
    const lowerCamelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return lowerCamelCaseWords
      .join('')
      .replace(/^./, words[0].charAt(0).toLowerCase());
  }

  /**
   * LowerCamelCase
   * @param words
   */
  static toUpperCamelCase(words: string[]): string {
    const upperCamelCaseWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return upperCamelCaseWords.join('');
  }

  /**
   * LowerUnderline
   * @param words
   */
  static toLowerUnderline(words: string[]): string {
    const lowerUnderlineWords = words.map((word) => {
      return word.charAt(0).toLowerCase() + word.slice(1);
    });
    return lowerUnderlineWords.join('_');
  }

  /**
   * UpperUnderline
   * @param words
   */
  static toUpperUnderline(words: string[]): string {
    const upperUnderlineWords = words.map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return upperUnderlineWords.join('_');
  }
}
