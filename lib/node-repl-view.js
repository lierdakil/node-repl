"use strict";
'use babel';
Object.defineProperty(exports, "__esModule", { value: true });
const repl = require("repl");
const path_1 = require("path");
const fs_1 = require("fs");
const node_repl_read_stream_1 = require("./node-repl-read-stream");
const node_repl_write_stream_1 = require("./node-repl-write-stream");
const WELCOME_MESSAGE = 'Welcome to Node.js ' + process.version;
class NodeReplView {
    constructor() {
        const mainElement = getMainElement();
        this.outputElement = getOutputElement();
        this.outputElement.appendChild(getWelcomeElement(WELCOME_MESSAGE));
        mainElement.appendChild(this.outputElement);
        this.outStream = new node_repl_write_stream_1.NodeReplWriteStream(this.outputElement);
        this.element = mainElement;
    }
    destroy() {
        this.replServer = undefined;
        this.element.remove();
    }
    getTitle() {
        return 'Node REPL';
    }
    getDefaultLocation() {
        return 'right';
    }
    run(textEditor) {
        if (!textEditor)
            return;
        const readStream = new node_repl_read_stream_1.NodeReplReadStream(textEditor.getText());
        const filePath = textEditor.getPath();
        const dirPath = filePath ? path_1.dirname(filePath) : undefined;
        const nodeModulesPath = dirPath ? `${dirPath}/node_modules` : undefined;
        this.clear();
        this.appendRunMessage('> Executing ' + readStream.getLines() + ' lines...');
        this.replServer = repl.start({
            input: readStream,
            output: this.outStream,
            ignoreUndefined: true,
            prompt: '',
            terminal: false,
        });
        if (dirPath) {
            try {
                fs_1.readdirSync(dirPath);
                this.replServer.context.module.filename = filePath;
                this.replServer.context.module.paths.unshift(nodeModulesPath);
            }
            catch (err) {
                console.warn(`node-repl is unable to to read the file's (${filePath}) directory tree`);
                console.error('node-repl error:', err);
            }
        }
    }
    appendRunMessage(message) {
        const row = document.createElement('p');
        row.classList.add('run-header');
        row.textContent = message;
        this.outputElement.appendChild(row);
    }
    clear() {
        this.outputElement.innerHTML = '';
        this.outputElement.appendChild(getWelcomeElement(WELCOME_MESSAGE));
    }
}
exports.NodeReplView = NodeReplView;
function getMainElement() {
    const mainElement = document.createElement('main');
    mainElement.classList.add('node-repl', 'native-key-bindings');
    mainElement.setAttribute('tabindex', '-1');
    return mainElement;
}
function getOutputElement() {
    const outputElement = document.createElement('section');
    outputElement.classList.add('node-repl__output');
    return outputElement;
}
function getWelcomeElement(message) {
    const welcomeElement = document.createElement('p');
    welcomeElement.innerHTML = message;
    welcomeElement.classList.add('node-repl-welcome-message');
    return welcomeElement;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1yZXBsLXZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvbm9kZS1yZXBsLXZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFdBQVcsQ0FBQTs7QUFFWCw2QkFBNEI7QUFDNUIsK0JBQThCO0FBQzlCLDJCQUFnQztBQUNoQyxtRUFBNEQ7QUFDNUQscUVBQThEO0FBRzlELE1BQU0sZUFBZSxHQUFHLHFCQUFxQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUE7QUFFL0Q7SUFLRTtRQUVFLE1BQU0sV0FBVyxHQUFHLGNBQWMsRUFBRSxDQUFBO1FBQ3BDLElBQUksQ0FBQyxhQUFhLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQTtRQUN2QyxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFBO1FBQ2xFLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1FBQzNDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSw0Q0FBbUIsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFFNUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUE7SUFDNUIsQ0FBQztJQUVNLE9BQU87UUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQTtRQUMzQixJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFBO0lBQ3ZCLENBQUM7SUFFTSxRQUFRO1FBQ2IsTUFBTSxDQUFDLFdBQVcsQ0FBQTtJQUNwQixDQUFDO0lBRU0sa0JBQWtCO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUE7SUFDaEIsQ0FBQztJQUVNLEdBQUcsQ0FBQyxVQUFzQjtRQUMvQixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQztZQUFDLE1BQU0sQ0FBQTtRQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFJLDBDQUFrQixDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FB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LENBQUMsR0FBRyxDQUFDLDJCQUEyQixDQUFDLENBQUE7SUFDekQsTUFBTSxDQUFDLGNBQWMsQ0FBQTtBQUN2QixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCdcblxuaW1wb3J0ICogYXMgcmVwbCBmcm9tICdyZXBsJ1xuaW1wb3J0IHsgZGlybmFtZSB9IGZyb20gJ3BhdGgnXG5pbXBvcnQgeyByZWFkZGlyU3luYyB9IGZyb20gJ2ZzJ1xuaW1wb3J0IHsgTm9kZVJlcGxSZWFkU3RyZWFtIH0gZnJvbSAnLi9ub2RlLXJlcGwtcmVhZC1zdHJlYW0nXG5pbXBvcnQgeyBOb2RlUmVwbFdyaXRlU3RyZWFtIH0gZnJvbSAnLi9ub2RlLXJlcGwtd3JpdGUtc3RyZWFtJ1xuaW1wb3J0IHsgVGV4dEVkaXRvciB9IGZyb20gJ2F0b20nXG5cbmNvbnN0IFdFTENPTUVfTUVTU0FHRSA9ICdXZWxjb21lIHRvIE5vZGUuanMgJyArIHByb2Nlc3MudmVyc2lvblxuXG5leHBvcnQgY2xhc3MgTm9kZVJlcGxWaWV3IHtcbiAgcHJpdmF0ZSByZXBsU2VydmVyPzogcmVwbC5SRVBMU2VydmVyXG4gIHByaXZhdGUgZWxlbWVudDogSFRNTEVsZW1lbnRcbiAgcHJpdmF0ZSBvdXRwdXRFbGVtZW50OiBIVE1MRWxlbWVudFxuICBwcml2YXRlIG91dFN0cmVhbTogTm9kZVJlcGxXcml0ZVN0cmVhbVxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBDcmVhdGUgcm9vdCBlbGVtZW50XG4gICAgY29uc3QgbWFpbkVsZW1lbnQgPSBnZXRNYWluRWxlbWVudCgpXG4gICAgdGhpcy5vdXRwdXRFbGVtZW50ID0gZ2V0T3V0cHV0RWxlbWVudCgpXG4gICAgdGhpcy5vdXRwdXRFbGVtZW50LmFwcGVuZENoaWxkKGdldFdlbGNvbWVFbGVtZW50KFdFTENPTUVfTUVTU0FHRSkpXG4gICAgbWFpbkVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5vdXRwdXRFbGVtZW50KVxuICAgIHRoaXMub3V0U3RyZWFtID0gbmV3IE5vZGVSZXBsV3JpdGVTdHJlYW0odGhpcy5vdXRwdXRFbGVtZW50KVxuXG4gICAgdGhpcy5lbGVtZW50ID0gbWFpbkVsZW1lbnRcbiAgfVxuXG4gIHB1YmxpYyBkZXN0cm95KCkge1xuICAgIHRoaXMucmVwbFNlcnZlciA9IHVuZGVmaW5lZFxuICAgIHRoaXMuZWxlbWVudC5yZW1vdmUoKVxuICB9XG5cbiAgcHVibGljIGdldFRpdGxlKCkge1xuICAgIHJldHVybiAnTm9kZSBSRVBMJ1xuICB9XG5cbiAgcHVibGljIGdldERlZmF1bHRMb2NhdGlvbigpIHtcbiAgICByZXR1cm4gJ3JpZ2h0J1xuICB9XG5cbiAgcHVibGljIHJ1bih0ZXh0RWRpdG9yOiBUZXh0RWRpdG9yKSB7XG4gICAgaWYgKCF0ZXh0RWRpdG9yKSByZXR1cm5cbiAgICBjb25zdCByZWFkU3RyZWFtID0gbmV3IE5vZGVSZXBsUmVhZFN0cmVhbSh0ZXh0RWRpdG9yLmdldFRleHQoKSlcbiAgICBjb25zdCBmaWxlUGF0aCA9IHRleHRFZGl0b3IuZ2V0UGF0aCgpXG4gICAgY29uc3QgZGlyUGF0aCA9IGZpbGVQYXRoID8gZGlybmFtZShmaWxlUGF0aCkgOiB1bmRlZmluZWRcbiAgICBjb25zdCBub2RlTW9kdWxlc1BhdGggPSBkaXJQYXRoID8gYCR7ZGlyUGF0aH0vbm9kZV9tb2R1bGVzYCA6IHVuZGVmaW5lZFxuXG4gICAgdGhpcy5jbGVhcigpXG4gICAgdGhpcy5hcHBlbmRSdW5NZXNzYWdlKCc+IEV4ZWN1dGluZyAnICsgcmVhZFN0cmVhbS5nZXRMaW5lcygpICsgJyBsaW5lcy4uLicpXG4gICAgdGhpcy5yZXBsU2VydmVyID0gcmVwbC5zdGFydCh7XG4gICAgICBpbnB1dDogcmVhZFN0cmVhbSxcbiAgICAgIG91dHB1dDogdGhpcy5vdXRTdHJlYW0sXG4gICAgICBpZ25vcmVVbmRlZmluZWQ6IHRydWUsXG4gICAgICBwcm9tcHQ6ICcnLFxuICAgICAgdGVybWluYWw6IGZhbHNlLFxuICAgIH0pXG5cbiAgICBpZiAoZGlyUGF0aCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVhZGRpclN5bmMoZGlyUGF0aClcbiAgICAgICAgdGhpcy5yZXBsU2VydmVyLmNvbnRleHQubW9kdWxlLmZpbGVuYW1lID0gZmlsZVBhdGhcbiAgICAgICAgdGhpcy5yZXBsU2VydmVyLmNvbnRleHQubW9kdWxlLnBhdGhzLnVuc2hpZnQobm9kZU1vZHVsZXNQYXRoKVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybihgbm9kZS1yZXBsIGlzIHVuYWJsZSB0byB0byByZWFkIHRoZSBmaWxlJ3MgKCR7ZmlsZVBhdGh9KSBkaXJlY3RvcnkgdHJlZWApXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ25vZGUtcmVwbCBlcnJvcjonLCBlcnIpXG4gICAgICB9XG5cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFwcGVuZFJ1bk1lc3NhZ2UobWVzc2FnZTogc3RyaW5nKSB7XG4gICAgY29uc3Qgcm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpXG4gICAgcm93LmNsYXNzTGlzdC5hZGQoJ3J1bi1oZWFkZXInKVxuICAgIHJvdy50ZXh0Q29udGVudCA9IG1lc3NhZ2VcbiAgICB0aGlzLm91dHB1dEVsZW1lbnQuYXBwZW5kQ2hpbGQocm93KVxuICB9XG5cbiAgcHJpdmF0ZSBjbGVhcigpIHtcbiAgICB0aGlzLm91dHB1dEVsZW1lbnQuaW5uZXJIVE1MID0gJydcbiAgICB0aGlzLm91dHB1dEVsZW1lbnQuYXBwZW5kQ2hpbGQoZ2V0V2VsY29tZUVsZW1lbnQoV0VMQ09NRV9NRVNTQUdFKSlcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRNYWluRWxlbWVudCgpIHtcbiAgY29uc3QgbWFpbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdtYWluJylcbiAgbWFpbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnbm9kZS1yZXBsJywgJ25hdGl2ZS1rZXktYmluZGluZ3MnKVxuICBtYWluRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJylcbiAgcmV0dXJuIG1haW5FbGVtZW50XG59XG5cbmZ1bmN0aW9uIGdldE91dHB1dEVsZW1lbnQoKSB7XG4gIGNvbnN0IG91dHB1dEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJylcbiAgb3V0cHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdub2RlLXJlcGxfX291dHB1dCcpXG4gIHJldHVybiBvdXRwdXRFbGVtZW50XG59XG5cbmZ1bmN0aW9uIGdldFdlbGNvbWVFbGVtZW50KG1lc3NhZ2U6IHN0cmluZykge1xuICBjb25zdCB3ZWxjb21lRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKVxuICB3ZWxjb21lRWxlbWVudC5pbm5lckhUTUwgPSBtZXNzYWdlXG4gIHdlbGNvbWVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ25vZGUtcmVwbC13ZWxjb21lLW1lc3NhZ2UnKVxuICByZXR1cm4gd2VsY29tZUVsZW1lbnRcbn1cbiJdfQ==