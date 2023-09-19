import * as languages from '@languages/tanslations'

type TTranslate = (text: string, language?: 'en') => string

const translate: TTranslate = (text, language = 'en') => {
  if (Object.keys(languages).includes(language)) {
    return (languages[language] as Record<string, string>)[text] || text
  }

  return text
}

export default translate
