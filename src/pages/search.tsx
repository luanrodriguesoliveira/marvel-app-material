import Layout from '../components/Layout';
import Head from 'next/head';
import { Box, Grid, Button } from '@material-ui/core';
import Card from '../components/Card';
import { api } from '../api/marvel';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import { useRouter } from 'next/router';

export default function Search({ data, resultsNumber, page, count, query }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Marvel App</title>
      </Head>
      <Layout>
        <Box p={8}>
          <Typography variant="h4">{resultsNumber} resultado(s) encontrado(s)</Typography>
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
              count={count}
              onChange={(event, nextPage) => router.push(`/search?page=${nextPage}&query=${query}`)}
              color="primary"
            />
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { query = '', page = 1 } }) {
  const params = {};
  params['offset'] = +page === 1 ? 0 : (+page - 1) * 12;
  params['limit'] = 12;
  query !== '' ? (params['nameStartsWith'] = query) : null;
  const { data: fetch } = await api.get('/characters', {
    params,
  });

  const data = fetch.data.results;
  const resultsNumber = fetch.data.total;
  const count = Math.round(+fetch.data.total / 10);

  return {
    props: {
      data: data,
      resultsNumber: resultsNumber,
      page: +page,
      count: count,
      query: query,
    },
  };
}
