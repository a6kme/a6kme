import React from 'react';
import Link from 'next/link';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../components/constants';

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
      backgroundColor: '#eff0f1'
    }
  },
});

const Articles = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.articles_container}>
      <p>Recent Articles</p>
      <li className={classes.articles}>
        <Link href="/articles/make-your-web-deployment-serverless">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h5>Make your web deployments serverless</h5>
            <p>
              I always avoided having to learn CSS formally, and was always facing problems
              trying to understand the style from spaghetti CSS declarations from chrome
              dev tools ...
            </p>
          </a>
        </Link>
      </li>
      <li className={classes.articles}>
        <Link href="/articles/the-missing-guide-to-create-an-npm-library">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h5>The missing guide to create an NPM Library</h5>
            <p>
              This is my attempt to organize the methods and resources necessary to be able to
              publish an NPM library ...
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
            `markdown` files ...
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
