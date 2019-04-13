import React, { Component } from 'react';

import { Avatar, AvatarProps } from 'z-frontend-composites';
// import { styled } from 'z-frontend-theme';

export interface RobotAvatarProps extends AvatarProps {
  id?: string;
  name: string;
}

interface RobotAvatarState {}

class RobotAvatar extends Component<RobotAvatarProps, RobotAvatarState> {
  speak = () => {
    const message = new SpeechSynthesisUtterance('The humans are dead');
    message.pitch = 0.5;
    message.rate = 0.8;
    window.speechSynthesis.speak(message);
  };

  render() {
    const { name, ...rest } = this.props;
    const src = `https://robohash.org/${name}`;
    return <Avatar photoUrl={src} {...rest} />;
  }
}

export default RobotAvatar;
