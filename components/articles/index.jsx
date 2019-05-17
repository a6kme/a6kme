import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import Link from 'next/link';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH, LINK_COLOR } from '../constants';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const styles = theme => ({
  root: {
    maxWidth: MAX_CONTENT_WIDTH,
    fontSize: '21px',
    margin: '2em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '1em 1em'
    },
    '& h4': {
      ...theme.typography.h4
    },
    '& p': {
      ...theme.typography.body1,
      fontSize: 'inherit',
      lineHeight: '33px'
    },
    '& li': {
      ...theme.typography.body1,
      marginBottom: '.75em',
      fontSize: 'inherit'
    },
    '& code': {
      fontSize: 'inherit',
      fontFamily: '"Inconsolata", monospace',
      backgroundColor: 'rgba(27,31,35,.05)'
    },
    '& p code, li code': {
      padding: '1px 5px'
    },
    '& pre': {
      width: '90%',
      padding: '12px 8px',
      backgroundColor: 'rgba(27,31,35,.05)',
      borderRadius: '3px',
      overflow: 'scroll',
      '& code': {
        backgroundColor: 'rgba(0, 0, 0, 0)'
      }
    },
    '& blockquote': {
      margin: '0 0 10px 0',
      padding: '10px',
      backgroundColor: '#FFF8DC',
      borderLeft: '2px solid #ffeb8e'
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
  hero_banner: {
    '&>p': {
      textAlign: 'center',
      fontSize: '0.8em',
      color: 'rgba(0, 0, 0, 0.68)',
      margin: '0.5em auto 2em auto',
    },
    '&>img': {
      borderRadius: '5px',
    }
  },
  disqus: {
    marginTop: '4em'
  },
  date: {
    fontSize: '0.9em !important',
    color: 'rgba(0, 0, 0, 0.68) !important',
    marginBottom: '0.9em',
  }
});

const Article = ({
  classes, html, attributes: {
    date, title, hero: { img, alt, credit }, edit
  }, router: { pathname }
}) => {
  const articleDate = new Date(date);
  return (
    <div className={classes.root}>
      <Head>
        <meta property="og:image" content={img} />
      </Head>
      <h4>{title}</h4>
      <p className={classes.date}>
        {monthNames[articleDate.getMonth()]}
        {' '}
        {articleDate.getDate()}
        ,
        {' '}
        {articleDate.getFullYear()}
      </p>

      {/* Hero Banner Section */}
      <div className={classes.hero_banner}>
        <img src={img} alt={alt} />
        <p>{credit}</p>
      </div>

      {/* Article content section, parsed from markdown */}
      {/* eslint-disable-next-line react/no-danger */}
      <div dangerouslySetInnerHTML={{ __html: html }} />

      <p style={{ textAlign: 'center', marginTop: '2em' }}>_ _ _ _</p>
      <p>
      Thank you so much for taking time to go through this.
        <span role="img" aria-labelledby="Heart">❤️ </span>
      If you feel there is some typo in this article, or some of the content can be improved, please
      feel free to
        {' '}
        <a href={edit} target="_blank" rel="noopener noreferrer">Edit this Post</a>
      . Or you can go back to continue reading other
        {' '}
        <Link href="/articles">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a>
          articles
          </a>
        </Link>
        <span role="img" aria-labelledby="Grinning Face">. 😀</span>
      </p>

      {/* Disqus comment section */}
      <div id="disqus_thread" className={classes.disqus} />
      {/* eslint-disable-next-line react/no-danger */}
      <script dangerouslySetInnerHTML={{
        __html: `
        var disqus_config = function () {
        this.page.url = 'https://a6k.me/${pathname}';
        this.page.identifier = '${pathname}';
        };
        (function() {
        var d = document, s = d.createElement('script');
        s.src = 'https://a6k-me.disqus.com/embed.js';
        s.setAttribute('data-timestamp', +new Date());
        (d.head || d.body).appendChild(s);
        })();`
      }}
      />
      <noscript>
      Please enable JavaScript to view the
        {' '}
        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
      </noscript>
      <script id="dsq-count-scr" src="//a6k-me.disqus.com/count.js" async />
    </div>
  );
};

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  html: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Article));
