import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import content from '../../content/home.md';

const styles = ({
  root: {
    maxWidth: '80%',
    margin: 'auto'
  }
});

const { html, attributes: { title } } = content;

const ServerlessWebDeployment = ({ classes }) => (
  <div className={classes.root}>
    <h1>{title}</h1>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: html }} />
  </div>
);

ServerlessWebDeployment.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(ServerlessWebDeployment), title);
