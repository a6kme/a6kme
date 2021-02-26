import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';
import { getScale, getNotesOfScale } from '../../src/lib/scales';

const styles = (theme) => ({
  container: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
  },
  scalesContainer: {
    width: '40em'
  },
  scale: {
    fontSize: '2em'
  },
  notes: {
    fontSize: '2em'
  }
});

class RandomScaleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: getScale(),
      bpm: 60
    };
  }

  componentDidMount() {
    this.intervalID = setInterval(
      () => this.tick(),
      this.scaleRefreshTime()
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  scaleRefreshTime() {
    return this.noteRefreshTime() * 12 * 1000;
  }

  noteRefreshTime() {
    const { bpm } = this.state;
    return 60 / bpm;
  }

  tick() {
    this.setState({
      scale: getScale()
    });
  }

  render() {
    const { classes } = this.props;
    const { scale } = this.state;
    const notes = getNotesOfScale(scale);
    return (
      <div className={classes.container}>
        <div className={classes.scalesContainer}>
          <p className={classes.scale}>
            Scale:
            {' '}
            <span>{scale}</span>
          </p>
          <p className={classes.notes}>
            Notes:
            {' '}
            <span>{notes}</span>
          </p>
        </div>
      </div>
    );
  }
}

RandomScaleGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(RandomScaleGenerator), 'Random Scale Generator');
