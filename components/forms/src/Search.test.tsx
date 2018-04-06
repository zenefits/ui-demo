import React from 'react';
import { mountWithTheme } from 'z-frontend-theme/test-utils/theme';
import Search, { Option, SearchOption, SearchOptions, BasicSearch } from './Search';
import Button from './Button';

const combobox = 'input[role="combobox"]';
const optionList = [{ value: 'Option 1' }, { value: 'Option 2' }, { value: 'Option 3' }];

jest.useFakeTimers();

const getOptions = query => optionList.filter(option => option.value.toLowerCase().includes(query.toLowerCase()));
const getOptionsAsync = query => {
  return new Promise<Option[]>(resolve => {
    setTimeout(() => resolve(getOptions(query)), 200);
  });
};

// jest's fake timer won't resolve promises triggered by faked timeout events synchronously
// we'll create another promise to schedule our assertions after our changes
const runAfterMockedAwait = (fn, wrapper) => {
  (async () => {
    const p = new Promise(resolve => setTimeout(resolve, 0));
    await p;
    wrapper.update();
    fn();
  })();

  jest.runOnlyPendingTimers();
};

const splitResolver = (resolver, numSplits) => {
  const resolvers = [];
  const promises: Promise<{}>[] = [];

  for (let i = 0; i < numSplits; i += 1) {
    promises.push(new Promise(resolve => resolvers.push(resolve)));
  }
  Promise.all(promises).then(() => resolver());

  return resolvers;
};

const mockChangeEvent = value => {
  return { target: { value } };
};

describe('Search', () => {
  it('should mount without throwing an error', () => {
    expect(mountWithTheme(<Search getOptions={getOptions} />).find(Search)).toHaveLength(1);
  });

  it('should render input when the button is clicked', () => {
    const wrapper = mountWithTheme(<Search getOptions={getOptions} />);
    expect(wrapper.find(Button).length).toBe(1);
    expect(wrapper.find(combobox).length).toBe(0);

    wrapper.find(Button).simulate('click');
    expect(wrapper.find(Button).length).toBe(0);
    expect(wrapper.find(combobox).length).toBe(1);
  });

  describe('Async', () => {
    it('responds to input change events', done => {
      expect.assertions(3);

      const [doneA, doneB] = splitResolver(done, 2);
      const wrapper = mountWithTheme(<Search getOptions={getOptionsAsync} />);
      wrapper.find(Button).simulate('click');

      wrapper.find(combobox).simulate('change', mockChangeEvent('Op'));
      expect(wrapper.find(SearchOptions).text()).toBe('Searching...');
      jest.runAllTimers();
      runAfterMockedAwait(() => {
        const actualOptions = optionList.map(option => option.value);
        const foundOptions = wrapper.find(SearchOption).map(option => option.text());
        expect(foundOptions).toEqual(actualOptions);
        doneA();
      }, wrapper);

      wrapper.find(combobox).simulate('change', mockChangeEvent('Opz'));
      jest.runAllTimers();
      runAfterMockedAwait(() => {
        expect(wrapper.find(SearchOptions).text()).toBe('No results found.');
        doneB();
      }, wrapper);
    });
  });
});

describe('BasicSearch', () => {
  it('finds exact match', done => {
    const wrapper = mountWithTheme(<BasicSearch options={optionList} />);
    wrapper.find(Button).simulate('click');
    const searchValue = 'Option 1';
    wrapper.find(combobox).simulate('change', mockChangeEvent(searchValue));
    runAfterMockedAwait(() => {
      const foundOptions = wrapper.find(SearchOption).map(option => option.text());
      expect(foundOptions).toHaveLength(1);
      expect(foundOptions).toContain(searchValue);
      done();
    }, wrapper);
  });

  it('finds partial match', done => {
    const wrapper = mountWithTheme(<BasicSearch options={optionList} />);
    wrapper.find(Button).simulate('click');
    wrapper.find(combobox).simulate('change', mockChangeEvent('Option'));
    runAfterMockedAwait(() => {
      const foundOptions = wrapper.find(SearchOption).map(option => option.text());
      expect(foundOptions).toHaveLength(3);
      done();
    }, wrapper);
  });

  it('finds case insensitive match', done => {
    const wrapper = mountWithTheme(<BasicSearch options={optionList} />);
    wrapper.find(Button).simulate('click');
    wrapper.find(combobox).simulate('change', mockChangeEvent('option'));
    jest.runAllTimers();
    runAfterMockedAwait(() => {
      const foundOptions = wrapper.find(SearchOption).map(option => option.text());
      expect(foundOptions).toHaveLength(3);
      done();
    }, wrapper);
  });
});
