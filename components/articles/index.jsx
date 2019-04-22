import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH, LINK_COLOR } from '../constants';

const styles = theme => ({
  root: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '1em 1em'
    },
    '& h4': {
      ...theme.typography.h4
    },
    '& p': {
      ...theme.typography.body1
    },
    '& li': {
      ...theme.typography.body1,
      marginBottom: '.75em'
    },
    '& code': {
      fontFamily: '"Inconsolata", monospace',
      backgroundColor: 'rgba(27,31,35,.05)'
    },
    '& p code, li code': {
      padding: '1px 5px'
    },
    '& img': {
      maxWidth: '100%',
      margin: 'auto'
    },
    '& a': {
      textDecoration: 'none',
      color: LINK_COLOR,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
});

const Article = ({ classes, html, attributes: { title } }) => (
  <div className={classes.root}>
    <h4>{title}</h4>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  html: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Article));
