import { Box, Typography, makeStyles } from '@material-ui/core';

const styles = makeStyles({
  thumb: {
    width: '160px',
  },
});

export default function Card({ Item }) {
  const classes = styles();
  return (
    <Box>
      <img className={classes.thumb} src={Item.thumb} alt={Item.title} />
      <Box>
        <Typography variant="body1" color="textPrimary" gutterBottom>
          {Item.title}
        </Typography>
      </Box>
    </Box>
  );
}
