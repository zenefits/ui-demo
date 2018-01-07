import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';
import { Subhead } from 'rebass';
import { FormattedMessage, FormattedPlural, FormattedRelative } from 'react-intl';
import Link from 'z-frontend-forms/src/Link';
import Heading from 'z-frontend-theme/src/Heading';

import { setFooAction } from './example';
import RouteNotFound from './RouteNotFound';

function mapStateToProps(state) {
  return {
    foo: state.example.foo,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setFoo(newFoo) {
      dispatch(setFooAction(newFoo));
    },
  };
}

const MyQuery = gql`
  query {
    dashboard(id: "me") {
      company {
        name
        employees {
          id
        }
      }
      employee {
        first_name
      }
    }
  }
`;

interface Props {
  foo: string;
  setFoo: (newFoo: string) => {};
  data: any;
}

const myFunction = () => <h1>Hi</h1>;
const MainComponent = () => <div> Main Component </div>;

class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.setFoo(Date.now().toString());
  }
  render() {
    const { loading, error, dashboard } = this.props.data;
    const dragonsCount = 6;

    if (loading) {
      return <div>Loading...</div>;
    } else if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <div>
        <Heading onClick={this.onClick}>{dashboard.company.name}</Heading>
        {
          <Subhead>
            Welcome {dashboard.employee.first_name}! There are {dashboard.company.employees.length} employees in your
            company.
          </Subhead>
        }
        <div>
          <div>
            <FormattedRelative value="2017-09-02 14:33:23" />
          </div>
          <span>
            {dragonsCount} <FormattedPlural value={dragonsCount} one="dragon" other="dragons" />
          </span>
          <h6 className="z-dashboard-row-label">
            <FormattedMessage id="dashboard.apps" defaultMessage="Apps" description="Apps label" />
          </h6>
          <span>Test hot reloading - {this.props.foo}</span>
          <button onClick={this.onClick}>Hot reload</button>
        </div>
        <hr />

        <div>
          <Link to="/main">Mainaaa</Link>
          <br />
          <Link to="/hi">Hi</Link>
          <br />
          <Link to="/routenotfound">Route Not Found</Link>
        </div>
        <hr />

        <Switch>
          <Route exact path="/main" component={MainComponent} />
          <Route path="/hi" component={myFunction} />
          <Route component={RouteNotFound} />
        </Switch>
      </div>
    );
  }
}
const AppWithRedux = connect(mapStateToProps, mapDispatchToProps)(App);
const AppWithData = graphql(MyQuery)(AppWithRedux);

export default withRouter(AppWithData);
// If a component containing <Route> components is exported with a Redux connect wrapper,
// rerender of the components would be broken (in this case it's on route changes). Adding withRouter
// would fix the issue.
// For more details see https://github.com/ReactTraining/react-router/issues/4671
