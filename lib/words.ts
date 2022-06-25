import { factorizate } from '../util/func';

export async function generateCombinations(
  input: string,
  skipRepeatedValues = true
) {
  if (input.length > 9) throw new Error('input: "' + input + `" It's too long`);
  let z = factorizate(input.length) / input.length;
  const teal: string[] = [],
    map = { ...[...input] };
  input = Object.keys(map).join('');
  let wordsResult = generateTeal(input, z);

  for (let i = 1; i < input.length; i++) {
    // console.table(aux);
    z /= input.length - i;
    wordsResult = wordsResult.map((word) => {
      // console.log({ word });
      if (!teal.length) {
        const regex = new RegExp(`[${word}]`, 'ig');
        // console.log({ regex });
        const k = input.replace(regex, '');
        teal.push(...generateTeal(k, z));
        // console.log('new teal', { teal });
      }
      return word + teal.shift();
    });
  }

  const res = wordsResult.map((word) =>
    [...word].map((n) => map[n as any]).join('')
  );

  return skipRepeatedValues ? [...new Set(res)] : res;
}

function generateTeal(str: string, times: number = 1): string[] {
  // console.log('generateTeal():', { str, times });
  const arr: string[] = [];
  [...str].forEach((l) => {
    arr.push(...Array(times).fill(l));
  });
  return arr;
}
