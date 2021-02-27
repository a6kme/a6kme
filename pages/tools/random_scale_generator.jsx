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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import withLayout from '../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../components/constants';
import { getScale, getNotesOfScale } from '../../src/lib/scales';

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
  scalesContainer: {
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
  toggleReverse: {
    display: 'flex'
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
      reverseNotes: true,
      scaleDuration: 16,
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

  getNotes(scale) {
    let notes = getNotesOfScale(scale);
    const { reverseNotes } = this.state;
    if (reverseNotes) {
      notes = notes.concat(notes.slice().reverse());
    }
    return notes;
  }

  tick() {
    const {
      beatCount, scale, nextScale, scaleDuration
    } = this.state;
    let currentScale = scale;
    let upcomingScale = nextScale;
    if (beatCount && (beatCount + 1) % scaleDuration === 0) {
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

  noteRefreshTime() {
    const { bpm } = this.state;
    return (60 / bpm) * 1000;
  }

  render() {
    const { classes } = this.props;
    const {
      scale, bpm, nextScale, reverseNotes
    } = this.state;
    const notes = this.getNotes(scale);
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
          <div className={classes.toggleReverse}>
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

RandomScaleGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(RandomScaleGenerator), 'Random Scale Generator');
