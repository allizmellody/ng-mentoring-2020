import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transforms 65 to "1h 5min"', () => {
    expect(pipe.transform(65)).toBe('1h 5min');
  });

  it('transforms 10 to "10min"', () => {
    expect(pipe.transform(10)).toBe('10min');
  });

  it('transforms 120 to "2h"', () => {
    expect(pipe.transform(120)).toBe('2h ');
  });

  it('transforms null to empty string', () => {
    expect(pipe.transform(null)).toBe('');
  });

  it('transforms NaN to empty string', () => {
    expect(pipe.transform(NaN)).toBe('');
  });
});
