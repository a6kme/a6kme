import React from 'react';
import {
  Typography,
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
    '&>li': {
      padding: '1em'
    },
    '& p': {
      margin: '1em 0'
    }
  },
  tool: {
    borderTop: '1px solid #f0edea',
    padding: '1em 0',
    '& a': {
      color: 'inherit',
      textDecoration: 'none',
      '& h5': {
        marginBottom: '1em'
      },
      '& p': {
        color: '#666'
      }
    },
    '& img': {
      width: '5em',
      height: '5em',
      margin: '0 1em'
    }
  },
});

const Tools = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.tools_container}>
      <Typography align="center" variant="body1">Tools</Typography>
      <li className={classes.tool}>
        <Link href="/tools/scale_generator">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <Typography align="left" variant="h5">
              Scales and Notes generator
            </Typography>
            <Typography align="left" variant="body1">
              Generate a sequence of scales and notes of the scale. The sequence of scales can be
              either random or configured for various rules. Beats Per Minute can be modified
              using built in metronome.
            </Typography>
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
