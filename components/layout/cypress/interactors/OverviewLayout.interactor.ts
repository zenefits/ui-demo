import { byTestId, Page } from 'z-frontend-cypress/page';

class OverviewLayoutInteractor extends Page {
  getHero = byTestId('overview-hero');
  getHeroTitle = () => this.getHero().get('h2');
  getMain = byTestId('overview-main');
  getSide = byTestId('overview-side');
}

export default OverviewLayoutInteractor;
