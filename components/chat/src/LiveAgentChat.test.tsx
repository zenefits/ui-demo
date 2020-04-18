import React from 'react';

import { mountEnzymeWithTheme } from 'z-frontend-theme/test-utils/theme';

import LiveAgentChat, { setChatStatus } from './LiveAgentChat';

describe('LiveAgentChat', () => {
  it('should mount without throwing an error', () => {
    expect(mountEnzymeWithTheme(<LiveAgentChat />)).toHaveLength(1);
  });

  it('should open the chat window properly', () => {
    const wrapper = mountEnzymeWithTheme(<LiveAgentChat />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    expect(wrapper.state().isChatWindowOpened).toBe(true);
    expect(wrapper.state().isChatInitialized).toBe(true);
  });

  it('should minimize the chat window properly', () => {
    const wrapper = mountEnzymeWithTheme(<LiveAgentChat isChatActive />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    // mock that salesforce was connected to
    wrapper.setState({ isChatAvailable: true });
    expect(wrapper.find('iframe')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(wrapper.state().isChatWindowOpened).toBe(false);
    // iframe should be there to keep the communication going
    expect(wrapper.find('iframe')).toHaveLength(1);
    wrapper.setState({ notificationCounter: 2 });
    expect(wrapper.text().trim()).toBe('2');
  });

  it('should show unavailable message when chat is unavailable', () => {
    const wrapper = mountEnzymeWithTheme(<LiveAgentChat />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    wrapper.setState({ isChatAvailable: false });
    expect(wrapper.text().trim()).toContain('implementation-support@zenefits.com');
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('should show close chat window button when chat is ended', () => {
    const wrapper = mountEnzymeWithTheme(<LiveAgentChat />);
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').simulate('click');
    wrapper.setState({ isChatEnded: true });
    expect(wrapper.state().isChatWindowOpened).toBe(true);
    expect(wrapper.find('button')).toHaveLength(2);
    wrapper
      .find('button')
      .last()
      .simulate('click');
    expect(wrapper.state().isChatWindowOpened).toBe(false);
  });
});

describe('setChatStatus function', () => {
  it('should return the right object if status is equal to warning', () => {
    const mockState = { showTimeOutWarning: false };
    const returnedObject = setChatStatus('warning', mockState);
    expect(returnedObject).toEqual({ notificationCounter: 0, isChatWindowOpened: true, showTimeOutWarning: true });
    const secondReturnedObject = setChatStatus('warning', returnedObject);
    expect(secondReturnedObject).toEqual(null);
  });

  it('should return the right object if status is equal to clearTimeout', () => {
    const mockState = { showTimeOutWarning: true };
    expect(setChatStatus('clearTimeout', mockState)).toEqual({ showTimeOutWarning: false });
  });

  it('should return the right object if status is equal to timeout', () => {
    const mockState = {};
    expect(setChatStatus('timeout', mockState)).toEqual({
      isChatWindowOpened: true,
      showTimeOutWarning: false,
      isChatEnded: true,
    });
  });

  it('should return the right object if status is equal to finished or canceled', () => {
    const mockState = { notificationCounter: 0 };
    const returnedObject = setChatStatus('finished', mockState);
    expect(returnedObject).toEqual({ isChatEnded: true, notificationCounter: 1 });
    const secondReturnedObject = setChatStatus('finished', {
      ...mockState,
      isChatWindowOpened: true,
      isChatEnded: false,
    });
    expect(secondReturnedObject).toEqual({ isChatEnded: true, showTimeOutWarning: false });
  });

  it('should return the right object if status is equal to rejected', () => {
    expect(setChatStatus('rejected', { isChatWindowOpened: true })).toEqual({
      isChatAvailable: false,
      isChatEnded: true,
    });
    expect(setChatStatus('rejected', { isChatWindowOpened: false, notificationCounter: 0 })).toEqual({
      isChatEnded: true,
      notificationCounter: 1,
      isChatAvailable: false,
    });
  });

  it('should return the rightObject if status is equal to receivedChat', () => {
    expect(setChatStatus('receivedChat', { isChatWindowOpened: true })).toEqual(null);
    expect(setChatStatus('receivedChat', { notificationCounter: 0 })).toEqual({
      isChatEnded: false,
      notificationCounter: 1,
    });
  });
});
