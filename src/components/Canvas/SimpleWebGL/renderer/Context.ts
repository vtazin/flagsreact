import { ColorRGBA } from "..";
import ShaderProgram from "./ShaderProgram/ShaderProgram";

class Context {

    private static instance?: Context;

    canvas: HTMLCanvasElement;
    gl!: WebGLRenderingContext;
    ANGLE!: ANGLE_instanced_arrays;
    clearBit!: number;
    shaderProgram!: ShaderProgram;

    private constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const gl = this.canvas.getContext("webgl");
        if (gl) {
            this.gl = gl;
            const ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) {
                this.ANGLE = ext;
                this.setUp();
            } else {
                alert("need ANGLE_instanced_arrays");
            }
        } else {
            alert("WebGL is not supported!");
        }
    }

    private setUp() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clearColor(0.25, 0.25, 0.25, 0);
        this.clearBit = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT;

        this.shaderProgram = new ShaderProgram(this.gl, this.ANGLE);
    }

    setCleanColor(color: ColorRGBA) {
        this.gl.clearColor(...color);
    }
    cleanCanvas() {
        this.gl.clear(this.clearBit);
    }

    static setInstance(canvas: HTMLCanvasElement) {
        if (!this.instance) {
            this.instance = new Context(canvas);
        }
        else {
            throw Error(`You should destroy previous Context!`);
        }
    }
    static getInstance() {
        if (!this.instance) {
            throw Error(`Context has not been created!`);
        }
        return this.instance;
    }

    drawInstanced(buffer: WebGLBuffer, arrayBuffer: ArrayBuffer, attributes: any[], uniforms: any, numInstances: number) {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            arrayBuffer,
            gl.STATIC_DRAW
        );


        for (let i = 0; i < attributes.length; i++) {
            const attribute = attributes[i];
            gl.vertexAttribPointer(
                attribute.location,
                attribute.numComponents,
                attribute.type,
                attribute.normalize,
                attribute.stride,
                attribute.offset
            );
        }

        gl.uniform1f(uniforms['u_time'].location, performance.now());

        this.ANGLE.drawArraysInstancedANGLE(
            gl.TRIANGLE_FAN,
            0, // offset
            4, // num vertices per instance
            numInstances // num instances
        );
    }
}

export default Context;