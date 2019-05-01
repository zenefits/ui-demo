import { setViewports } from './storybookUtil';

describe('storybookUtil', () => {
  describe('setViewports', () => {
    it('maps correctly', () => {
      const config = setViewports([0]);
      expect(config).toHaveProperty('viewport', 'iphone6');
      expect(config).toHaveProperty('chromatic.viewports', [511]);
    });

    it('handles multiple viewports', () => {
      const config = setViewports([1, 3]);
      expect(config).toHaveProperty('viewport', 'ipad');
      expect(config).toHaveProperty('chromatic.viewports', [767, 1279]);
    });

    it('throws if no viewport', () => {
      function test() {
        setViewports([]);
      }
      expect(test).toThrowError(/invalid viewports specified/i);
    });
  });
});
