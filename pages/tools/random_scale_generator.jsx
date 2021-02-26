import React from 'react';
import {
  withStyles, Typography, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withLayout from '../../src/lib/with-layout';
import { BACKGROUND_COLOR, MAX_CONTENT_WIDTH } from '../../components/constants';
import ExternalLinksAndImages from '../../components/homepage/links';
import { getScale, getNotesOfScale } from '../../src/lib/scales';

const styles = (theme) => ({
  container: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
  },
  scale: {
    fontSize: '2em'
  },
  notes: {
    fontSize: '2em'
  }
});

const RandomScaleGenerator = (props) => {
  const { classes } = props;
  const scale = getScale();
  const notes = getNotesOfScale(scale);
  return (
    <div className={classes.container}>
      <p className={classes.scale}>
        Scale:
        {' '}
        <span>{scale}</span>
      </p>
      <p className={classes.notes}>
        Notes:
        {' '}
        <span>{notes}</span>
      </p>
    </div>
  );
};

RandomScaleGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(RandomScaleGenerator), 'Random Scale Generator');
