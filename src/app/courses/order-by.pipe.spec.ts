import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  it('transforms to ACS sorted by name (string type field) array', () => {
    expect(pipe.transform([{ name: 'b' }, { name: 'a' }], 'name')).toEqual([{ name: 'a' }, { name: 'b' }]);
  });

  it('transforms to ACS sorted by count (number type field) array', () => {
    expect(pipe.transform([{ count: 2 }, { count: 1 }], 'count')).toEqual([{ count: 1 }, { count: 2 }]);
  });
});
