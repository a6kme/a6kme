import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';

const styles = ({

});

const DevDependencyUsingDocker = props => (
  <div>
        Yo. This is an article about dev dependency
  </div>
);

export default withLayout(withStyles(styles)(DevDependencyUsingDocker), 'A6kme-Docker for dev dependency');
