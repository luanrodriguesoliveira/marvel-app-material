import Layout from '../components/Layout';
import Head from 'next/head';
import { Box, Grid } from '@material-ui/core';
import Card from '../components/Card';

export default function Index({ data }) {
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
        </Box>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const data = [
    { id: 1, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 2, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 3, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 4, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 5, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 6, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
    { id: 7, thumb: '/images/black-panther.jpg', title: 'Pantera negra' },
  ];

  return {
    props: {
      data: data,
    },
  };
}
