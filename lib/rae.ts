import { RAE } from 'rae-api';

const rae = new RAE();

export async function raeExist(word: string) {
  // console.log('\x1b[94m%s\x1b[0m', 'raeExist( ' + word + ' )');
  word = word.toLowerCase();
  try {
    const search = await rae.searchWord(word);
    if (!search.isOk()) throw new Error('la busqueda no se completo');
    for (const res of search.getRes()) {
      const gen = generateVariant(res.getHeader());
      // console.log('raeExist() |> for()', ...gen);
      if (gen.includes(word)) return true;
    }
    return false;
  } catch (error) {
    throw new Error(error as any);
  }
}

function generateVariant(raeHeaderResult: string) {
  const split = raeHeaderResult.split(',').map((s) => s.trim());
  if (split.length > 1) {
    split[1] =
      split[0].substring(0, split[0].length - split[1].length) + split[1];
  }

  return split;
}
