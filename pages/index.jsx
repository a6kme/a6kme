import React from 'react';
import {
  withStyles, Typography, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../src/lib/with-layout';
import { BACKGROUND_COLOR } from '../components/constants';
import ExternalLinksAndImages from '../components/homepage/links';

const styles = theme => ({
  homepage_container: {
    maxWidth: '1200px',
    width: '100%',
    margin: 'auto',
    paddingTop: '100px',
    [theme.breakpoints.down('sm')]: {
      paddingTop: '60px'
    },
    '& *': {
      fontFamily: '"Ubuntu", sans-serif',
    },
    '& mark': {
      backgroundColor: '#fcf8e3'
    },
    '& button': {
      textTransform: 'none',
      backgroundColor: BACKGROUND_COLOR,
      margin: '1em auto',
      display: 'block'
    },
    '& hr': {
      margin: '1.5em auto',
      border: 0,
      borderTop: '1px solid #eee',
      maxWidth: '80%'
    }
  },
  card: {
    width: '100%',
    marginTop: '100px',
    maxWidth: '900px'
  },
  links_container: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& img': {
      width: '2.5em',
      height: '2.5em',
      margin: '0.5em'
    }
  }
});

const Index = (props) => {
  const { classes } = props;
  return (
    <div className={classes.homepage_container}>
      <Typography gutterBottom align="center" variant="h2">
            Hello
      </Typography>
      <Typography gutterBottom align="center" variant="h5">
            I am
        {' '}
        <mark>Abhishek (A6k)</mark>
      </Typography>
      <Typography gutterBottom align="center" variant="subtitle1">
            Welcome to my e-home in Cybernet
      </Typography>
      {/* eslint-disable-next-line no-undef */}
      <Button variant="contained" onClick={() => { window.location.href = 'mailto:a@a6k.me?subject=Hi from a6k.me!'; }}>
            Say Hi
      </Button>
      <hr />
      <Typography gutterBottom align="center" variant="subtitle1">
            My other hangouts in the network
      </Typography>
      <div className={classes.links_container}>
        <ExternalLinksAndImages />
      </div>
    </div>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Index), 'A6K Home');
