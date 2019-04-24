import React from 'react';
import Link from 'next/link';
import {
  withStyles, AppBar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { FONT_SELECTED_COLOR, BACKGROUND_COLOR } from '../constants';

const styles = {
  header_root: {
    flexGrow: 1
  },
  header_nav: {
    backgroundColor: BACKGROUND_COLOR
  },
  header_toolbar: {
    width: '100%',
    maxWidth: '1200px',
    margin: 'auto',
    '& a': {
      textDecoration: 'none',
      textTransform: 'uppercase',
      color: '#666',
      '&:hover': {
        color: FONT_SELECTED_COLOR,
        transition: 'color 0.3s'
      }
    },
    '&>ul': {
      listStyle: 'none',
      margin: 0,
      paddingLeft: '1.5em',
      '&>li': {
        padding: '1em 10px',
        float: 'left'
      }
    }
  },
  header_nav_selected: {
    color: `${FONT_SELECTED_COLOR} !important`
  }
};

const Header = (props) => {
  const { classes, router: { pathname } } = props;
  const articlesSelected = pathname.startsWith('/articles');
  const aboutSelected = pathname === '/';
  return (
    <div className={classes.header_root}>
      <AppBar position="static" className={classes.header_nav}>
        <div className={classes.header_toolbar}>
          <ul>
            <li>
              <Link href="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={aboutSelected ? classes.header_nav_selected : ''}>
                  About
                </a>
              </Link>
            </li>
            <li>
              <Link href="/articles">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={articlesSelected ? classes.header_nav_selected : ''}>
                  Articles
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  router: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
