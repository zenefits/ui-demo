import React, { Component } from 'react';

import { styled } from 'z-frontend-theme';
import { fetchWrapper, getEventLogger } from 'z-frontend-app-bootstrap';
import { color, zIndex } from 'z-frontend-theme/utils';
import { Image } from 'zbase';
import { Button } from 'z-frontend-elements';

const bellIcon = require('./images/bell.svg');
const bellIconUnread = require('./images/bell-unread.svg');

const IconMap: { [key: string]: string } = {
  newNotifications: bellIconUnread,
  noNotifications: bellIcon,
  offline: bellIcon,
};

type Switches = { [key: string]: boolean };

interface Props {
  userId: string;
  switches: Switches;
  isAdmin: boolean;
}

// TODO: extract to a beamer-utils.ts
const beamerKey = 'b_Wbd2dww3IPNq9r2hNw7f6GkxcEWup9A8S0mErhn2dzs=';
const beamerHeaders = { 'Beamer-Api-Key': beamerKey };
const beamerApiBaseUrl = 'https://api.getbeamer.com/v0/';
const beamerAppBaseUrl = 'https://app.getbeamer.com';
const beamerId = 'piaHWEqe12038';

async function beamerRequest(path: string, userId: string, tags: string) {
  // NOTE: we intentionally don't send userFirstName and userLastName for security reasons
  // email and id are fine (maybe we'll drop email as well later)
  const headers = new Headers(beamerHeaders);
  const requestInit = {
    headers,
  };

  const response = await fetchWrapper(
    `${beamerApiBaseUrl}${path}?userId=${userId}&filter=${tags}&userFirstName=-&userLastName=-&userEmail=-`,
    requestInit,
  );
  if (!response.ok) {
    return Promise.reject(new Error('Beamer fetch failed'));
  }
  return response.json();
}

function getUserTags(isAdmin: boolean) {
  // semicolon separated tags
  return isAdmin ? 'admin' : '';
}

function isBeamerOff(switches: Switches) {
  // NOTE: we use beamer2_killswitch instead of beamer_killswitch due to backwards compat
  // We want to turn it on, only for the new apps, not apps that are still using the old switch
  // which for send employeeIds
  return !switches || switches['beamer2_killswitch'];
}

const BeamerWrapper = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease-in;
  opacity: 0;
  z-index: ${zIndex('modal')};
  top: 0;
  left: 0;
  display: none;
  overflow: hidden;
  &.beamerVisible {
    opacity: 1;
  }
  .beamerIframeContainer {
    overflow: hidden !important;
    position: initial !important;
    display: block;
    width: 100%;
  }
  .beamerIframe {
    background: ${color('grayscale.white')};
    position: absolute;
    height: 100%;
    border: 0;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    right: -400px;
    width: 400px;
    transition: right 0.2s ease-in;
  }
  &.beamerVisible .beamerIframe {
    right: 0;
  }
  .beamerImageContainer {
    position: absolute;
    height: 100%;
    width: 100%;
  }
  .beamerImage {
    max-width: 90%;
    max-height: 90%;
    border-radius: 3px;
    box-shadow: 0 0 10px 3px;

    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`;

export default class ProductNotificationsIcon extends Component<
  Props,
  { icon: string; showBeamer: boolean; imageUrl: string }
> {
  constructor(props: Props) {
    super(props);
    this.state = {
      icon: IconMap.offline,
      showBeamer: false,
      imageUrl: null,
    };
    const { userId, switches, isAdmin } = props;
    const tags = getUserTags(isAdmin);
    if (isBeamerOff(switches)) return;
    beamerRequest('unread/count', userId, tags)
      .then((response: any) => {
        this.setState({ icon: response.count > 0 ? IconMap.newNotifications : IconMap.noNotifications });
      })
      .catch(error => {
        // it's ok - Beamer is a nice to have
        console.error(error.message);
      });
  }

  componentDidMount() {
    window.addEventListener('message', this.handleIframeMessage, false);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleIframeMessage, false);
  }

  handleIframeMessage = (event: MessageEvent) => {
    const showPictureKey = 'showPicture:';
    const openUrlKey = 'openUrl:';
    if (event.origin.startsWith(beamerAppBaseUrl)) {
      const { data } = event;
      if (data === 'hide') {
        this.hideBeamer();
      } else if (data.startsWith(openUrlKey)) {
        // example: "openUrl:{"url":"https://help.zenefits.com/Time_and_Attendance/FAQs_about_Editing_Settings_in_Time_and_Attendance/Meal_Break_Penalty_Setting_in_Time_%26_Attendance/?utm_source=beamer&utm_medium=sidebar&utm_campaign=Automatic-Meal-Break-Penalties-For-Time-Attendance&utm_content=ctalink","openInNewWindow":true,"postTitle":"Automatic Meal Break Penalties For Time & Attendance"}"
        const json = data.substring(openUrlKey.length);
        const { url } = JSON.parse(json);
        window.open(url);
      } else if (data.startsWith(showPictureKey)) {
        // example: `"showPicture:{"url":"https://app.getbeamer.com/pictures?id=46090-xYtw77-9UG7vv73vv73vv73vv70Ce9e5T3ktXDDhjqbvv73Xlu-_ve-_ve-_vXFYSiA."}"`
        const json = data.substring(showPictureKey.length);
        const { url } = JSON.parse(json);
        this.showImage(url);
      } else if (data !== 'loaded') {
        getEventLogger().log('beamerUnhandledEvent', data);
      }
    }
  };

  hideBeamer = () => {
    this.setState({ showBeamer: false });

    window.setTimeout(() => {
      // delays hiding the overlay until the animation is done
      document.getElementById('beamerOverlay').style.display = 'none';
    }, 200);
  };

  showBeamer = () => {
    document.getElementById('beamerOverlay').style.display = 'block';

    window.setTimeout(() => {
      // delaying this since we need the display change to take effect first so the animation works
      this.setState({ showBeamer: true });
    }, 1);
  };

  showImage = (url: string) => this.setState({ imageUrl: url });

  hideImage = (event: any) => {
    this.setState({ imageUrl: null });
    event.stopPropagation();
  };

  getIframeUrl = (tags: string) =>
    // TODO: consider passing url for analytics purposes
    `${beamerAppBaseUrl}/news?app_id=${beamerId}&email=-&firstname=-&lastname=-&custom_user_id=${this.props.userId}&filter=${tags}`;

  render() {
    if (isBeamerOff(this.props.switches)) return null;
    const { showBeamer, icon, imageUrl } = this.state;
    const beamerClass = showBeamer ? 'beamerVisible' : '';
    const tags = getUserTags(this.props.isAdmin);
    const beamerIframeUrl = showBeamer ? this.getIframeUrl(tags) : '';
    return (
      <>
        <Button
          aria-label="View product notifications"
          mode="transparent"
          mr={4}
          p={1}
          className="js-walkme-navbar-beamer-show"
          onClick={this.showBeamer}
        >
          <Image alt="Product Notification" src={icon} />
        </Button>
        <BeamerWrapper id="beamerOverlay" className={beamerClass} onClick={this.hideBeamer}>
          <div className="beamerIframeContainer">
            <iframe
              allowFullScreen={false}
              // sandbox="allow-scripts"
              // referrerpolicy="no-referrer"
              src={beamerIframeUrl}
              id="beamerIframe"
              className="beamerIframe"
              data-powered-by="Newsfeed and changelog powered by Beamer. https://www.getbeamer.com"
            />
            {imageUrl && (
              <div
                role="dialog"
                aria-hidden
                onClick={this.hideImage}
                onKeyUp={this.hideImage}
                className="beamerImageContainer"
              >
                <img src={imageUrl} alt="Product Notification" className="beamerImage" />
              </div>
            )}
          </div>
        </BeamerWrapper>
      </>
    );
  }
}
