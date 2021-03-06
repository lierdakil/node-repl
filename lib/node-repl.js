"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_repl_view_1 = require("./node-repl-view");
const atom_1 = require("atom");
let subs;
let replView;
function activate() {
    replView = new node_repl_view_1.NodeReplView();
    atom.workspace.open(replView);
    subs = new atom_1.CompositeDisposable();
    subs.add(atom.workspace.observeTextEditors((ed) => {
        subs.add(ed.onDidStopChanging(() => {
            if (replView && ed.getGrammar().scopeName.match(/source\.js/)) {
                replView.run(ed);
            }
        }));
    }));
}
exports.activate = activate;
function deactivate() {
    replView && replView.destroy();
    subs.dispose();
}
exports.deactivate = deactivate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1yZXBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25vZGUtcmVwbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHFEQUErQztBQUMvQywrQkFBMEM7QUFFMUMsSUFBSSxJQUF5QixDQUFBO0FBQzdCLElBQUksUUFBa0MsQ0FBQTtBQUV0QztJQUVFLFFBQVEsR0FBRyxJQUFJLDZCQUFZLEVBQUUsQ0FBQTtJQUU3QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUU3QixJQUFJLEdBQUcsSUFBSSwwQkFBbUIsRUFBRSxDQUFBO0lBRWhDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFO1FBQ2hELElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRTtZQUNqQyxFQUFFLENBQUMsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLFVBQVUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RCxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ2xCLENBQUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUVMLENBQUM7QUFoQkQsNEJBZ0JDO0FBRUQ7SUFDRSxRQUFRLElBQUksUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzlCLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtBQUNoQixDQUFDO0FBSEQsZ0NBR0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOb2RlUmVwbFZpZXcgfSBmcm9tICcuL25vZGUtcmVwbC12aWV3J1xuaW1wb3J0IHsgQ29tcG9zaXRlRGlzcG9zYWJsZSB9IGZyb20gJ2F0b20nXG5cbmxldCBzdWJzOiBDb21wb3NpdGVEaXNwb3NhYmxlXG5sZXQgcmVwbFZpZXc6IE5vZGVSZXBsVmlldyB8IHVuZGVmaW5lZFxuXG5leHBvcnQgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gIC8vIGdldCByZXBsIHZpZXdcbiAgcmVwbFZpZXcgPSBuZXcgTm9kZVJlcGxWaWV3KClcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWZsb2F0aW5nLXByb21pc2VzXG4gIGF0b20ud29ya3NwYWNlLm9wZW4ocmVwbFZpZXcpXG5cbiAgc3VicyA9IG5ldyBDb21wb3NpdGVEaXNwb3NhYmxlKClcblxuICBzdWJzLmFkZChhdG9tLndvcmtzcGFjZS5vYnNlcnZlVGV4dEVkaXRvcnMoKGVkKSA9PiB7XG4gICAgc3Vicy5hZGQoZWQub25EaWRTdG9wQ2hhbmdpbmcoKCkgPT4ge1xuICAgICAgaWYgKHJlcGxWaWV3ICYmIGVkLmdldEdyYW1tYXIoKS5zY29wZU5hbWUubWF0Y2goL3NvdXJjZVxcLmpzLykpIHtcbiAgICAgICAgcmVwbFZpZXcucnVuKGVkKVxuICAgICAgfVxuICAgIH0pKVxuICB9KSlcblxufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVhY3RpdmF0ZSgpIHtcbiAgcmVwbFZpZXcgJiYgcmVwbFZpZXcuZGVzdHJveSgpXG4gIHN1YnMuZGlzcG9zZSgpXG59XG4iXX0=