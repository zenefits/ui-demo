import React from 'react';
import { HashRouter as Router } from 'react-router-dom';

export default function routerDecorator(storyFn: Function) {
  return <Router>{storyFn()}</Router>;
}
