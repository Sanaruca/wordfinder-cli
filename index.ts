#! /usr/bin/env node

import './util/extensJS';
import { raeExist } from './lib/rae';
import { generateCombinations } from './lib/words';

console.time('time exec');
console.log();

const userArgs = process.argv.slice(2),
  runOffline = userArgs.includes('--offline'),
  arg1Regex = /^[a-z]{3,10}$/i,
  arg2Regex = /^([a-z_]{3,10}|([3-9]|10))$/i;
let [letters, avance] = userArgs;

if (!letters || !avance) {
  console.log('se requeren dos argumentos\n');
  process.exit();
}

if (!arg1Regex.test(letters) || !arg2Regex.test(avance)) {
  console.log('Parece que los argumentos no son los correctos\n');
  console.log(' Posibles razones:');
  console.log(
    '   - puede que la cantidad de caracteres de un argumento sea menor a tres (3)\n'
  );
  process.exit();
}

letters = letters.toUpperCase();
avance = avance.toUpperCase();
avance = isNaN(+avance) ? avance : '_'.repeat(+avance);

// TODO: check inputs

console.log({ letters, avance });

main().then(() => {
  console.timeEnd('time exec');
});

async function main() {
  try {
    let combinations = (await generateCombinations(letters)).map((com) =>
      com.substring(0, avance.length)
    );
    let toSearch: Promise<boolean>[] = [];
    let regex = new RegExp(`^${avance.replace(/_/g, '[A-Z]')}$`);
    let regex2 = /(aa|ee|ii|oo|uu|dd|ff|gg|hh|jj|kk|pp|qq|tt|vv|ww|xx|yy|zz)/i;

    combinations = [...new Set(combinations)].filter((com) => {
      const test = regex.test(com);
      const test2 = !regex2.test(com);
      // console.log({ test, test2, com });
      if (test && test2) {
        // toSearch.push(raeExist(com));
        return true;
      }

      return false;
    });

    // console.log('\n\n');

    if (!combinations.length) {
      console.error('\x1b[31m' + 'parece que algo esta mal' + '\x1b[0m');
      process.exit();
    }
    // console.log({ combinations });

    const searchBolRes: boolean[] = [];
    const auxCom = combinations.slice();

    if (!runOffline) {
      while (auxCom.length) {
        // 20 at a time
        // console.log('while (auxCom.length) :', auxCom.length);
        const bolRes = await Promise.all(
          auxCom.splice(0, 5).map((com) => raeExist(com))
        );
        searchBolRes.push(...bolRes);
      }
    }

    const words = combinations.filter((_, i) =>
      runOffline ? true : searchBolRes[i]
    );

    console.table(words.map((w) => ({ 'Resultados:': w })));
  } catch (error) {
    console.error('\x1b[31m' + error + '\x1b[0m');
    process.exit();
    // throw new Error(error as any);
  }
}
