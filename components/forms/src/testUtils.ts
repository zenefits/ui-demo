import { ReactWrapper } from 'enzyme';

export function clickADay(wrapper: ReactWrapper) {
  wrapper
    .find('.DayPicker-Day')
    .at(7) // Make sure not clicking on an empty cell
    .simulate('click');
}

export function clickButton(wrapper: ReactWrapper) {
  wrapper.find('button').simulate('click');
}
