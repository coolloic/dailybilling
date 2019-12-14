import {DateFormatPipe} from './date-format.pipe';

describe('DateFormatPipe', () => {
  it('create an instance', () => {
    const pipe = new DateFormatPipe();
    expect(pipe).toBeTruthy();
  });
  it('should return 1/1/2010 when pass in 2019-01-01', () => {
    const pipe = new DateFormatPipe();
    const actual = pipe.transform('2019-01-01');
    expect(actual).toEqual('1/1/2019');
  });
  it('should throw exception when pass a invalid date', () => {
    const pipe = new DateFormatPipe();
    expect(() => pipe.transform('string')).toThrow(new Error('Invalid Date'));
  });
});
