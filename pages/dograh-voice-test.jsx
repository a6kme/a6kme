import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Typography,
  withStyles
} from '@material-ui/core';
import CallEndIcon from '@material-ui/icons/CallEnd';
import MicIcon from '@material-ui/icons/Mic';
import withLayout from '../src/lib/with-layout';
import { FONT_SELECTED_COLOR, MAX_CONTENT_WIDTH } from '../components/constants';

const DOGRAH_WIDGET_SCRIPT_ID = 'dograh-widget';
const DOGRAH_WIDGET_SRC = 'https://app.dograh.com/embed/dograh-widget.js?token=emb_si2UV0tRjs0alZhfwtHNIyGecB1LQp3OI_woXa6dvNU&environment=production&apiEndpoint=https://api.dograh.com';

const STATUS_LABELS = {
  idle: 'Talk to AI',
  connecting: 'Connecting...',
  connected: 'End Call',
  failed: 'Retry'
};

const styles = (theme) => ({
  container: {
    maxWidth: MAX_CONTENT_WIDTH,
    width: '100%',
    margin: '5em auto',
    padding: '0 2em',
    [theme.breakpoints.down('sm')]: {
      margin: '3em auto',
      padding: '0 1em'
    },
    '& p': {
      margin: '0.75em 0'
    }
  },
  controlPanel: {
    borderTop: '1px solid #f0edea',
    borderBottom: '1px solid #f0edea',
    padding: '2em 0',
    margin: '2em 0'
  },
  statusRow: {
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.75em',
    justifyContent: 'center',
    marginBottom: '1.5em'
  },
  statusBadge: {
    border: '1px solid #d7d3cf',
    borderRadius: '4px',
    color: '#555',
    display: 'inline-block',
    fontSize: '0.875rem',
    lineHeight: 1,
    padding: '0.5em 0.75em',
    textTransform: 'uppercase'
  },
  readyBadge: {
    borderColor: '#bfe3cf',
    color: FONT_SELECTED_COLOR
  },
  actionButton: {
    backgroundColor: FONT_SELECTED_COLOR,
    color: '#fff',
    display: 'flex',
    margin: '0 auto',
    minWidth: '12em',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#3c9e6f'
    },
    '&:disabled': {
      color: '#999'
    }
  },
  endButton: {
    backgroundColor: '#b34d4d',
    '&:hover': {
      backgroundColor: '#963f3f'
    }
  },
  error: {
    backgroundColor: '#fff3f3',
    border: '1px solid #efd1d1',
    borderRadius: '4px',
    color: '#8a3333',
    marginTop: '1.5em',
    padding: '1em'
  },
  eventLog: {
    backgroundColor: '#faf9f7',
    border: '1px solid #f0edea',
    borderRadius: '4px',
    color: '#555',
    fontFamily: 'monospace',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    listStyle: 'none',
    margin: '1.5em 0 0 0',
    maxHeight: '18em',
    overflowY: 'auto',
    padding: '1em'
  },
  emptyLog: {
    color: '#888'
  }
});

const DograhVoiceTest = (props) => {
  const { classes } = props;
  const [status, setStatus] = React.useState('idle');
  const [statusText, setStatusText] = React.useState('');
  const [statusSubtext, setStatusSubtext] = React.useState('');
  const [isWidgetReady, setIsWidgetReady] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [events, setEvents] = React.useState([]);

  const addEvent = React.useCallback((label, payload) => {
    const timestamp = new Date().toLocaleTimeString();
    const detail = payload ? ` ${JSON.stringify(payload)}` : '';
    setEvents((currentEvents) => {
      const event = {
        id: `${Date.now()}-${label}-${currentEvents.length}`,
        text: `${timestamp} ${label}${detail}`
      };

      return [
        event,
        ...currentEvents
      ].slice(0, 25);
    });
  }, []);

  React.useEffect(() => {
    let isMounted = true;
    let hasRegistered = false;
    let retries = 0;
    let retryTimer = null;

    const registerCallbacks = () => {
      if (!isMounted || hasRegistered) return;

      // eslint-disable-next-line no-undef
      const dograhWidget = window.DograhWidget;
      if (!dograhWidget) {
        if (retries < 50) {
          retries += 1;
          retryTimer = setTimeout(registerCallbacks, 100);
        }
        return;
      }

      hasRegistered = true;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }

      setIsWidgetReady(true);
      addEvent('widget-ready');

      dograhWidget.onStatusChange((nextStatus, nextText, nextSubtext) => {
        if (!isMounted) return;

        setStatus(nextStatus || 'idle');
        setStatusText(nextText || '');
        setStatusSubtext(nextSubtext || '');
        addEvent('status-change', {
          status: nextStatus,
          text: nextText,
          subtext: nextSubtext
        });
      });

      dograhWidget.onCallStart(() => {
        if (!isMounted) return;

        setErrorMessage('');
        addEvent('call-start');
      });

      dograhWidget.onCallConnected((payload) => {
        if (!isMounted) return;

        addEvent('call-connected', payload);
      });

      dograhWidget.onCallDisconnected((payload) => {
        if (!isMounted) return;

        addEvent('call-disconnected', payload);
      });

      dograhWidget.onCallEnd(() => {
        if (!isMounted) return;

        addEvent('call-end');
      });

      dograhWidget.onError((error) => {
        if (!isMounted) return;

        const message = error && error.message ? error.message : 'Unknown Dograh widget error';
        setErrorMessage(message);
        addEvent('error', { message });
      });
    };

    const loadWidget = () => {
      // eslint-disable-next-line no-undef
      if (window.DograhWidget) {
        registerCallbacks();
        return;
      }

      // eslint-disable-next-line no-undef
      let script = document.getElementById(DOGRAH_WIDGET_SCRIPT_ID);
      if (!script) {
        // eslint-disable-next-line no-undef
        script = document.createElement('script');
        script.id = DOGRAH_WIDGET_SCRIPT_ID;
        script.src = DOGRAH_WIDGET_SRC;
        script.async = true;
        // eslint-disable-next-line no-undef
        document.body.appendChild(script);
      }

      script.addEventListener('load', registerCallbacks, { once: true });
      registerCallbacks();
    };

    loadWidget();

    return () => {
      isMounted = false;
      if (retryTimer) {
        clearTimeout(retryTimer);
      }
    };
  }, [addEvent]);

  const isLive = status === 'connected' || status === 'connecting';
  const buttonLabel = STATUS_LABELS[status] || STATUS_LABELS.idle;

  const handleCallToggle = () => {
    // eslint-disable-next-line no-undef
    const dograhWidget = window.DograhWidget;
    if (!dograhWidget) {
      setErrorMessage('Dograh widget is still loading.');
      return;
    }

    if (isLive) {
      dograhWidget.end();
      return;
    }

    dograhWidget.start();
  };

  return (
    <main className={classes.container}>
      <Typography gutterBottom align="center" variant="h4">
        Dograh Voice Test
      </Typography>
      <Typography align="center" variant="body1">
        Temporary headless embed route for testing the voice agent.
      </Typography>

      <section className={classes.controlPanel}>
        <div className={classes.statusRow}>
          <span className={classes.statusBadge}>
            {status}
          </span>
          {isWidgetReady ? (
            <span className={`${classes.statusBadge} ${classes.readyBadge}`}>
              widget ready
            </span>
          ) : (
            <span className={classes.statusBadge}>
              loading widget
            </span>
          )}
        </div>

        <Button
          className={`${classes.actionButton} ${isLive ? classes.endButton : ''}`}
          disabled={!isWidgetReady}
          onClick={handleCallToggle}
          startIcon={isLive ? <CallEndIcon /> : <MicIcon />}
          variant="contained"
        >
          {buttonLabel}
        </Button>

        {statusText ? (
          <Typography align="center" variant="body1">
            {statusText}
          </Typography>
        ) : null}

        {statusSubtext ? (
          <Typography align="center" variant="body2">
            {statusSubtext}
          </Typography>
        ) : null}

        {errorMessage ? (
          <div className={classes.error}>
            <Typography variant="body2">
              {errorMessage}
            </Typography>
          </div>
        ) : null}
      </section>

      <Typography align="left" variant="h6">
        Event Log
      </Typography>
      <ul className={classes.eventLog}>
        {events.length ? events.map((event) => (
          <li key={event.id}>
            {event.text}
          </li>
        )) : (
          <li className={classes.emptyLog}>
            Waiting for Dograh events...
          </li>
        )}
      </ul>
    </main>
  );
};

DograhVoiceTest.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withLayout(withStyles(styles)(DograhVoiceTest), 'Dograh Voice Test');
