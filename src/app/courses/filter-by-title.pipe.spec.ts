import { FilterByTitlePipe } from './filter-by-title.pipe';

describe('FilterByTitlePipe', () => {
  const pipe = new FilterByTitlePipe();

  it('transforms to array titles contains "test"', () => {
    expect(pipe.transform([{ title: 'test123' }, { title: 'wrong' }], 'test')).toEqual([{ title: 'test123' }]);
  });
});
