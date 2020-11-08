import SimpleEngine from ".";

export default class Mesh {

    buffer: WebGLBuffer;

    attributes?: any[];
    uniforms?: any;
    count = 0;
    arrayBuffer?: ArrayBuffer;

    isDirty: boolean = true;

    constructor(gl: WebGLRenderingContext) {
        this.buffer = gl.createBuffer()!;
    }



    setAttibutes(attributes: any[], uniforms: any, arrayBuffer: ArrayBuffer, count: number) {
        this.attributes = attributes;
        this.uniforms = uniforms;
        this.arrayBuffer = arrayBuffer;
        this.count = count;
        this.isDirty = true;
    }

    render() {

        if (this.arrayBuffer && this.attributes) {
            SimpleEngine.context.drawInstanced(this.buffer, this.arrayBuffer, this.attributes, this.uniforms, this.count)
        }
    }
}


