import { reduceRight } from './reduceRight';

describe('reduceRight', () => {
  it('should return the correct result when reducing an array of numbers', () => {
    const numbers = [1, 2, 3, 4, 5];
    const sumReducer = (acc: number, curr: number) => acc + curr;

    const result = reduceRight(0, sumReducer)(numbers);

    expect(result).toBe(15);
  });

  it('should return the correct result when reducing an array of strings', () => {
    const strings = ['Hello', ' ', 'World', '!'];
    const concatReducer = (acc: string, curr: string) => acc + curr;

    const result = reduceRight('', concatReducer)(strings);

    expect(result).toBe('!World Hello');
  });
});
