import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';

const styles = ({

});

const ServerlessWebDeployment = props => (
  <div>
        Yo. This is an article about serverless
  </div>
);

export default withLayout(withStyles(styles)(ServerlessWebDeployment), 'A6kme-Serverless web deployment');
