import { Box, Typography, makeStyles } from '@material-ui/core';
import { useState, useEffect } from 'react';
import Grow from '@material-ui/core/Grow';

const styles = makeStyles({
  cardBox: {
    backgroundColor: '#000',
    display: 'flex',
    flexDirection: 'column',
    padding: 8,
    textAlign: 'center',
    cursor: 'pointer',
  },
  thumb: {
    filter: 'grayscale(100%)',
    '&:hover': {
      filter: 'none',
    },
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
});

export default function Card({ Item }) {
  const classes = styles();

  const thumbnail = Item.thumbnail.path + '/portrait_uncanny.' + Item.thumbnail.extension;

  return (
    <Grow in={true} timeout={500}>
      <Box className={classes.cardBox}>
        <img className={classes.thumb} src={thumbnail} alt={Item.name} />
        <Typography variant="body1" className={classes.title}>
          {Item.name}
        </Typography>
      </Box>
    </Grow>
  );
}
