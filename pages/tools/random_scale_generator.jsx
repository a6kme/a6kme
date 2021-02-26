import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
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
    width: '50em',
    '& p': {
      fontSize: '2em'
    },
    '& span': {
      padding: '0.5em'
    }
  },
  bpmContainer: {
    '& p': {
      fontSize: '1.5em'
    }
  },
  selectedNote: {
    backgroundColor: 'green'
  }
});

const bpmDiff = 10;

class RandomScaleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beatCount: 0,
      scale: getScale(),
      bpm: 60
    };
  }

  componentDidMount() {
    this.setBpmInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  setBpmInterval() {
    clearInterval(this.intervalID);
    this.intervalID = setInterval(
      () => this.tick(),
      this.noteRefreshTime()
    );
  }

  noteRefreshTime() {
    const { bpm } = this.state;
    return (60 / bpm) * 1000;
  }

  tick() {
    const { beatCount, scale } = this.state;
    let updatedScale = null;
    if (beatCount && (beatCount + 1) % 8 === 0) {
      updatedScale = getScale();
    }
    this.setState({
      scale: updatedScale || scale,
      beatCount: beatCount + 1
    });
  }

  isNoteSelected(index) {
    const { beatCount } = this.state;
    if (beatCount % 8 === index) {
      return true;
    }
    return false;
  }

  modifyBPM(difference) {
    const { bpm } = this.state;
    this.setState({
      bpm: bpm + difference
    });
    this.setBpmInterval();
  }

  render() {
    const { classes } = this.props;
    const { scale, bpm } = this.state;
    const notes = getNotesOfScale(scale);
    return (
      <div className={classes.container}>
        <div className={classes.bpmContainer}>
          <p>
            BPM:
            {' '}
            {bpm}
          </p>
          <div>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.modifyBPM(bpmDiff)}
              startIcon={<ArrowUpwardIcon />}
            >
              +
              {bpmDiff}
            </Button>
            {' '}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => this.modifyBPM(-bpmDiff)}
              startIcon={<ArrowDownwardIcon />}
            >
              -
              {bpmDiff}
            </Button>
          </div>
        </div>
        <hr />
        <div className={classes.scalesContainer}>
          <p className={classes.scale}>
            Scale:
            {' '}
            <span>{scale}</span>
          </p>
          <p className={classes.notes}>
            Notes:
            {' '}
            {notes.map((note, index) => {
              const uniqueKey = `${scale}_${index}`;
              if (this.isNoteSelected(index)) {
                return <span key={uniqueKey} className={classes.selectedNote}>{note}</span>;
              }
              return <span key={uniqueKey}>{note}</span>;
            })}
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
