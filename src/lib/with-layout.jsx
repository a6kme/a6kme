import React from 'react';
import Head from 'next/head';
import Header from '../../components/header';

/* eslint-disable react/display-name */
// Library code, hence not giving display name
export default (Component, title) => props => (
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
      <Header />
      <Component {...props} />
    </div>
  </div>
);
