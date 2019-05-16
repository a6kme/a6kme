/* eslint-disable import/no-unresolved */
import React from 'react';
import Link from 'next/link';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';

const styles = theme => ({
  articles_container: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
    '&>p': {
      ...theme.typography.subtitle1,
      textAlign: 'center'
    },
  },
  articles: {
    borderTop: '1px solid #f0edea',
    padding: '1em 0',
    '& p, span': {
      ...theme.typography.body1,
      color: '#666'
    },
    '& h5': {
      ...theme.typography.h5,
      margin: '1em 0'
    },
    '& span': {
      fontSize: '0.9em'
    },
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    },
    '& code': {
      fontFamily: '"Inconsolata", monospace',
      backgroundColor: 'rgba(27,31,35,.05)',
      padding: '1px 5px'
    },
  },
});

const Articles = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.articles_container}>
      <p>Recent Articles</p>
      <%=articleList%>
    </ul>
  );
};

Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Articles), 'A6kme-Articles');
