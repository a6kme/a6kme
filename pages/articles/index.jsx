/* eslint-disable import/no-unresolved */
import React from 'react';
import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';

const styles = (theme) => ({
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
    }
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
    }
  }
});

const Articles = (props) => {
  const { classes } = props;
  return (
    <ul className={classes.articles_container}>
      <p>Recent Articles</p>
      <li className={classes.articles}>
        <a href="/articles/dawn-of-a-new-age-of-computer-programming">
          <span>March 26th, 2023</span>
          <h5>
            Dawn of a new age of computer programming
          </h5>
          <p>
            With the advant of Generative Pre-trained Transformer (GPT) and Large
            Langauge Model (LLM), we have a powerful tool at our disposal as Software
            Engineers. I am taking a use case of Downloading password protected
            attachments from Gmail and demostrating how we can leverage this tool
            and save time and become productive.
          </p>
        </a>
      </li>
      <li className={classes.articles}>
        <a href="/articles/zero-downtime-deployment-using-aws-alb-on-kubernetes">
          <span>February 24th, 2020</span>
          <h5>
            Zero Downtime Deployment Upgrades using AWS ALB on Kubernetes
          </h5>
          <p>
            AWS Application Load Balancer gives better API and feature set as
            compared to Classic Load Balancers. In this article, I will show
            you how we configured our Kubernetes Deployment at PushOwl to
            do rolling upgrades of our pods without any outage.
          </p>
        </a>
      </li>
      <li className={classes.articles}>
        <a href="/articles/performance-test-a-service-with-jmeter-and-scale-with-docker">
          <span>June 28, 2019</span>
          <h5>
            Performance test a service using Apache JMeter and scale using
            Docker
          </h5>
          <p>
            In this article, we will test a single instance of our service with
            Apache JMeter and see how horizontally scaling our app with Docker
            can improve performance significantly
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
          <h5>
            Why I decided to host my own blog instead of going for service
            providers
          </h5>
          <p>
            I would like to explain the rationale behind why I decided to host
            my own blog using
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
