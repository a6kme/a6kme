import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import LoopIcon from '@material-ui/icons/Loop';
import StopIcon from '@material-ui/icons/Stop';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withLayout from '../../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../../components/constants';
import {
  getScale,
  getNotesOfScale,
  getRelativeMinorScale
} from '../../../src/lib/scales';

const styles = (theme) => ({
  container: {
    maxWidth: MAX_CONTENT_WIDTH,
    width: '38em',
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto'
    },
    padding: '0 2em',
    listStyle: 'none',
  },
  bpmContainer: {
    display: 'flex',
    alignItems: 'center',
    margin: '1em 0',
    '& p': {
      fontSize: '1.5em'
    }
  },
  bpmText: {
    margin: '0 1em'
  },
  bpmButtons: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  settings: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  scalesContainer: {
    marginBottom: '1.5em',
    '& p': {
      fontSize: '1.5em'
    },
    '& span': {
      padding: '0.25em'
    }
  },
  scale: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  nextScale: {
    color: 'gray'
  },
  currentScale: {
    backgroundColor: '#a2cf6e'
  },
  selectedNote: {
    backgroundColor: '#d7e360'
  },
  startControls: {
    display: 'flex',
    justifyContent: 'space-around'
  }
});

const bpmDiff = 10;

class ScaleGenerator extends React.Component {
  constructor(props) {
    super(props);
    const scale = getRelativeMinorScale();
    const nextScale = getRelativeMinorScale(scale);
    this.state = {
      beatsRunning: false,
      scale,
      nextScale,
      beatCount: 0,
      onlyRelativeMinor: true,
      reverseNotes: true,
      scaleDuration: 16,
      bpm: 60
    };
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  setBpmInterval() {
    this.stopBeats();
    this.startBeats();
  }

  getNotes(scale) {
    let notes = getNotesOfScale(scale);
    const { reverseNotes } = this.state;
    if (reverseNotes) {
      notes = notes.concat(notes.slice().reverse());
    }
    return notes;
  }

  toggleBeatRunningStatus() {
    const { beatsRunning } = this.state;
    if (beatsRunning) {
      this.stopBeats();
    } else {
      this.startBeats();
    }
  }

  stopBeats() {
    clearInterval(this.intervalID);
    this.setState({
      beatsRunning: false
    });
  }

  reset() {
    this.stopBeats();
    const { onlyRelativeMinor } = this.state;
    let scale;
    let nextScale;
    if (onlyRelativeMinor) {
      scale = getRelativeMinorScale();
      nextScale = getRelativeMinorScale(scale);
    } else {
      scale = getScale();
      nextScale = getScale();
    }
    this.setState({
      scale,
      nextScale,
      beatsRunning: false,
      beatCount: 0
    });
  }

  startBeats() {
    this.intervalID = setInterval(
      () => this.tick(),
      this.noteRefreshTime()
    );
    this.setState({
      beatsRunning: true
    });
  }

  tick() {
    const {
      beatCount, scale, nextScale, scaleDuration, onlyRelativeMinor
    } = this.state;
    let currentScale = scale;
    let upcomingScale = nextScale;
    if (beatCount && (beatCount + 1) % scaleDuration === 0) {
      currentScale = nextScale;
      upcomingScale = onlyRelativeMinor ? getRelativeMinorScale(nextScale) : getScale();
    }

    this.setState({
      scale: currentScale,
      nextScale: upcomingScale,
      beatCount: beatCount + 1
    });
  }

  isNoteSelected(index) {
    const { beatCount, scaleDuration } = this.state;
    if (beatCount % scaleDuration === index) {
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

  toggleReverseNotes() {
    const { reverseNotes } = this.state;
    const scaleDuration = !reverseNotes ? 15 : 8;
    this.setState({
      reverseNotes: !reverseNotes,
      scaleDuration
    });
    this.setBpmInterval();
  }

  toggleRandomiseNotes() {
    const { onlyRelativeMinor } = this.state;
    this.setState({
      onlyRelativeMinor: !onlyRelativeMinor
    });
  }

  noteRefreshTime() {
    const { bpm } = this.state;
    return (60 / bpm) * 1000;
  }

  render() {
    const { classes } = this.props;
    const {
      scale, bpm, nextScale, reverseNotes, onlyRelativeMinor, beatsRunning
    } = this.state;
    const notes = this.getNotes(scale);
    const headline = onlyRelativeMinor ? 'Generating Relative Minor Scales' : 'Generating Random Scales';
    return (
      <div className={classes.container}>
        <div className={classes.scalesContainer}>
          <Typography
            align="center"
            variant="subtitle1"
          >
            {' '}
            {headline}
            {' '}
          </Typography>
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
          <p>
            {notes.map((note, index) => {
              const uniqueKey = `${scale}_${index}`;
              if (this.isNoteSelected(index)) {
                return <span key={uniqueKey} className={classes.selectedNote}>{note}</span>;
              }
              return <span key={uniqueKey}>{note}</span>;
            })}
          </p>
          <div className={classes.startControls}>
            <Button
              variant="contained"
              color={beatsRunning ? 'default' : 'primary'}
              onClick={() => this.toggleBeatRunningStatus()}
              startIcon={beatsRunning ? <StopIcon /> : <PlayCircleFilledWhiteIcon />}
            >
              {beatsRunning ? 'Pause' : 'Start'}
            </Button>
            <Button
              variant="contained"
              color="default"
              onClick={() => this.reset()}
              startIcon={<LoopIcon />}
            >
              reset
            </Button>
          </div>
        </div>
        <hr />
        <div className={classes.settings}>
          <div className={classes.bpmContainer}>
            <div className={classes.bpmText}>
              <Typography variant="h6">
                BPM:
                {' '}
                {bpm}
              </Typography>
            </div>
            <div className={classes.bpmButtons}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.modifyBPM(bpmDiff)}
                startIcon={<ArrowUpwardIcon />}
              >
                +
                {bpmDiff}
              </Button>
              <br />
              <Button
                variant="contained"
                color="primary"
                onClick={() => this.modifyBPM(-bpmDiff)}
                startIcon={<ArrowDownwardIcon />}
              >
                -
                {bpmDiff}
              </Button>
            </div>
          </div>
          <div className={classes.toggleContainer}>
            <FormControlLabel
              control={(
                <Switch
                  checked={!onlyRelativeMinor}
                  onChange={() => this.toggleRandomiseNotes()}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                )}
              label={
                <Typography variant="h6"> Randomise Scales </Typography>
              }
            />
            <br />
            <FormControlLabel
              control={(
                <Switch
                  checked={reverseNotes}
                  onChange={() => this.toggleReverseNotes()}
                  color="primary"
                  name="checkedB"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
                />
                )}
              label={
                <Typography variant="h6"> Reverse Notes </Typography>
              }
            />
          </div>
        </div>
      </div>
    );
  }
}

ScaleGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(ScaleGenerator), 'Scale Generator');
