/* eslint-disable prefer-destructuring */
import React, { AllHTMLAttributes, Component } from 'react';

import { IconButton, Link } from 'z-frontend-elements';
import { Box, Flex, FlexProps, TextBlock, TextInline } from 'zbase';
import { css, styled } from 'z-frontend-theme';
import { color, fontSizes, zIndex } from 'z-frontend-theme/utils';

const SALESFORCE_CHAT_BUTTONS = {
  implementation: {
    default: '5731M000000D7DY',
    'secure.zenefits.com': '5731M000000D7DY',
  },
  hr: {
    default: '573160000004vgQ',
  },
  insurance: {
    default: '573160000004vgV',
  },
  payroll: {
    default: '573160000004vga',
  },
};

const SALESFORCE_CHAT_LIVEAGENT_INIT_SUPPORT = {
  default: ['https://d.la2-c2-ord.salesforceliveagent.com/chat', '572160000004uzq', '00DG0000000hkMq'],
};

const SALESFORCE_CHAT_LIVEAGENT_INIT_IMPLEMENATION = {
  default: ['https://d.la2-c2-iad.salesforceliveagent.com/chat', '572160000004uzq', '00DG0000000hkMq'],
  'secure.zenefits.com': ['https://d.la2-c2-iad.salesforceliveagent.com/chat', '572160000004uzq', '00DG0000000hkMq'],
};

const EMAIL_ADDRESS_AND_SUBJECT = {
  implementation: {
    address: 'implementation-support@zenefits.com',
    subject: 'IMPLEMENATION SUPPORT MESSAGE',
  },
  // change the below email address and subjects when you implement support queues
  hr: {
    address: 'implementation-support@zenefits.com',
    subject: 'IMPLEMENATION SUPPORT MESSAGE',
  },
  insurance: {
    address: 'implementation-support@zenefits.com',
    subject: 'IMPLEMENATION SUPPORT MESSAGE',
  },
  payroll: {
    address: 'implementation-support@zenefits.com',
    subject: 'IMPLEMENATION SUPPORT MESSAGE',
  },
};

const ActiveIconButton = styled(IconButton)`
  background-color: ${color('link.normal')};
  color: ${color('grayscale.white')};

  &:hover:not(:disabled) {
    background-color: ${color('link.hover')};
    color: ${color('grayscale.white')};
  }
`;

const iframeStyle = css`
  width: 100%;
  margin: 0 auto;
  background-color: ${color('grayscale.g')};
  border: solid ${color('secondary.b')} 2px;
`;

type IFrameProps = AllHTMLAttributes<HTMLIFrameElement> & { isChatWindowOpened?: boolean };
const StyledIframe = styled.iframe<IFrameProps>`
  ${iframeStyle};
  border-width: ${(props: IFrameProps) => (props.isChatWindowOpened ? '2px' : 0)};
`;

const StyledUnavailableContainer = styled(Flex)`
  ${iframeStyle};
`;

const StyledDiv = styled.div`
  display: none;
`;

const StyledContainer = styled(Box)`
  position: fixed;
  color: ${color('grayscale.black')};
  right: 10px;
  bottom: 10px;
  z-index: ${props => 1 + zIndex('fixed')(props)};
`;

const CenteredTextBlock = styled(TextBlock)`
  text-align: center;
  font-size: ${fontSizes(1)};
`;
const openedWindowStyle = css`
  height: 50vh;
  width: 320px;
  max-height: 600px;
`;
const fullLengthWindowStyle = css`
  height: 90vh;
  width: 320px;
`;

const minimizedWindowStyle = css`
  height: 0;
  width: 0;
`;

function getChatWindowStyle(options: any) {
  return options.isChatWindowOpened
    ? options.isChatWindowFullLength
      ? fullLengthWindowStyle
      : openedWindowStyle
    : minimizedWindowStyle;
}

// need to keep the same iframe in the dom to keep listening for messages
const StyledFlex = styled(Flex)<FlexProps & { isChatWindowOpened?: boolean; isChatWindowFullLength?: boolean }>`
  ${props => getChatWindowStyle(props)};
`;

const StyledBadge = styled(Flex)`
  background-color: ${color('primary.a')};
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-flex;
`;

const StyledWarningBanner = styled(Flex)`
  background-color: ${color('negation.c')};
  border: solid ${color('negation.b')} 1px;
  height: 15%;
`;

interface Props {
  /**
   * The name of the queue that the chat will connect to
   * @default implementation
   */
  queueName?: 'implementation' | 'hr' | 'insurance' | 'payroll';
  /**
   * Function to be called on click on chat icon.
   * @default null
   */
  onChatClick?: () => void;
  /**
   * Function to be called on closure on chat icon.
   * @default null
   */
  onChatClose?: () => void;
  /**
   * Boolean indicating whether chat is active
   * @default false
   */
  isChatActive?: boolean;
}

interface State {
  // started the chat
  isChatInitialized: boolean;
  // there are ppl to talk to
  isChatAvailable: boolean;
  // the chat is has been ended by the customer or the agent
  isChatEnded: boolean;
  // the chat window is opened if true, minimized if false
  isChatWindowOpened: boolean;
  isChatWindowFullLength: boolean;
  // counts the notifications if its minimized
  notificationCounter: number;
  // show warning if the chat is about to timeout
  showTimeOutWarning: boolean;
}

enum STATUS_LOOKUP {
  CHAT_REQUEST_SUCCESSFUL = 'waitingOnAgent',
  CHAT_REQUEST_FAILED = 'rejected', // agent rejected the chat
  CHAT_ESTABLISHED = 'chatting',
  AGENT_CHAT_MESSAGE = 'receivedChat', // received chat message
  CHASITOR_CHAT_MESSAGE = 'sentChat', // sent chat message
  CHASITOR_CHAT_ENDED = 'finished', // customer ended chat
  CHASITOR_CHAT_CANCELED = 'canceled',
  CHASITOR_IDLE_TIMEOUT = 'timeout',
  AGENT_CHAT_ENDED = 'finished', // agent ended chat
  UPDATE_CHASITOR_IDLE_TIMEOUT_WARNING = 'warning', // about to timeout
  CLEAR_CHASITOR_IDLE_TIMEOUT = 'clearTimeout', // clear the timeout
}

export const setChatStatus = (status: any, state: any) => {
  const { isChatWindowOpened, notificationCounter, showTimeOutWarning } = state;
  if (status === 'warning' && !showTimeOutWarning) {
    // ^ chat is about to timeout show warning
    return { notificationCounter: 0, isChatWindowOpened: true, showTimeOutWarning: true };
  } else if (status === 'clearTimeout' && showTimeOutWarning) {
    // ^ customer sent a chat after the timeout warning
    return { showTimeOutWarning: false };
  } else if (status === 'timeout') {
    return { isChatWindowOpened: true, showTimeOutWarning: false, isChatEnded: true };
    // ^ make sure the window is open, hide warning since it already happened, and show close window icon button
  } else if ((status === 'finished' || status === 'canceled') && isChatWindowOpened) {
    return { isChatEnded: true, showTimeOutWarning: false };
  } else if (status === 'rejected') {
    if (!isChatWindowOpened) {
      const newCount = notificationCounter + 1;
      return { isChatEnded: true, notificationCounter: newCount, isChatAvailable: false };
    } else {
      return { isChatAvailable: false, isChatEnded: true };
    }
  } else if (!isChatWindowOpened && (status === 'receivedChat' || status === 'finished' || status === 'canceled')) {
    const isChatEnded = status === 'finished' || status === 'canceled';
    const newCount = notificationCounter + 1;
    return { isChatEnded, notificationCounter: newCount };
  } else {
    return null;
  }
};

export default class LiveAgentChat extends Component<Props, State> {
  static defaultProps = {
    queueName: 'implementation',
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      isChatInitialized: false,
      isChatAvailable: true,
      isChatEnded: false,
      isChatWindowOpened: false,
      notificationCounter: 0,
      showTimeOutWarning: false,
      isChatWindowFullLength: false,
    };
  }

  componentDidMount() {
    window.addEventListener('message', this.listenToChatStatus);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.listenToChatStatus);
  }

  listenToChatStatus = (e: any) => {
    const status = (STATUS_LOOKUP as any)[e.data];
    if (status) {
      const newState = setChatStatus(status, this.state);
      const currentState = this.state;
      if (newState) {
        this.setState({ ...currentState, ...newState });
      }
    }
  };

  loadLiveAgent = (caseId?: any) => {
    const button =
      (SALESFORCE_CHAT_BUTTONS as any)[this.props.queueName][window.location.hostname] ||
      SALESFORCE_CHAT_BUTTONS[this.props.queueName]['default'];

    const liveagentInitQueue: { [key: string]: any } =
      this.props.queueName === 'implementation'
        ? SALESFORCE_CHAT_LIVEAGENT_INIT_IMPLEMENATION
        : SALESFORCE_CHAT_LIVEAGENT_INIT_SUPPORT;
    const liveagentInit = liveagentInitQueue[window.location.hostname] || liveagentInitQueue['default'];

    const { makeChatUnavailable } = this;

    // hack to clean up after previous possible liveagent runs
    // (it can't run more than once, you need to clean up and re-add the javascript)
    delete (window as any).liveagent;
    delete (window as any).liveAgentDeployment;
    (window as any)._laq = [];

    // various crazy live-agent code:
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      const { liveagent } = window as any; // make linter happy
      if (!(window as any)._laq) {
        (window as any)._laq = [];
      }
      (window as any)._laq.push(() => {
        liveagent.showWhenOnline(button, document.getElementById('liveagent-button'));
      });

      // add parameters to the chat session
      if (caseId) {
        liveagent.addCustomDetail('Case ID', caseId);
        liveagent
          .findOrCreate('Case')
          .map('Id', 'Case ID', true, true, false)
          .saveToTranscript('CaseId')
          .showOnCreate();
      }

      let already = false;
      liveagent.addButtonEventHandler(button, (e: any) => {
        if (already) return;
        if (e === liveagent.BUTTON_EVENT.BUTTON_AVAILABLE) {
          already = true;
          liveagent.startChatWithWindow(button, 'chat-window');
        } else if (e === liveagent.BUTTON_EVENT.BUTTON_UNAVAILABLE) {
          makeChatUnavailable();
        }
      });
      // trigger start of wanting to chat:
      liveagent.init.apply(liveagent, liveagentInit);
    };
    script.src = 'https://secure.zenefits.com/static/js/libs/liveagent-chat-40.js';
    document.getElementsByTagName('head')[0].appendChild(script);
  };

  initializeChat = (caseId?: any) => {
    this.setState({ isChatInitialized: true, isChatWindowOpened: true, isChatEnded: false, isChatAvailable: true });
    if (caseId) this.loadLiveAgent(caseId);
  };

  openChatWindow = () => {
    this.setState({ notificationCounter: 0, isChatWindowOpened: true });
  };

  closeChatWindow = () => {
    this.setState({ isChatWindowOpened: false, isChatInitialized: false, isChatAvailable: true });
    if (this.props.onChatClose) this.props.onChatClose();
  };

  minimizeChatWindow = () => {
    this.setState({ isChatWindowOpened: false, notificationCounter: 0 });
  };

  makeChatUnavailable = () => {
    this.setState({ isChatAvailable: false, isChatEnded: true });
  };

  makeChatWindowFullLength = () => {
    this.setState({ isChatWindowFullLength: true });
  };

  makeChatWindowShort = () => {
    this.setState({ isChatWindowFullLength: false });
  };

  getMinimizedIcon = () => {
    const { notificationCounter } = this.state;

    return (
      <ActiveIconButton
        mode="normal"
        color="button.defaultNormal"
        iconName="comment-more"
        onClick={this.openChatWindow}
        s="large"
        title="Expand chat window"
        aria-label="Expand chat window"
      >
        {notificationCounter > 0 ? (
          <StyledBadge justify="center" align="center" ml={-1}>
            <TextInline fontStyle="controls.s" color="grayscale.white">
              {notificationCounter}
            </TextInline>
          </StyledBadge>
        ) : (
          ''
        )}
      </ActiveIconButton>
    );
  };

  render() {
    let onChatClick = this.initializeChat;
    if (this.props.onChatClick) {
      onChatClick = this.props.onChatClick;
    }
    const {
      isChatInitialized,
      isChatAvailable,
      isChatEnded,
      isChatWindowFullLength,
      isChatWindowOpened,
      showTimeOutWarning,
    } = this.state;
    const { isChatActive } = this.props;
    const ChatButton = isChatActive ? ActiveIconButton : IconButton;
    if (!isChatInitialized && !isChatWindowOpened) {
      return (
        <StyledContainer>
          <ChatButton
            mode="normal"
            iconName="comment-more"
            onClick={onChatClick}
            s="large"
            title="Chat with us"
            aria-label="Chat with us"
          />
        </StyledContainer>
      );
    } else if (isChatAvailable && isChatActive) {
      return (
        <StyledContainer>
          <Flex justify="flex-end" bg="secondary.b">
            {isChatWindowOpened &&
              (isChatWindowFullLength ? (
                <IconButton
                  iconName="chevron-down"
                  onClick={this.makeChatWindowShort}
                  title="Shorten the chat window"
                  aria-label="Shorten the chat window"
                  m={1}
                />
              ) : (
                <IconButton
                  iconName="chevron-up"
                  onClick={this.makeChatWindowFullLength}
                  title="Make the chat window full length"
                  aria-label="Make the chat window full length"
                  m={1}
                />
              ))}
            {isChatWindowOpened &&
              (isChatEnded ? (
                <IconButton
                  iconName="close"
                  onClick={this.closeChatWindow}
                  title="Close the chat window"
                  aria-label="Close the chat window"
                  m={1}
                />
              ) : (
                <IconButton
                  iconName="window-minimize"
                  onClick={this.minimizeChatWindow}
                  title="Minimize the chat window"
                  aria-label="Minimize the chat window"
                  m={1}
                />
              ))}
          </Flex>

          {!isChatWindowOpened && this.getMinimizedIcon()}
          <StyledFlex
            isChatWindowOpened={isChatWindowOpened}
            isChatWindowFullLength={this.state.isChatWindowFullLength}
            wrap
          >
            {showTimeOutWarning && isChatWindowOpened && (
              <StyledWarningBanner px={2} pt={1}>
                <TextBlock color="negation.a">
                  The chat is about to timeout. Please respond if you wish to continue.
                </TextBlock>
              </StyledWarningBanner>
            )}
            <StyledIframe
              name="chat-window"
              id="chat-window"
              frameBorder="0"
              allowFullScreen
              height={showTimeOutWarning ? '85%' : '100%'}
              isChatWindowOpened={isChatWindowOpened}
            />
            <StyledDiv id="liveagent-button" />
          </StyledFlex>
        </StyledContainer>
      );
    } else {
      const emailOptions = EMAIL_ADDRESS_AND_SUBJECT[this.props.queueName];
      return (
        <StyledContainer>
          <Flex justify="flex-end" bg="secondary.b">
            {isChatWindowOpened &&
              (isChatWindowFullLength ? (
                <IconButton
                  iconName="chevron-down"
                  onClick={this.makeChatWindowShort}
                  title="Shorten the chat window"
                  aria-label="Shorten the chat window"
                  m={1}
                />
              ) : (
                <IconButton
                  iconName="chevron-up"
                  onClick={this.makeChatWindowFullLength}
                  title="Make the chat window full length"
                  aria-label="Make the chat window full length"
                  m={1}
                />
              ))}
            {(isChatEnded || !isChatActive) && isChatWindowOpened && (
              <IconButton
                iconName="close"
                onClick={this.closeChatWindow}
                title="Close the chat window"
                aria-label="Close the chat window"
                m={1}
              />
            )}
          </Flex>
          {!isChatWindowOpened ? (
            this.getMinimizedIcon()
          ) : (
            <StyledFlex
              isChatWindowOpened={isChatWindowOpened}
              isChatWindowFullLength={this.state.isChatWindowFullLength}
            >
              <StyledUnavailableContainer align="center">
                <Flex px={3}>
                  {isChatActive ? (
                    <Flex justify="center" wrap>
                      <CenteredTextBlock fontStyle="headings.s">
                        All Implementation Managers are currently busy.
                      </CenteredTextBlock>
                      <CenteredTextBlock fontStyle="headings.s">
                        Please try again soon or email us directly, <br />
                        <Link href={`mailto:${emailOptions.address}?subject=${emailOptions.subject}`}>
                          {emailOptions.address}
                        </Link>
                      </CenteredTextBlock>
                    </Flex>
                  ) : (
                    <Flex justify="center" wrap>
                      <CenteredTextBlock fontStyle="headings.s">
                        Implementation Managers are available to chat: Mon - Fri, 9am - 5pm MST.
                      </CenteredTextBlock>
                      <CenteredTextBlock fontStyle="headings.s">
                        You can also email your question to the Implementation team at <br />
                      </CenteredTextBlock>
                      <CenteredTextBlock fontStyle="headings.s">
                        <Link href={`mailto:${emailOptions.address}?subject=${emailOptions.subject}`}>
                          {emailOptions.address}
                        </Link>
                      </CenteredTextBlock>
                    </Flex>
                  )}
                </Flex>
              </StyledUnavailableContainer>
            </StyledFlex>
          )}
        </StyledContainer>
      );
    }
  }
}
