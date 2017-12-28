'use babel'

import * as repl from 'repl'
import { dirname } from 'path'
import { readdirSync } from 'fs'
import { NodeReplReadStream } from './node-repl-read-stream'
import { NodeReplWriteStream } from './node-repl-write-stream'
import { TextEditor } from 'atom'

const WELCOME_MESSAGE = 'Welcome to Node.js ' + process.version

export class NodeReplView {
  private replServer?: repl.REPLServer
  private element: HTMLElement
  private outputElement: HTMLElement
  private outStream: NodeReplWriteStream
  constructor() {
    // Create root element
    const mainElement = getMainElement()
    this.outputElement = getOutputElement()
    this.outputElement.appendChild(getWelcomeElement(WELCOME_MESSAGE))
    mainElement.appendChild(this.outputElement)
    this.outStream = new NodeReplWriteStream(this.outputElement)

    this.element = mainElement
  }

  public destroy() {
    this.replServer = undefined
    this.element.remove()
  }

  public getTitle() {
    return 'Node REPL'
  }

  public getDefaultLocation() {
    return 'right'
  }

  public run(textEditor: TextEditor) {
    if (!textEditor) return
    const readStream = new NodeReplReadStream(textEditor.getText())
    const filePath = textEditor.getPath()
    const dirPath = filePath ? dirname(filePath) : undefined
    const nodeModulesPath = dirPath ? `${dirPath}/node_modules` : undefined

    this.clear()
    this.appendRunMessage('> Executing ' + readStream.getLines() + ' lines...')
    this.replServer = repl.start({
      input: readStream,
      output: this.outStream,
      ignoreUndefined: true,
      prompt: '',
      terminal: false,
    })

    if (dirPath) {
      try {
        readdirSync(dirPath)
        this.replServer.context.module.filename = filePath
        this.replServer.context.module.paths.unshift(nodeModulesPath)
      } catch (err) {
        console.warn(`node-repl is unable to to read the file's (${filePath}) directory tree`)
        console.error('node-repl error:', err)
      }

    }
  }

  private appendRunMessage(message: string) {
    const row = document.createElement('p')
    row.classList.add('run-header')
    row.textContent = message
    this.outputElement.appendChild(row)
  }

  private clear() {
    this.outputElement.innerHTML = ''
    this.outputElement.appendChild(getWelcomeElement(WELCOME_MESSAGE))
  }
}

function getMainElement() {
  const mainElement = document.createElement('main')
  mainElement.classList.add('node-repl', 'native-key-bindings')
  mainElement.setAttribute('tabindex', '-1')
  return mainElement
}

function getOutputElement() {
  const outputElement = document.createElement('section')
  outputElement.classList.add('node-repl__output')
  return outputElement
}

function getWelcomeElement(message: string) {
  const welcomeElement = document.createElement('p')
  welcomeElement.innerHTML = message
  welcomeElement.classList.add('node-repl-welcome-message')
  return welcomeElement
}
