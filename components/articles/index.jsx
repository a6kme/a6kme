import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { getArticlesStyle } from '../constants';

const styles = theme => getArticlesStyle(theme);

const Article = ({ classes, html, attributes: { title } }) => (
  <div className={classes.root}>
    <h4>{title}</h4>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);

Article.propTypes = {
  classes: PropTypes.object.isRequired,
  html: PropTypes.string.isRequired,
  attributes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(Article));
