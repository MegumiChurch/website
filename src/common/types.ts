export interface News {
  title: string
  display_until_date: Date
  last_publication_date: Date
  id: string
}

export interface Article {
  header: string
  title: string
  body: JSX.Element
  last_publication_date: Date
}
