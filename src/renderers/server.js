import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';

import { App } from 'components/App';
// Importing the Bootstrap CSS

export async function serverRenderer() {
  const initialData = {
    appName: 'Github Timeliner',
  };

  const pageData = {
    title: `${initialData.appName}`,
  };

  return Promise.resolve({
    initialData,
    initialMarkup: ReactDOMServer.renderToString(
      <App initialData={initialData} />,
    ),
    pageData,
  });
}
