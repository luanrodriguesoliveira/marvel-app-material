import Box from '@material-ui/core/Box';
import Layout from '../components/Layout';
import Head from 'next/head';

export default function Construction() {
  return (
    <>
      <Head>
        <title>Em construção</title>
      </Head>
      <Layout>
        <Box display="flex" justifyContent="center" mt="200px">
          <h1>Essa página está em construção</h1>
        </Box>
      </Layout>
    </>
  );
}
