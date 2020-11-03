
export default class Mesh {

    buffer: WebGLBuffer;

    attributes?: any[];
    arrayBuffer?: ArrayBuffer;

    isDirty: boolean = true;

    constructor(gl: WebGLRenderingContext) {
        this.buffer = gl.createBuffer()!;
    }

    update(gl: WebGLRenderingContext) {
        if (this.arrayBuffer && this.attributes) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                this.arrayBuffer,
                gl.STATIC_DRAW
            );


            for (let i = 0; i < this.attributes.length; i++) {
                const attribute = this.attributes[i];
                gl.vertexAttribPointer(
                    attribute.location,
                    attribute.numComponents,
                    attribute.type,
                    attribute.normalize,
                    attribute.stride,
                    attribute.offset
                );
            }
            this.isDirty = false;
            debugger;
        }

    }

    setAttibutes(attributes: any[], arrayBuffer: ArrayBuffer) {
        this.attributes = attributes;
        this.arrayBuffer = arrayBuffer;
        this.isDirty = true;
    }

    render(gl: WebGLRenderingContext, ANGLE: ANGLE_instanced_arrays) {

        if (this.isDirty) {
            this.update(gl);
        }
        if (this.arrayBuffer && this.attributes) {
            ANGLE.drawArraysInstancedANGLE(
                gl.TRIANGLE_FAN,
                0, // offset
                4, // num vertices per instance
                1 // num instances
            );
        }
    }
}


