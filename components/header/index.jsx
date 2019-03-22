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
    color: FONT_SELECTED_COLOR
  }
};

const Header = (props) => {
  const { classes } = props;
  const homeSelected = true;
  const articlesSelected = false;
  return (
    <div className={classes.header_root}>
      <AppBar position="static" className={classes.header_nav}>
        <div className={classes.header_toolbar}>
          <ul>
            <li className={homeSelected ? classes.header_nav_selected : ''}>
              <Link href="/">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
                  Home
                </a>
              </Link>
            </li>
            <li className={articlesSelected ? classes.header_nav_selected : ''}>
              <Link href="/articles">
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a>
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
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
