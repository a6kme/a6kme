import React from 'react';
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
    '&>ul': {
      display: 'flex',
      flexDirection: 'row',
      listStyle: 'none',
      margin: 0,
      color: 'grey',
      '&>li': {
        fontFamily: '"Ubuntu", sans-serif',
        padding: '1em 10px',
        cursor: 'pointer',
        textTransform: 'uppercase',
        '&:hover': {
          color: FONT_SELECTED_COLOR,
          transition: 'color 0.3s'
        }
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
  return (
    <div className={classes.header_root}>
      <AppBar position="static" className={classes.header_nav}>
        <div className={classes.header_toolbar}>
          <ul>
            <li className={homeSelected ? classes.header_nav_selected : ''}>
              Home
            </li>
            {/* <li className={blogsSelected ? classes.header_nav_selected : ''}>
              Articles
            </li> */}
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
