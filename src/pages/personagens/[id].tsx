import { useRouter } from 'next/router';
import Layout from '../../components/Layout';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { api } from '../../api/marvel';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const styles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',
    padding: 8,
    marginLeft: '200px',
    marginRight: '200px',
    marginTop: '100px',
    justifyContent: 'center',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  image: {
    paddingRight: '30px',
  },
}));

export default function Personagem({ data }) {
  const classes = styles();
  const thumbnail = data.thumbnail.path + '/portrait_uncanny.' + data.thumbnail.extension;
  return (
    <>
      <Head>
        <title>Marvel App</title>
      </Head>
      <Layout>
        <Box display="flex" className={classes.container}>
          <Box display="flex" flexDirection="column">
            <img className={classes.image} src={thumbnail} />
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" textAlign="justify">
            <Typography variant="h2">{data.name}</Typography>
            <Typography variant="h5">{data.description}</Typography>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: fetch } = await api.get(`/characters/${context.params.id}`);

  const data = fetch.data.results[0];

  return {
    props: {
      data: data,
    },
  };
}
