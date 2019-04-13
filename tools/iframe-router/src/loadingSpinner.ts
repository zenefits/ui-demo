require('./spin.css');
import { theme } from 'z-frontend-theme';
import { color, heights } from 'z-frontend-theme/utils';

const SPINNER_ID = 'loading-spinner-container';
const SPINNER_CONTAINER_ID = 'loading-spinner-container';
// const SPINNER_ANIMATION_NAME = 'spin';

interface SpinnerOptions {
  spinnerId?: string;
  spinnerContainerId?: string;
  spinnerStyle?: string;
  spinnerContainerStyle?: string;
  omit?: boolean;
}

export class Spinner {
  private spinnerId: string;
  private spinnerContainerId: string;
  private spinnerStyle: string;
  private spinnerContainerStyle: string;
  private omit: boolean;

  constructor(options: SpinnerOptions = {}) {
    this.spinnerId = options.spinnerId || SPINNER_ID;
    this.spinnerContainerId = options.spinnerContainerId || SPINNER_CONTAINER_ID;
    this.omit = !!options.omit;
    this.spinnerStyle =
      options.spinnerStyle ||
      `
      display: inline-block;
      width: ${heights('xlarge')({ theme })};
      height: ${heights('xlarge')({ theme })};
      border: 2px solid ${color('secondary.a')({ theme })};
      border-top-color: ${color('secondary.a', 0.15)({ theme })};
      border-left-color: ${color('secondary.a', 0.15)({ theme })};
      border-radius: 50%;
      animation: spin 1s infinite linear;
    `;
    this.spinnerContainerStyle =
      options.spinnerContainerStyle ||
      `
      display: none;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    `;

    if (!this.omit) {
      const spinnerContainer = document.createElement('div');
      spinnerContainer.id = this.spinnerContainerId;
      spinnerContainer.setAttribute('style', this.spinnerContainerStyle);
      const spinner = document.createElement('div');
      spinner.id = this.spinnerId;
      spinner.setAttribute('style', this.spinnerStyle);
      spinnerContainer.appendChild(spinner);
      document.body.appendChild(spinnerContainer);
    }
  }

  show(spinnercontainerid: string = SPINNER_CONTAINER_ID) {
    if (!this.omit) {
      const spinnerContainer = document.getElementById(this.spinnerContainerId);
      if (spinnerContainer) {
        spinnerContainer.style.display = 'flex';
      }
    }
  }

  hide(spinnercontainerid: string = SPINNER_CONTAINER_ID) {
    if (!this.omit) {
      const spinnerContainer = document.getElementById(this.spinnerContainerId);
      if (spinnerContainer) {
        spinnerContainer.style.display = 'none';
      }
    }
  }
}
