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
    width: '40em',
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
  },
  scalesContainer: {
    '& p': {
      fontSize: '1.5em'
    },
    '& span': {
      padding: '0.5em'
    }
  },
  scale: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  bpmContainer: {
    '& p': {
      fontSize: '1.5em'
    }
  },
  selectedNote: {
    backgroundColor: '#d7e360'
  },
  nextScale: {
    color: 'gray'
  },
  currentScale: {
    backgroundColor: '#a2cf6e'
  }
});

const bpmDiff = 10;

class RandomScaleGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beatCount: 0,
      scale: getScale(),
      nextScale: getScale(),
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
    const { beatCount, scale, nextScale } = this.state;
    let currentScale = scale;
    let upcomingScale = nextScale;
    if (beatCount && (beatCount + 1) % 8 === 0) {
      currentScale = nextScale;
      upcomingScale = getScale();
    }

    this.setState({
      scale: currentScale,
      nextScale: upcomingScale,
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
    const { scale, bpm, nextScale } = this.state;
    const notes = getNotesOfScale(scale);
    return (
      <div className={classes.container}>
        <div className={classes.scalesContainer}>
          <div className={classes.scale}>
            <p>
              Current Scale:
              {' '}
              <span className={classes.currentScale}>{scale}</span>
            </p>
            <p className={classes.nextScale}>
              Next Scale:
              {' '}
              <span>{nextScale}</span>
            </p>
          </div>
          <div className={classes.notes}>
            <p>
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
        <hr />
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
      </div>
    );
  }
}

RandomScaleGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(RandomScaleGenerator), 'Random Scale Generator');
