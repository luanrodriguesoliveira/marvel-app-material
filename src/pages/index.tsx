import Layout from '../components/Layout';
import Head from 'next/head';
import { Box, Grid } from '@material-ui/core';
import Card from '../components/Card';
import { useRouter } from 'next/router';
import { api } from '../api/marvel';
import Pagination from '@material-ui/lab/Pagination';

export default function Index({ data, page }) {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Marvel App</title>
      </Head>
      <Layout>
        <Box p={8}>
          <Grid container spacing={4}>
            {data.map(item => (
              <Grid item key={item.id} xl={2} lg={3} md={4} sm={6} xs={12}>
                <Card Item={item} />
              </Grid>
            ))}
          </Grid>
          <Box mt="50px" display="flex" justifyContent="center">
            <Pagination
              page={page}
              count={5}
              onChange={(event, nextPage) => router.push(`?page=${nextPage}`)}
              color="primary"
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const offset = +page === 1 ? 1 : (+page - 1) * 12 + 1;

  const { data: fetch } = await api.get('/characters', {
    params: {
      offset: offset,
      events: 310,
    },
  });

  const data = fetch.data.results;

  return {
    props: {
      data: data,
      page: +page,
    },
  };
}
