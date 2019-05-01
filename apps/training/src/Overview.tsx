import React, { Component } from 'react';

import { OverviewLayout } from 'z-frontend-layout';
import { Button } from 'z-frontend-elements';
import { Card } from 'z-frontend-composites';

import RobotAvatar from './RobotAvatar';

class Overview extends Component {
  render() {
    return (
      <OverviewLayout
        heroTitle="Welcome to Robofits"
        heroSubtitle="Preparing for the distant future (the year 2000) when all employees are robotic beings."
        heroRender={() => (
          <Button.RouteLink mode="primary" to="/robots">
            View Robots
          </Button.RouteLink>
        )}
        sideRender={() => (
          <Card>
            <Card.Header>Featured Robot</Card.Header>
            <Card.Row>
              <RobotAvatar width={75} name="Zenebot" />
            </Card.Row>
          </Card>
        )}
      />
    );
  }
}
export default Overview;
