import * as utilities from './utilities';

describe('utilities', () => {
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
});
