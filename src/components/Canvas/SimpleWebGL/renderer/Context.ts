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
        this.gl.clearColor(0, 0, 0, 0);
        this.clearBit = this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT;

        this.shaderProgram = new ShaderProgram(this.gl, this.ANGLE);
    }

    resize() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.shaderProgram.resizeCanvas();
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

    drawInstanced(arrayBuffer: ArrayBuffer, attributes: any[], numInstances: number) {
        this.shaderProgram.updateAttibutes(arrayBuffer, attributes);

        this.ANGLE.drawArraysInstancedANGLE(
            this.gl.TRIANGLE_FAN,
            0, // offset
            4, // num vertices per instance
            numInstances // num instances
        );
    }
}

export default Context;