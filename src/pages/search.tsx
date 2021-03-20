import Layout from '../components/Layout';
import Head from 'next/head';
import { Box, Grid, Button } from '@material-ui/core';
import Card from '../components/Card';
import { api } from '../api/marvel';
import Typography from '@material-ui/core/Typography';

export default function Search({ count, data }) {
  return (
    <>
      <Head>
        <title>Marvel App</title>
      </Head>
      <Layout>
        <Box p={8}>
          <Typography variant="h4">{count} resultado(s) encontrado(s)</Typography>
          <Grid container spacing={4}>
            {data.map(item => (
              <Grid item key={item.id} xl={2} lg={3} md={4} sm={6} xs={12}>
                <Card Item={item} />
              </Grid>
            ))}
          </Grid>
          <Box mt="50px" display="flex" justifyContent="center"></Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps({ query: { query = '' } }) {
  const params = {};
  params['events'] = 310;
  query !== '' ? (params['nameStartsWith'] = query) : null;

  const { data: fetch } = await api.get('/characters', {
    params,
  });

  const data = fetch.data.results;
  const count = fetch.data.count;

  return {
    props: {
      data: data,
      count: count,
    },
  };
}
