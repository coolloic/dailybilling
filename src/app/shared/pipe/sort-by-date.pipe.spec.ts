import { SortByDatePipe } from './sort-by-date.pipe';

describe('SortByDatePipe', () => {
  it('create an instance', () => {
    const pipe = new SortByDatePipe();
    expect(pipe).toBeTruthy();
  });
  it('should return asc by default when pass in date array', () => {
    const pipe = new SortByDatePipe();
    const date = [
      {date: '2019-10-10'},
      {date: '2019-09-09'},
      {date: '2019-11-11'}
    ]
    const actual = pipe.transform(date);
    expect(actual[0].date).toEqual('2019-09-09');
    expect(actual[1].date).toEqual('2019-10-10');
    expect(actual[2].date).toEqual('2019-11-11');
  });
  it('should return desc when pass in date array and true', () => {
    const pipe = new SortByDatePipe();
    const date = [
      {date: '2019-10-10'},
      {date: '2019-09-09'},
      {date: '2019-11-11'}
    ]
    const actual = pipe.transform(date, true);
    expect(actual[2].date).toEqual('2019-09-09');
    expect(actual[1].date).toEqual('2019-10-10');
    expect(actual[0].date).toEqual('2019-11-11');
  });
  it('should throw exception when pass a invalid data', () => {
    const pipe = new SortByDatePipe();
    expect(() => pipe.transform('string')).toThrow(new Error('Data is unsortable'));
  });
});
