export const BACKGROUND_COLOR = '#f4f2f0';
export const FONT_SELECTED_COLOR = '#4db380';
export const MAX_CONTENT_WIDTH = '740px';
export const LINK_COLOR = '#2196f3';
export const getArticlesStyle = theme => ({
  root: {
    maxWidth: MAX_CONTENT_WIDTH,
    margin: '6em auto',
    [theme.breakpoints.down('sm')]: {
      margin: '1em 1em'
    },
    '& h4': {
      ...theme.typography.h4
    },
    '& p': {
      ...theme.typography.body1
    },
    '& li': {
      ...theme.typography.body1,
      marginBottom: '.75em'
    },
    '& code': {
      fontFamily: '"Inconsolata", monospace',
      backgroundColor: 'rgba(27,31,35,.05)'
    },
    '& p code, li code': {
      padding: '1px 5px'
    },
    '& img': {
      maxWidth: '100%',
      margin: 'auto'
    },
    '& a': {
      textDecoration: 'none',
      color: LINK_COLOR,
      '&:hover': {
        textDecoration: 'underline'
      }
    }
  },
});
