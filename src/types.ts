export interface Article {
  last_publication_date: string[];
  header: string;
  title: string;
  body: string;
}

export interface News extends Article {
  display_until_date: string[];
}
