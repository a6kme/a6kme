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
      <li className={classes.articles}>
        <Link href="/articles/how-to-create-and-publish-an-npm-package-part-2">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h5>How to create and publish an NPM package - Part 2</h5>
            <p>
              This one builds on top of Part 1 of article by same name. This one talks about
              optimizing the build size of package.
            </p>
          </a>
        </Link>
      </li>
      <li className={classes.articles}>
        <Link href="/articles/how-to-create-and-publish-an-npm-package-part-1">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h5>How to create and publish an NPM package - Part 1</h5>
            <p>
              This is my attempt to organize the methods and resources necessary to be able to
              create and publish an NPM library.
            </p>
          </a>
        </Link>
      </li>
      <li className={classes.articles}>
        <Link href="/articles/why-i-decided-to-host-my-own-blog">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h5>Why I decided to host my own blog</h5>
            <p>
              I would like to explain the rationale behind why I decided to host my own blog using
              {' '}
              <code>markdown</code>
              {' '}
              files instead of going for a hosted provider like Medium or WordPress.
            </p>
          </a>
        </Link>
      </li>
    </ul>
  );
};

Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Articles), 'A6kme-Articles');
