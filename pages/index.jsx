import React from 'react';
import {
  withStyles, Typography, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withLayout from '../src/lib/with-layout';
import { BACKGROUND_COLOR, MAX_CONTENT_WIDTH } from '../components/constants';
import ExternalLinksAndImages from '../components/homepage/links';

const styles = (theme) => ({
  homepage_container: {
    maxWidth: MAX_CONTENT_WIDTH,
    width: '100%',
    margin: '2em auto 6em auto',
    [theme.breakpoints.down('sm')]: {
      padding: '0 1em 0 1em'
    },
    '& mark': {
      backgroundColor: '#fcf8e3',
      padding: '1px 5px'
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
    },
    '& a': {
      textDecoration: 'none',
      '&:hover': {
        textDecoration: 'underline',
      }
    }
  },
  profile_pic: {
    boxShadow: '0 0 10px 2px rgba(173, 173, 173, 0.5)',
    width: '40%',
    display: 'block',
    margin: '1em auto 1em auto',
    maxWidth: '300px',
    borderRadius: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '60%'
    }
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
        Welcome to my e-home in Cybernet. I can be recognized with below photo.
      </Typography>
      <img alt="a6kme" src="/home/a6kme.jpg" className={classes.profile_pic} />
      <Typography gutterBottom align="center" variant="subtitle1">
        Mostly I can be found in front of my computer. I love travelling, reading,
        babbling, and I am my experiences of them. I write sometimes, using
        {' '}
        <Link href="/articles">Articles Section</Link>
        .
      </Typography>
      {/* eslint-disable-next-line no-undef */}
      <Button variant="contained" onClick={() => { window.location.href = 'mailto:abhishek@a6k.me?subject=Hi from a6k.me!'; }}>
        Say Hi
      </Button>
      <Typography gutterBottom align="center" variant="subtitle1">
        P.S: If you don&apos;t have an email client installed on your device,
        you can email me at
        {' '}
        <mark>abhishek@a6k.me</mark>
      </Typography>
      <hr />
      <Typography gutterBottom align="center" variant="subtitle1">
        I also hangout at
      </Typography>
      <div className={classes.links_container}>
        <ExternalLinksAndImages />
      </div>
      <hr />
      <Typography gutterBottom align="center" variant="subtitle1">
        Some tools that I created for myself
      </Typography>
      <div className={classes.links_container}>
        <a
          key="scale_generator"
          href="/tools/scale_generator"
          rel="noopener noreferrer"
        >
          <img src="/tools/music.jpg" alt="music scale" />
        </a>
      </div>
    </div>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Index), 'A6kme-Home');
