/* eslint-disable import/no-unresolved */
import React from 'react';
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
        <a href="/articles/performance-test-a-service-with-jmeter-and-scale-with-docker">
          <span>June 28, 2019</span>
          <h5>Performance test a service using Apache JMeter and scale using Docker</h5>
          <p>
          In this article, we will test a single instance of our service with Apache JMeter
          and see how horizontally scaling our app with Docker can improve performance significantly
          </p>
        </a>
      </li>
      <li className={classes.articles}>
        <a href="/articles/how-to-create-and-publish-an-npm-package">
          <span>May 15, 2019</span>
          <h5>The guide to create and publish an NPM Package</h5>
          <p>
            A quick tutorial to create and publish npm packages using
            {' '}
            <code>@a6kme/create-npm-package</code>
            {' '}
            CLI
          </p>
        </a>
      </li>
      <li className={classes.articles}>
        <a href="/articles/why-i-decided-to-host-my-own-blog">
          <span>April 20, 2019</span>
          <h5>Why I decided to host my own blog instead of going for service providers</h5>
          <p>
            I would like to explain the rationale behind why I decided to host my own blog using
            {' '}
            <code>markdown</code>
            {' '}
            files instead of going for a hosted provider like Medium or WordPress.
          </p>
        </a>
      </li>
    </ul>
  );
};

Articles.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Articles), 'A6kme-Articles');
