import React from 'react';
import {
  withStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';
import withLayout from '../../../src/lib/with-layout';
import { MAX_CONTENT_WIDTH } from '../../../components/constants';

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
  settings: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  circleContainer: {
    position: 'relative',
    width: '200px',
    height: '200px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: '2px solid black',
    position: 'relative'
  },
  movingObject: {
    width: '10px',
    height: '10px',
    backgroundColor: 'blue',
    position: 'absolute',
    left: '100px',
    top: '0px',
  },
  milestone: {
    width: '10px',
    height: '10px',
    backgroundColor: 'red',
    position: 'absolute'
  },
  rhythmContainer: {
    marginBottom: '1.5em',
    '& p': {
      fontSize: '1.5em'
    },
    '& span': {
      padding: '0.25em'
    }
  }
});

class RhythmGenerator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }



  
  render() {
    const { classes } = this.props;
    const headline = 'Generating Rhythms';


    // const movingObject = document.querySelector('.moving-object');
    // const clickSound = document.getElementById('click-sound');
    // const circleContainer = document.querySelector('.circle-container');
    // const circleRadius = circleContainer.offsetWidth / 2 - 5; // Adjusting for the object's offset
    let currentDegree = 0;
    let isMute = false;
    let animationFrameId = null;

    const speedInDegreesPerFrame = 1.8; // Set your speed here

    return (
      <div className={classes.container}>
        <div className={classes.rhythmContainer}>
            <div className={classes.circleContainer}>
                <div class="circle">
                <div class="moving-object"></div>
                </div>
            </div>
            <div>
                <button id="start" onclick="startAnimationForSubdivisions()">Start</button>
                <button id="stop" onclick="stopAnimation()">Stop</button>
            </div>
            <div>
                <input type="checkbox" id="subdivision_3" onchange="addSubdivision(3)" checked></input>
                <label for="subdivision_3">3</label>

                <input type="checkbox" id="subdivision_4" onchange="addSubdivision(4)" checked></input>
                <label for="subdivision_4">4</label>

                <input type="checkbox" id="subdivision_5" onchange="addSubdivision(5)" checked></input>
                <label for="subdivision_5">5</label>

                <input type="checkbox" id="subdivision_7" onchange="addSubdivision(7)" checked></input>
                <label for="subdivision_7">7</label>
            </div>
        </div>
        <hr />
        <div className={classes.settings}></div>
      </div>
    );
  }
}

RhythmGenerator.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(RhythmGenerator), 'Rhythm Generator');
