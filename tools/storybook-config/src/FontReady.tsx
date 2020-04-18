import { Component } from 'react';

// @ts-ignore
import WebFont from 'webfontloader';

// @ts-ignore
import { isChromatic } from 'storybook-chromatic';

// @ts-ignore
function checkFonts() {
  const statuses: any = {};
  (document as any).fonts.forEach((f: any) => {
    const key = [f.family, f.style, f.weight].join('-');
    statuses[key] = f.status;
  });
  console.log(JSON.stringify(statuses));
}

export default class FontReady extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    WebFont.load({
      custom: {
        families: ['Circular:n4,n6', 'Material-Design-Iconic-Font'],
      },
      active: () => {
        // console.log('fonts have loaded');
        // checkFonts();
        this.setState({ ready: true });
      },
    });
  }

  render() {
    if (!isChromatic() || this.state.ready) {
      return this.props.children;
    }
    return null;
  }
}
