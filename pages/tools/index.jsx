import React from 'react';
import {
  withStyles, Typography, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withLayout from '../../src/lib/with-layout';
import { BACKGROUND_COLOR, MAX_CONTENT_WIDTH } from '../../components/constants';
import ExternalLinksAndImages from '../../components/homepage/links';

const styles = (theme) => ({
  tools_container: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
  },
  tool: {
    '& a': {
      display: 'flex'
    },
    '& img': {
      width: '2.5em',
      height: '2.5em',
      margin: '0.5em'
    },
    '& p': {
      fontSize: '1rem'
    }
  }
});

const Tools = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.tools_container}>
      <p>Tools</p>
      <li className={classes.tool}>
        <a
          key="random_scale_generator"
          href="/tools/random_scale_generator"
          rel="noopener noreferrer"
        >
          <img src="/tools/music.jpg" alt="music scale" />
          <p>Generate random scale with BPM</p>
        </a>
      </li>
    </ul>
  );
};

Tools.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Tools), 'Tools');
