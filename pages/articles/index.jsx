import React from 'react';
import Link from 'next/link';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';

const styles = theme => ({
  articles_container: {
    maxWidth: '40em',
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
    '&>p:first-child': {
      textAlign: 'center'
    },
    '& p, span': {
      color: '#666'
    },
    '& span': {
      fontSize: '0.9em'
    },
    '& li': {
      borderTop: '1px solid #f0edea',
      padding: '2em 0',
    },
    '& a': {
      textDecoration: 'none',
      color: 'inherit'
    }
  }
});

const Articles = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.articles_container}>
      <p>Recent Articles</p>
      <li>
        <Link href="/articles/css-in-depth-review">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>March 5, 2019</span>
            <h2>Review of CSS In Depth - The Definitive Guide</h2>
            <p>
              I always avoided having to learn CSS formally, and was always facing problems
              trying to understand the style from spaghetti CSS declarations from chrome
              dev tools ...
            </p>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/articles/resolve-dev-dependency-using-docker">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>February 5, 2019</span>
            <h2>Docker - The only package that you will ever need</h2>
            <p>
              I used to face the dependency problem a lot in my development environment. My
              jupyter installations used to work, but suddenly they stop to work ...
            </p>
          </a>
        </Link>
      </li>
      <li>
        <Link href="/articles/make-your-web-deployment-serverless">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
            <span>January 5, 2019</span>
            <h2>Make your web deployment serverless with AWS S3 and AWS CloudFront</h2>
            <p>
              Till yesterday, I was distributing my web application using an nginx reverse proxy,
              but then I was introduced to the beautiful world of AWS CloudFront ...
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
