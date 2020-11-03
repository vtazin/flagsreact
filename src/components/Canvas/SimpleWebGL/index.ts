
import Mesh from "./Mesh";
import ShaderProgram from "./ShaderProgram";

export type ColorRGBA = [number, number, number, number];

export type MeshType = {
    aPosition: [number, number][],
    indices: number[],
    aInstansedLeftBottom: [number, number][],
    aInstancedColor: ColorRGBA[],
}

class SimpleEngine {
    canvas: HTMLCanvasElement;
    gl!: WebGLRenderingContext;
    ANGLE!: ANGLE_instanced_arrays;
    clearBit!: number;
    shaderProgram!: ShaderProgram;
    mesh?: Mesh;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const gl = this.canvas.getContext("webgl", {});
        if (gl) {
            this.gl = gl;
            const ext = gl.getExtension("ANGLE_instanced_arrays");
            if (ext) {
                this.ANGLE = ext;
                this.setUp(gl);
            } else {
                alert("need ANGLE_instanced_arrays");
            }
            this.render();
        }
    }

    private setUp(gl: WebGLRenderingContext) {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        gl.clearColor(1, 1, 0, 1);
        this.clearBit = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;

        this.shaderProgram = new ShaderProgram(this.gl, this.ANGLE);
    }

    setMesh(mesh: MeshType) {
        if (this.gl) {
            if (!this.mesh) {
                this.mesh = new Mesh(this.gl);
            }

            const positionArray: number[] = [];
            for (let i = 0; i < mesh.aPosition.length; i++) {
                const position = mesh.aPosition[i];
                positionArray.push(...position);
            }
            const bufferArray: number[] = [...positionArray];
            for (let i = 0; i < mesh.aInstancedColor.length; i++) {
                bufferArray.push(...mesh.aInstancedColor[i]);
            }
            for (let i = 0; i < mesh.aInstansedLeftBottom.length; i++) {
                bufferArray.push(...mesh.aInstansedLeftBottom[i]);
            }

            const arrayBuffer = new Float32Array(bufferArray);
            const attributes = [
                {
                    location: this.shaderProgram.positionLoc,
                    numComponents: 2,
                    type: this.gl.FLOAT,
                    normalize: false,
                    offset: 0,
                    stride: 0
                },
                {
                    location: this.shaderProgram.iColorLoc,
                    numComponents: 4,
                    type: this.gl.FLOAT,
                    normalize: false,
                    offset: positionArray.length * 4,
                    stride: 0
                },
                {
                    location: this.shaderProgram.iLeftBottomLoc,
                    numComponents: 2,
                    type: this.gl.FLOAT,
                    normalize: false,
                    offset: positionArray.length * 4 + mesh.aInstancedColor.length * 4 * 4,
                    stride: 0
                }
            ];

            this.mesh.setAttibutes(attributes, arrayBuffer);
        }
    }

    setCleanColor(color: ColorRGBA) {
        this.gl.clearColor(...color);
    }

    private renderFlag() {

        if (this.mesh !== undefined) {
            this.shaderProgram.activate();
            this.mesh.render(this.gl, this.ANGLE);
        }
    }

    render = () => {
        requestAnimationFrame(this.render);
        this.gl.clear(this.clearBit);
        this.renderFlag();
    }
}

export default SimpleEngine;
