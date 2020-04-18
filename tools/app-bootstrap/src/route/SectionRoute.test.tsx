import React from 'react';
import { BrowserRouter as Router, Link, Redirect, Switch } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { fireEvent, wait } from '@testing-library/react';

import { renderWithContext } from 'z-frontend-theme/test-utils/theme';

import { InjectIntlContext } from '../createIntlProvider';
import SectionRoute from '../../src/route/SectionRoute';

const Overview = () => (
  <div>
    <h1>Overview</h1>
    <Link to="/people">View People</Link>
  </div>
);

const People = () => (
  <div>
    <h1>All People</h1>
  </div>
);

const appName = 'MyApp';

const exampleMessages = {
  'nav.productTitle': appName,
};

const Example = () => (
  <IntlProvider locale="en" messages={exampleMessages}>
    <InjectIntlContext>
      <Router>
        <Switch>
          <SectionRoute path="/overview" component={Overview} />
          <SectionRoute path="/people" component={People} title="People" />
          <Redirect to="/overview" />
        </Switch>
      </Router>
    </InjectIntlContext>
  </IntlProvider>
);

describe('SectionRoute', () => {
  it('title defaults to <app> - Zenefits', async () => {
    const { getByText } = renderWithContext(<Example />);
    getByText('Overview');
    await wait(() => expect(document.title).toEqual(`${appName} - Zenefits`));
  });

  it('title changes per section to <section> - <app> - Zenefits', async () => {
    const { getByText } = renderWithContext(<Example />);

    const link = getByText('View People');
    fireEvent.click(link);

    await wait(() => {
      getByText('All People');
      expect(document.title).toEqual(`People - ${appName} - Zenefits`);
    });
  });
});
