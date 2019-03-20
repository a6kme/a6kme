import React from 'react';
import Head from 'next/head';
import Header from '../../components/header';

/* eslint-disable react/display-name */
// Library code, hence not giving display name
export default (Component, title = 'Title') => props => (
  <div>
    <Head>
      <title>{title}</title>
    </Head>
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"Segoe UI", "Roboto", "Helvetica Neue", "Arial", "sans-serif"'
    }}
    >
      <Header />
      <Component {...props} />
    </div>
  </div>
);
