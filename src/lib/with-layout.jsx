import React from 'react';
import Head from 'next/head';
import { withRouter } from 'next/router';
import Header from '../../components/header';

/* eslint-disable react/display-name */
// Library code, hence not giving display name
export default (Component, title) => withRouter((props) => {
  const { router } = props;
  return (
    <div>
      {title ? (
        <Head>
          <title>{title}</title>
        </Head>
      ) : null }
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
      }}
      >
        <Header router={router} />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...props} />
      </div>
    </div>
  );
});
