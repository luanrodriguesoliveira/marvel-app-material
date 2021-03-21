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
  comicImage: {
    cursor: 'pointer',
    border: '2px solid #000',
  },
}));

export default function Personagem({ character, comics }) {
  const classes = styles();
  const thumbnail = character.thumbnail.path + '/portrait_uncanny.' + character.thumbnail.extension;

  const router = useRouter();

  const handleImageClick = comicId => {
    router.push(`/quadrinho/${comicId}`);
  };

  const Content = (
    <>
      <Typography className={classes.title} variant="h2">
        {character.name}
      </Typography>
      <Typography className={classes.description} variant="h5">
        {character.description == '' ? 'Descrição não disponível' : character.description}
      </Typography>
    </>
  );
  return (
    <>
      <Head>
        <title>{character.name}</title>
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
          <Typography variant="h6">Esteve em:</Typography>
          <Box mt="30px">
            <Grid container>
              {comics.map(item => (
                <Grid item key={item.id} xl={2} lg={3} md={3} sm={4} xs={6}>
                  <img
                    src={item.thumbnail.path + '/portrait_fantastic.' + item.thumbnail.extension}
                    onClick={() => handleImageClick(item.id)}
                    className={classes.comicImage}
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
  const { data: fetchCharacter } = await api.get(`/characters/${context.params.id}`);

  const character = fetchCharacter.data.results[0];

  const { data: fetchComics } = await api.get(`/comics`, {
    params: {
      characters: context.params.id,
    },
  });

  const comics = fetchComics.data.results;

  return {
    props: {
      character: character,
      comics: comics,
    },
  };
}
