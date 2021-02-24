import React from 'react';
import {
  withStyles, Typography, Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Link from 'next/link';
import withLayout from '../../src/lib/with-layout';
import { BACKGROUND_COLOR, MAX_CONTENT_WIDTH } from '../../components/constants';
import ExternalLinksAndImages from '../../components/homepage/links';

const styles = theme => ({

});

const Index = (props) => {
  const { classes } = props;
  return (
    <div>Yo</div>
  );
};


export default withLayout(withStyles(styles)(Index), 'Tools');
