import React from 'react';

import { Button } from 'zbase';
import { Card } from 'z-frontend-composites';

import OverviewLayout from './OverviewLayout';

export default () => (
  <OverviewLayout
    heroTitle="Your feedback is valuable!"
    heroSubtitle="Create reviews that fit your team and collect feedback in one location."
    heroRender={() => <Button p={2}>Provide Feedback</Button>}
    mainRender={() => <Card p={5}>Main content</Card>}
    sideRender={() => <Card p={5}>Side content</Card>}
  />
);
