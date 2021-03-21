import Layout from '../../components/Layout';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { api } from '../../api/marvel';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';

const styles = makeStyles(theme => ({
  container: {
    overflow: 'hidden',
    padding: 8,
    marginLeft: '200px',
    marginRight: '200px',
    marginTop: '100px',
    alignItems: 'center',
    [theme.breakpoints.down('lg')]: {
      marginLeft: 0,
      marginRight: 0,
    },
  },
  image: {
    marginRight: '25px',
    border: '4px solid #000',
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '50px',
    },
  },
}));

export default function Personagem({ data }) {
  const classes = styles();
  const thumbnail = data.thumbnail.path + '/portrait_uncanny.' + data.thumbnail.extension;
  const Content = (
    <>
      <Typography className={classes.title} variant="h2">
        {data.name}
      </Typography>
      <Typography variant="h5">{data.description}</Typography>
    </>
  );
  return (
    <>
      <Head>
        <title>Marvel App</title>
      </Head>
      <Layout>
        <Box display="flex" className={classes.container}>
          <Box display="flex" flexDirection="column" textAlign="center">
            <img className={classes.image} src={thumbnail} />
            <Hidden only={['xl', 'lg', 'sm', 'md']}>{Content}</Hidden>
          </Box>
          <Box display="flex" justifyContent="center" flexDirection="column" textAlign="justify">
            <Hidden only={['xs']}>{Content}</Hidden>
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
