import SimpleEngine from ".";
import { MeshDescription } from "../../../worker/helper/helper";

export default class Mesh {

    attributes?: any[];

    count = 0;
    arrayBuffer?: ArrayBuffer;

    currentBuffer?: ArrayBuffer;

    colorOffset = 0;
    leftBottomOffset = 0;

    constructor(description: MeshDescription) {
        this.updateContent(description);
    }

    updateContent(description: MeshDescription) {
        const { colorOffset, leftBottomOffset, itemsCount, arrayBuffer } = description;

        if (this.currentBuffer !== arrayBuffer) {
            this.currentBuffer = arrayBuffer;
            this.arrayBuffer = new Float32Array(arrayBuffer);
            this.attributes = [
                {
                    name: 'a_position',
                    offset: 0,
                    stride: 0
                },
                {
                    name: 'ai_color',
                    offset: colorOffset,
                    stride: 0
                },
                {
                    name: 'ai_leftBottom',
                    offset: leftBottomOffset,
                    stride: 0
                }
            ];
            this.count = itemsCount;
        }

    }

    render() {
        if (this.arrayBuffer && this.attributes) {
            SimpleEngine.context.drawInstanced(this.arrayBuffer, this.attributes, this.count)
        }
    }
}


