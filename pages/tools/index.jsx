import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';

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
        <Link href="/tools/random_scale_generator">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <img src="/tools/music.jpg" alt="music scale" />
            <p>Generate random scale with BPM</p>
          </a>
        </Link>
      </li>
    </ul>
  );
};

Tools.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Tools), 'Tools');
