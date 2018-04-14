import React from 'react';
import { storiesOf } from '@storybook/react';
import { FormattedDate, FormattedNumber, FormattedPlural, FormattedRelative, FormattedTime } from 'react-intl';

import {
  Box,
  DateText,
  DateTimeText,
  DateTimeTextProps,
  Flex,
  Heading,
  NumberText,
  NumberTextProps,
  PluralText,
  RelativeText,
  RelativeTextProps,
  Text,
  TimeText,
} from './index';

const someDate = new Date('2017-11-18 19:55:34');
const initialNow = someDate.valueOf() + 100000;

const stories = storiesOf('ZBase Components', module);

function renderExampleMap(map) {
  return Object.keys(map).map(k => (
    <Flex key={k}>
      <Box w={300}>{k}</Box>
      <Box flex="1">{map[k]}</Box>
    </Flex>
  ));
}

const dateExamples = {
  'DateTime with no formatting': <DateTimeText color="affirmation.a" value={someDate} />,
  DateText: <DateText value={someDate} />,
  'DateTime with date props': <DateTimeText p={1} value={someDate} year="numeric" month="short" day="numeric" />,
  'DateText long': <DateText value={someDate} long />,
};

const timeExamples = {
  Time1: <TimeText value={someDate} />,
  Time2: <TimeText value={someDate.valueOf() - 9999999} />,
};

const dateTimeProps: DateTimeTextProps = {
  value: someDate,
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  era: 'long',
  hour: '2-digit',
  weekday: 'long',
  minute: '2-digit',
  second: '2-digit',
};

const timeProps: RelativeTextProps[] = [
  { value: someDate.valueOf() },
  { value: someDate.valueOf() - 17 * 60 * 1000 }, // someDate - 17 min
  { value: someDate.valueOf() - 33 * 60 * 60 * 1000, units: 'hour' }, // someDate - 33 hours
  { value: someDate.valueOf() - 33 * 60 * 60 * 1000, units: 'minute' },
  { value: someDate.valueOf() - 33 * 60 * 60 * 1000 },
];

const numberProps: NumberTextProps[] = [
  { value: 123 },
  { value: 1392.32834, style: 'decimal' },
  { value: 1392.32834, style: 'currency', currency: 'CAD' },
  { value: 1392.32834, style: 'currency', currency: 'CAD', currencyDisplay: 'name' },
];

stories.add('all', () => (
  <Box p={2} w={[1, 4 / 5, 3 / 4, 2 / 3]}>
    <Heading level="4">Text component with key and with children</Heading>
    <Flex column>
      <Text p={2} textKey="hello" textValues={{ name: 'David' }} />
      <Text color="affirmation.c" p={3}>
        Info: <Text color="affirmation.b" textKey="workingAt" textValues={{ company: 'Zenefitness' }} />
      </Text>
    </Flex>
    <hr />

    <Heading level="4">DateText, Time and DateTime</Heading>
    <Flex column mb={3}>
      {renderExampleMap(dateExamples)}
    </Flex>

    <Flex column mb={3}>
      {renderExampleMap(timeExamples)}
    </Flex>

    <Flex column my={3}>
      original FormattedDate with all DateTimeFormat props
      <FormattedDate {...dateTimeProps} />
      DateTime component with the same props
      <DateTimeText color="affirmation.b" {...dateTimeProps} />
    </Flex>

    <Flex column my={3}>
      Original FormattedTime with all DateTimeFormat props
      <FormattedTime {...dateTimeProps} />
      DateTime component with the same props
      <DateTimeText color="affirmation.b" {...dateTimeProps} />{' '}
    </Flex>

    <hr />

    <Heading level="4">RelativeDate and NumberText</Heading>
    <Flex mb={3}>
      <Flex column mr={2}>
        Original FormattedRelative
        {timeProps.map((props, i) => <FormattedRelative key={i} initialNow={initialNow} {...props} />)}
      </Flex>
      <Flex column>
        RelativeDate component
        {timeProps.map((props, i) => <RelativeText key={i} initialNow={initialNow} {...props} bg="affirmation.c" />)}
      </Flex>
    </Flex>

    <Flex mb={5}>
      <Flex column mr={2}>
        Original FormattedNumber
        {numberProps.map((props, i) => <FormattedNumber key={i} {...props} />)}
      </Flex>
      <Flex column>
        NumberText component numberProps
        {numberProps.map((props, i) => <NumberText key={i} {...props} bg="affirmation.c" />)}
      </Flex>
    </Flex>

    <hr />

    <Heading level={2}>Plural component</Heading>
    <Flex mb={5}>
      <Flex column mr={2}>
        Original FormattedPlural
        <Box>
          10 <FormattedPlural value={10} one="message" other="messages" />
        </Box>
        <Box>
          1 <FormattedPlural value={1} one="message" other="messages" />
        </Box>
      </Flex>
      <Flex column>
        Plural component
        <Box>
          10 <PluralText bg="affirmation.c" value={10} one="message" other="messages" />
        </Box>
        <Box>
          1 <PluralText bg="affirmation.c" value={1} one="message" other="messages" />
        </Box>
      </Flex>
    </Flex>

    <hr />

    <span>Heading component:</span>
    <Heading level="1">header</Heading>
    <Heading level="2">header</Heading>
    <Heading level="3">header</Heading>
    <Heading level="4">header</Heading>
    <Heading level="5">header</Heading>
    <Heading level="6">header</Heading>

    <hr />
    <span>Heading component with textKey and textValues:</span>
    <Heading level="2" textKey="hello" textValues={{ name: 'Miguel' }} />
  </Box>
));
