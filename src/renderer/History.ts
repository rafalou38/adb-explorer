import { Writable, writable } from "svelte/store";

export class History<T> {
  private past: T[] = [];
  private current: T;
  private future: T[] = [];
  private store: Writable<T>;
  constructor(current: T, on_change?: (value: T) => any) {
    this.current = current;
    this.store = writable(current);
  }

  private on_change() {
    console.log("store set");

    this.store.set(this.value);
  }

  change(e: T) {
    if (this.current !== e) {
      this.future = [];
      this.past.push(this.current);
      this.current = e;
      this.on_change();
    }
  }

  subscribe(run: (value: T) => void, invalidate: (value?: T) => void) {
    return this.store.subscribe(run, invalidate);
  }
  get value() {
    return this.current;
  }
  undo() {
    if (this.past.length > 0) {
      this.future.push(this.current);
      this.current = this.past.pop();
      this.on_change();
    }
  }
  redo() {
    if (this.future.length > 0) {
      this.past.push(this.current);
      this.current = this.future.pop();
      this.on_change();
    }
  }
}
