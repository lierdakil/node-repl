import { NodeReplView } from './node-repl-view'
import { CompositeDisposable } from 'atom'

let subs: CompositeDisposable
let replView: NodeReplView | undefined

export function activate() {
  // get repl view
  replView = new NodeReplView()
  // tslint:disable-next-line:no-floating-promises
  atom.workspace.open(replView)

  subs = new CompositeDisposable()

  subs.add(atom.workspace.observeTextEditors((ed) => {
    subs.add(ed.onDidStopChanging(() => {
      if (replView && ed.getGrammar().scopeName.match(/source\.js/)) {
        replView.run(ed)
      }
    }))
  }))

}

export function deactivate() {
  replView && replView.destroy()
  subs.dispose()
}
