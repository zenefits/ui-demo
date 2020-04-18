import { OverviewLayoutInteractor } from 'z-frontend-layout/cypress';
import { visitable, Page } from 'z-frontend-cypress/page';

class OverviewPage extends Page {
  overview = new OverviewLayoutInteractor();
  visit = visitable('#/overview');

  getTitle = () => this.overview.getHeroTitle();
  getCreateButton = () => this.overview.getHero().findByText('Add Object');
  getMain = () => this.overview.getMain();
  getFaqs = () => this.overview.getSide();
}

export default OverviewPage;
