"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stream_1 = require("stream");
class NodeReplReadStream extends stream_1.Readable {
    constructor(content, options = {}) {
        super(options);
        this.content = content.split('\n');
    }
    getLines() {
        return this.content.length;
    }
    _read() {
        if (this.content.length > 0) {
            this.push(this.content.shift() + '\n');
        }
        else {
            this.push(undefined);
        }
    }
}
exports.NodeReplReadStream = NodeReplReadStream;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1yZXBsLXJlYWQtc3RyZWFtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL25vZGUtcmVwbC1yZWFkLXN0cmVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFrRDtBQUVsRCx3QkFBZ0MsU0FBUSxpQkFBUTtJQUc5QyxZQUFZLE9BQWUsRUFBRSxVQUEyQixFQUFFO1FBQ3hELEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRU0sUUFBUTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQTtJQUM1QixDQUFDO0lBRU0sS0FBSztRQUNWLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFBO1FBQ3hDLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDdEIsQ0FBQztJQUNILENBQUM7Q0FDRjtBQW5CRCxnREFtQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSZWFkYWJsZSwgUmVhZGFibGVPcHRpb25zIH0gZnJvbSAnc3RyZWFtJ1xuXG5leHBvcnQgY2xhc3MgTm9kZVJlcGxSZWFkU3RyZWFtIGV4dGVuZHMgUmVhZGFibGUge1xuICBwcml2YXRlIGNvbnRlbnQ6IHN0cmluZ1tdXG5cbiAgY29uc3RydWN0b3IoY29udGVudDogc3RyaW5nLCBvcHRpb25zOiBSZWFkYWJsZU9wdGlvbnMgPSB7fSkge1xuICAgIHN1cGVyKG9wdGlvbnMpXG4gICAgdGhpcy5jb250ZW50ID0gY29udGVudC5zcGxpdCgnXFxuJylcbiAgfVxuXG4gIHB1YmxpYyBnZXRMaW5lcygpIHtcbiAgICByZXR1cm4gdGhpcy5jb250ZW50Lmxlbmd0aFxuICB9XG5cbiAgcHVibGljIF9yZWFkKCkge1xuICAgIGlmICh0aGlzLmNvbnRlbnQubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wdXNoKHRoaXMuY29udGVudC5zaGlmdCgpICsgJ1xcbicpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucHVzaCh1bmRlZmluZWQpXG4gICAgfVxuICB9XG59XG4iXX0=