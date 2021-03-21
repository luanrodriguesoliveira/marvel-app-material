import { Box, Typography, makeStyles } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';
import { useRouter } from 'next/router';
import { useState } from 'react';

const styles = makeStyles(theme => ({
  cardBox: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    padding: 2,
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#EE171F',
    },
  },
  thumb: {
    // filter: 'grayscale(100%)',
    // '&:hover': {
    //   filter: 'none',
    // },
  },
  title: {
    color: '#FFF',
    textTransform: 'uppercase',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    fontWeight: 500,
  },
}));

export default function Card({ Item }) {
  const classes = styles();
  const router = useRouter();

  const handleImageClick = () => {
    router.push(`/personagem/${Item.id}`);
  };

  const thumbnail = Item.thumbnail.path + '/portrait_uncanny.' + Item.thumbnail.extension;

  return (
    <Grow in={true} timeout={500}>
      <Box className={classes.cardBox}>
        <img
          className={classes.thumb}
          src={thumbnail}
          alt={Item.name}
          onClick={() => handleImageClick()}
        />

        <Typography variant="body1" className={classes.title}>
          {Item.name}
        </Typography>
      </Box>
    </Grow>
  );
}
