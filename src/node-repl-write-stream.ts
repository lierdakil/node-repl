import { Writable } from 'stream'

const ELLIPSIS = /^\.{3,}$/

export class NodeReplWriteStream extends Writable {
  constructor(private element: HTMLElement) {
    super({ decodeStrings: false })
  }

  public _write(data: any, _enc: string, next: (err?: Error) => void) {
    const _data = data.toString().trim()

    if (_data.length && !ELLIPSIS.test(_data)) {
      const row = document.createElement('p')
      row.textContent = _data
      this.element.appendChild(row)
    }
    next()
  }
}
