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
    justifyContent: 'center',
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
    border: '4px solid #000',
  },
  title: {
    marginLeft: '30px',
    textTransform: 'uppercase',
    fontWeight: 500,
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      fontSize: '50px',
    },
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      marginTop: '20px',
      textAlign: 'center',
    },
  },
  description: {
    marginLeft: '30px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      textAlign: 'center',
    },
    textAlign: 'justify',
  },
  comics: {
    marginTop: '40px',
  },
}));

export default function Quadrinho({ comic }) {
  const classes = styles();
  const thumbnail = comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension;
  const Content = (
    <>
      <Typography className={classes.title} variant="h2">
        {comic.title}
      </Typography>
      <Typography className={classes.description} variant="h5">
        {comic.description == null ? 'Descrição não disponível' : comic.description}
      </Typography>
      <Typography className={classes.description} variant="h5">
        Número de páginas: {comic.pageCount}
      </Typography>
      <Typography className={classes.description} variant="h5">
        Preço: $ {comic.prices[0].price}
      </Typography>
    </>
  );
  return (
    <>
      <Head>
        <title>{comic.title}</title>
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
  const { data: fetch } = await api.get(`/comics/${context.params.id}`);

  const comic = fetch.data.results[0];

  return {
    props: {
      comic: comic,
    },
  };
}
