import { Readable, ReadableOptions } from 'stream'

export class NodeReplReadStream extends Readable {
  private content: string[]

  constructor(content: string, options: ReadableOptions = {}) {
    super(options)
    this.content = content.split('\n')
  }

  public getLines() {
    return this.content.length
  }

  public _read() {
    if (this.content.length > 0) {
      this.push(this.content.shift() + '\n')
    } else {
      this.push(undefined)
    }
  }
}
