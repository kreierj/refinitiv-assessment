import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('page navigation', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show withdraw page', () => {
    page.navigateTo("withdraw");
    expect(page.getTitleText()).toEqual('Withdraw');
  });

    it('should show restock page', () => {
        page.navigateTo("restock");
        expect(page.getTitleText()).toEqual('Restock');
    });

    it('should show overview page', () => {
        page.navigateTo("overview");
        expect(page.getTitleText()).toEqual('Overview');
    });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
