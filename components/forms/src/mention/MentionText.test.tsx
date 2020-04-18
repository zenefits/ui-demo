import React from 'react';

import { splitIntoMentions } from './MentionText';

describe('MentionText', () => {
  describe('splitIntoMentions', () => {
    const mentions = {
      234: {
        label: 'Meghan',
        tooltipText: 'Meghan Markle\nmarklesparkle@zenefits.com',
      },
      11: {
        label: 'Elizabeth',
        tooltipText: 'Elizabeth Queen\nthequeen@zenefits.com',
      },
      4321: {
        label: 'Juniper',
        tooltipText: 'Juniper Stottle\njuniper@zenefits.com',
      },
      a_1: {
        label: 'Billy',
        tooltipText: 'Billy Butcher\nbilly@zenefits.com',
      },
    };

    function checkMentionLabel(obj: any, expectedLabel: string) {
      expect(React.isValidElement(obj)).toBe(true);
      expect(obj.type.name).toBe('Mention');
      expect(obj.props.label).toBe(expectedLabel);
    }

    it('no mentions', () => {
      const text = 'Can you take a look at this?';
      const result = splitIntoMentions(text, mentions);
      expect(result).toEqual([text]);
    });

    it('no text', () => {
      const text = '';
      const result = splitIntoMentions(text, mentions);
      expect(result).toEqual([]);
    });

    it('single mention', () => {
      const text = 'Hey [@234], can you take a look at this?';
      const result = splitIntoMentions(text, mentions);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Hey ');
      checkMentionLabel(result[1], mentions['234'].label);
      expect(result[2]).toBe(', can you take a look at this?');
    });

    it('mention id with alphanumerics and underscore', () => {
      const text = 'Hey [@a_1], can you take a look at this?';
      const result = splitIntoMentions(text, mentions);
      expect(result).toHaveLength(3);
      expect(result[0]).toBe('Hey ');
      checkMentionLabel(result[1], mentions['a_1'].label);
      expect(result[2]).toBe(', can you take a look at this?');
    });

    it('single mention alone', () => {
      const text = '[@234]';
      const result = splitIntoMentions(text, mentions);
      expect(result).toHaveLength(1);
      checkMentionLabel(result[0], mentions['234'].label);
    });

    it('mention without matching entry', () => {
      const text = '[@234]';
      const emptyMentions = {};
      const result = splitIntoMentions(text, emptyMentions);
      expect(result).toEqual([text]);
    });

    it('other uses of prefix are ok (eg emails)', () => {
      const text = '[@234] and [@11], can you email it to [foo@123.com]? [@] Thanks!';
      const result = splitIntoMentions(text, mentions);
      checkMentionLabel(result[0], mentions['234'].label);
      checkMentionLabel(result[2], mentions['11'].label);
      expect(result[3]).toBe(', can you email it to [foo@123.com]? [@] Thanks!');
    });

    it('multiple mentions', () => {
      const text = 'Hey [@234], can you take a look at this? [@4321] and [@11] will review once you are done.';
      const result = splitIntoMentions(text, mentions);
      expect(result).toHaveLength(7);
      checkMentionLabel(result[1], mentions['234'].label);
      checkMentionLabel(result[3], mentions['4321'].label);
      checkMentionLabel(result[5], mentions['11'].label);
    });
  });
});
