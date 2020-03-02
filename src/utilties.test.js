import * as utilities from './utilities';
import * as constants from './constants';

describe('utilities', () => {
  describe('calendarDayToString', () => {
    it('returns the correct string for monday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.MONDAY)
      ).toEqual('Monday');
    });

    it('returns the correct string for tuesday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.TUESDAY)
      ).toEqual('Tuesday');
    });

    it('returns the correct string for wednesday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.WEDNESDAY)
      ).toEqual('Wednesday');
    });

    it('returns the correct string for thursday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.THURSDAY)
      ).toEqual('Thursday');
    });

    it('returns the correct string for friday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.FRIDAY)
      ).toEqual('Friday');
    });

    it('returns the correct string for saturday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.SATURDAY)
      ).toEqual('Saturday');
    });

    it('returns the correct string for sunday', () => {
      expect(
        utilities.calendarDayToString(constants.CALENDAR_DAY.SUNDAY)
      ).toEqual('Sunday');
    });

    it('returns unknown for unrecognized inputs', () => {
      expect(utilities.calendarDayToString()).toEqual('Unknown');
      expect(utilities.calendarDayToString(null)).toEqual('Unknown');
      expect(utilities.calendarDayToString('?')).toEqual('Unknown');
      expect(utilities.calendarDayToString('')).toEqual('Unknown');
      expect(utilities.calendarDayToString({})).toEqual('Unknown');
    });
  });

  describe('classnames', () => {
    it('should combine string class names', () => {
      const names = ['one', 'two', 'three', 'four'];

      const result = utilities.classnames(...names);

      expect(result).toEqual('one two three four');
    });

    it('should combine string and undefined class names', () => {
      const names = ['', 'one', '', null, 'two', undefined, 'four', false];

      const result = utilities.classnames(...names);

      expect(result).toEqual('one two four');
    });

    it('should generate class names from an object', () => {
      const input = {
        one: true,
        two: false,
        three: null,
        four: 'test-four',
        five: () => {},
        six: ['a'],
      };

      const result = utilities.classnames(input);

      expect(result).toEqual('one four five six');
    });

    it('should recursively generate class names from arrays', () => {
      const names1 = ['one', ['two'], 'three'];
      const names2 = [];
      const names3 = [[['four']]];

      const result = utilities.classnames(names1, names2, names3);

      expect(result).toEqual('one two three four');
    });

    it('should generate class names from an object and strings', () => {
      const input = {
        one: true,
        two: false,
        three: null,
        four: 'test-four',
        five: () => {},
        six: ['a'],
      };

      const result = utilities.classnames('test0', input, '', 'test1', 'test2');

      expect(result).toEqual('test0 one four five six test1 test2');
    });

    it('should generate class names recursively from an object and strings', () => {
      const input = {
        one: true,
        two: false,
        three: null,
        four: 'test-four',
        five: () => {},
        six: ['a'],
      };

      const result = utilities.classnames(
        ['test0'],
        [[input]],
        'test1',
        [[], [''], [false]],
        'test2'
      );

      expect(result).toEqual('test0 one four five six test1 test2');
    });
  });

  describe('mergeShallow', () => {
    it('should return the original base object when no sources passed', () => {
      const mockBase = { x: 'y', foo: 'bar' };

      const result = utilities.mergeShallow(mockBase);

      expect(result).toBe(mockBase);
    });

    it('should return the original base object when undefined sources passed', () => {
      const mockBase = { x: 'y', foo: 'bar' };

      const result = utilities.mergeShallow(mockBase, undefined, undefined);

      expect(result).toBe(mockBase);
    });

    it('should return the original base object when empty sources passed', () => {
      const mockBase = { x: 'y', foo: 'bar' };

      const result = utilities.mergeShallow(mockBase, {}, {});

      expect(result).toBe(mockBase);
    });

    it('should merge properties from left to right', () => {
      const mockBase = { first: 'first' };
      const mockSource1 = { first: 'second', second: 'second' };
      const mockSource2 = { first: 'third', second: 'third', third: 'third' };
      const mockSource3 = { first: 'fourth' };

      const result = utilities.mergeShallow(
        mockBase,
        mockSource1,
        mockSource2,
        mockSource3
      );

      expect(result).toBe(mockBase);
      expect(result).toEqual({
        first: 'first',
        second: 'second',
        third: 'third',
      });
    });

    it('should skip undefined sources when merging', () => {
      const mockBase = { first: 'first' };
      const mockSource1 = undefined;
      const mockSource2 = { first: 'second', second: 'second' };

      const result = utilities.mergeShallow(mockBase, mockSource1, mockSource2);

      expect(result).toBe(mockBase);
      expect(result).toEqual({ first: 'first', second: 'second' });
    });
  });

  describe('range', () => {
    it('should generate an empty range when nothing specified', () => {
      expect(utilities.range()).toEqual([]);
    });

    it('should generate a range when only supplying the end', () => {
      expect(utilities.range(0)).toEqual([]);
      expect(utilities.range(1)).toEqual([0]);
      expect(utilities.range(2)).toEqual([0, 1]);
      expect(utilities.range(3)).toEqual([0, 1, 2]);
    });

    it('should generate a range when supplying the end and start', () => {
      expect(utilities.range(2, 0)).toEqual([0, 1]);
      expect(utilities.range(0, -1)).toEqual([-1]);
      expect(utilities.range(3, -3)).toEqual([-3, -2, -1, 0, 1, 2]);
    });

    it('should generate a range when supplying the end, start, and step', () => {
      expect(utilities.range(3, 0, 1)).toEqual([0, 1, 2]);
      expect(utilities.range(2, 0, 0.5)).toEqual([0, 0.5, 1, 1.5]);
      expect(utilities.range(2, -9, 2)).toEqual([-9, -7, -5, -3, -1, 1]);
      expect(utilities.range(-9, 2, -2)).toEqual([2, 0, -2, -4, -6, -8]);
    });

    it('should throw an error if a positive step value is supplied for a descending range', () => {
      expect(() => utilities.range(0, 10, 1)).toThrow();
      expect(() => utilities.range(0, 1, 1)).toThrow();
      expect(() => utilities.range(5, 10, 7)).toThrow();
    });

    it('should throw an error if a negative step value is supplied for an ascending range', () => {
      expect(() => utilities.range(10, 0, -1)).toThrow();
      expect(() => utilities.range(-5, -10, -2)).toThrow();
      expect(() => utilities.range(1, 0, -0.1)).toThrow();
    });
  });
});
