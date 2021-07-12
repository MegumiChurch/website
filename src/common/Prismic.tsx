import Prismic from '@prismicio/client';
import { RichText } from 'prismic-reactjs';
import { renderToString } from 'react-dom/server';
import { Document as PrismicDocument } from '@prismicio/client/types/documents';
import { Article, News } from 'types';

export const client = Prismic.client(`https://jgc-website.prismic.io/api`);

export async function getPageById(id: string): Promise<Article | News> {
  return extract(
    (await client.query(Prismic.Predicates.at(`document.id`, id))).results[0],
  );
}

export async function getPagesByType(type: string) {
  return (
    await client.query(Prismic.Predicates.at(`document.type`, type))
  ).results.map((document: PrismicDocument) => extract(document));
}

async function extract(document: PrismicDocument): Promise<Article | News> {
  const { type, data, last_publication_date } = document;
  const { header, title, body, display_until_date } = data[type];
  const baseRes = {
    last_publication_date: last_publication_date!.substring(0, 10).split(`-`),
    header: header.value.main.url,
    alt: header.value.main.alt,
    title: RichText.asText(title.value),
    body: renderToString(<RichText render={body.value} />),
  };
  if (type === `news`) {
    return {
      ...baseRes,
      display_until_date: display_until_date.value.split(`-`),
    };
  }
  return baseRes;
}