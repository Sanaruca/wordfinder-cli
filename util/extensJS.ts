// declare global {
interface ArrayConstructor {
  range(from: number, to: number): number[];
}

interface Array<T> {
  /**
   * Change the possition of an elements to another possition.
   * @param index The possition of element to be removed.
   * @returns The element removed
   */
  remove(this: T[], index: number): T;
  /**
   * Change the possition of an elements to another possition.
   * @param itemIndex The possition of element to be moved.
   * @param toIndex The possition where the element will be moved.
   */
  changeItemPosition(this: T[], itemIndex: number, toIndex: number): void;
  /**
   * Insert elements to an array.
   * @param item The element to be append.
   * @param into The possition for the element be added.
   */
  insert(this: T[], item: T, into: number): void;
}
// }

Array.range = (from, to) => {
  return new Array(to + 1).fill(from).map((n, i) => n + i);
};

Array.prototype.remove = function (index) {
  // console.log('Array|>remove():', { index });
  if (index < 0 || index > this.length - 1) return; //new Error('range out: index ' + index);
  return this.splice(index, 1)[0];
};

Array.prototype.insert = function (item, index) {
  if (index < 0) {
    this.unshift(item);
    return;
  }
  if (index > this.length) {
    this.push(item);
    return;
  }
  const del = this.splice(index);
  this.push(item, ...del);
};

Array.prototype.changeItemPosition = function (from, to) {
  if (from < 0 || to > this.length - 1) throw new Error('range out');
  const removed = this.remove(from);
  this.insert(removed, to);
};

class Iterable<T = any> {
  #pointer = 0;
  #iterable: string | T[];

  static from<T>(iterable: T[] | string): Iterable<T> {
    return new Iterable<T>(iterable);
  }

  constructor(iterable: string | T[]) {
    this.#iterable = iterable;
  }

  current() {
    return this.#iterable[this.#pointer];
  }

  next(): any {
    if (this.#pointer >= this.#iterable.length - 1) this.#pointer = -1;
    return this.#iterable[++this.#pointer];
  }

  prev() {
    if (this.#pointer < 1) this.#pointer = this.#iterable.length;
    return this.#iterable[--this.#pointer];
  }
}
