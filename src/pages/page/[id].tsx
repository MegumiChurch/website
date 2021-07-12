import { GetServerSidePropsContext } from 'next';
import { getPageById, getPagesByType } from 'common/Prismic';
import { Article, News } from 'types';
import Layout from 'components/layout';
import { renderToElement } from 'common/Util';
import styles from './[id].module.scss';

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const page = await getPageById(context.query.id as string);
  return { props: page };
}

export default function Page({
  last_publication_date,
  header,
  title,
  body,
}: Article | News) {
  return (
    <Layout>
      <header />
      <h1>{title}</h1>
      {renderToElement(body)}
    </Layout>
  );
}
