import Layout from '../../components/Layout';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import { api } from '../../api/marvel';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import { useRouter } from 'next/router';

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
  charImage: {
    cursor: 'pointer',
    border: '2px solid #000',
  },
  category: {
    marginTop: '20px',
    marginLeft: '30px',
    [theme.breakpoints.only('xs')]: {
      marginLeft: 0,
      textAlign: 'center',
    },
    textAlign: 'justify',
  },
}));

export default function Quadrinho({ comic, characters }) {
  const classes = styles();
  const thumbnail = comic.thumbnail.path + '/portrait_uncanny.' + comic.thumbnail.extension;

  const router = useRouter();
  const handleImageClick = charId => {
    router.push(`/personagem/${charId}`);
  };
  const Content = (
    <>
      <Typography className={classes.title} variant="h3">
        {comic.title}
      </Typography>
      <Typography className={classes.description} variant="h5">
        {comic.description == null ? 'Descrição não disponível' : comic.description}
      </Typography>
      <Typography className={classes.category} variant="h5">
        Número de páginas: {comic.pageCount}
      </Typography>
      <Typography className={classes.category} variant="h5">
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
        <Box
          className={classes.comics}
          display="flex"
          justifyContent="center"
          flexDirection="column"
          textAlign="center"
        >
          <Typography variant="h6">Personagens:</Typography>
          <Box mt="30px">
            <Grid container>
              {characters.map(item => (
                <Grid item key={item.id} xl={2} lg={3} md={3} sm={4} xs={6}>
                  <img
                    src={item.thumbnail.path + '/portrait_fantastic.' + item.thumbnail.extension}
                    onClick={() => handleImageClick(item.id)}
                    className={classes.charImage}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const { data: fetchComic } = await api.get(`/comics/${context.params.id}`);
  const { data: fetchChar } = await api.get(`/comics/${context.params.id}/characters`);

  const comic = fetchComic.data.results[0];
  const characters = fetchChar.data.results;

  return {
    props: {
      comic: comic,
      characters: characters,
    },
  };
}
