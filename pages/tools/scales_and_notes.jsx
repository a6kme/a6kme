import React from 'react';
import {
  Typography,
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = () => ({
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
  nextScale: {
    color: 'gray'
  },
  currentScale: {
    backgroundColor: '#a2cf6e'
  },
  selectedNote: {
    backgroundColor: '#d7e360'
  }
});

const ScalesAndNotes = (props) => {
  const {
    notes, scale, nextScale, classes, isNoteSelected, onlyRelativeMinor
  } = props;
  const headline = onlyRelativeMinor ? 'Generating Relative Minor Scales' : 'Generating Random Scales';
  return (
    <div className={classes.scalesContainer}>
      <Typography
        align="center"
        color="primary"
        variant="h5"
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
      <div>
        <p>
          {notes.map((note, index) => {
            const uniqueKey = `${scale}_${index}`;
            if (isNoteSelected(index)) {
              return <span key={uniqueKey} className={classes.selectedNote}>{note}</span>;
            }
            return <span key={uniqueKey}>{note}</span>;
          })}
        </p>
      </div>
    </div>
  );
};

ScalesAndNotes.propTypes = {
  classes: PropTypes.object.isRequired,
  notes: PropTypes.arrayOf(PropTypes.string).isRequired,
  scale: PropTypes.string.isRequired,
  nextScale: PropTypes.string.isRequired,
  isNoteSelected: PropTypes.func.isRequired,
  onlyRelativeMinor: PropTypes.bool.isRequired
};

export default withStyles(styles)(ScalesAndNotes);
