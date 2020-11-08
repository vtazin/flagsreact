import Context from "./renderer/Context";
import Mesh from "./Mesh";

export type ColorRGBA = [number, number, number, number];

export type MeshType = {
    aPosition: [number, number][],
    aInstancedLeftBottom: [number, number, number, number][],
    aInstancedColor: ColorRGBA[],
}

class SimpleEngine {
    private static mesh?: Mesh;

    private constructor() { }

    static create(canvas: HTMLCanvasElement) {
        Context.setInstance(canvas);
        this.render();
    }

    static get context() {
        return Context.getInstance();
    }

    static setMesh(mesh: MeshType) {

        const context = this.context;
        if (!this.mesh) {
            this.mesh = new Mesh(context.gl);
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
        for (let i = 0; i < mesh.aInstancedLeftBottom.length; i++) {
            bufferArray.push(...mesh.aInstancedLeftBottom[i]);
        }

        const arrayBuffer = new Float32Array(bufferArray);
        const attributes = [
            {
                location: context.shaderProgram.vertexAttributes['a_position'].location,
                numComponents: context.shaderProgram.vertexAttributes['a_position'].numComponents,
                type: context.gl[context.shaderProgram.vertexAttributes['a_position'].type],
                normalize: false,
                offset: 0,
                stride: 0
            },
            {
                location: context.shaderProgram.vertexAttributes['ai_color'].location,
                numComponents: context.shaderProgram.vertexAttributes['ai_color'].numComponents,
                type: context.gl[context.shaderProgram.vertexAttributes['ai_color'].type],
                normalize: false,
                offset: positionArray.length * 4,
                stride: 0
            },
            {
                location: context.shaderProgram.vertexAttributes['ai_leftBottom'].location,
                numComponents: context.shaderProgram.vertexAttributes['ai_leftBottom'].numComponents,
                type: context.gl[context.shaderProgram.vertexAttributes['ai_leftBottom'].type],
                normalize: false,
                offset: positionArray.length * 4 + mesh.aInstancedColor.length * 4 * 4,
                stride: 0
            }
        ];

        const uniforms = context.shaderProgram.uniforms;

        this.mesh.setAttibutes(attributes, uniforms, arrayBuffer, mesh.aInstancedColor.length);

    }

    private static renderFlag() {
        const context = this.context;
        if (this.mesh !== undefined) {
            context.shaderProgram.activate();
            this.mesh.render();
        }
    }

    static render() {
        requestAnimationFrame(SimpleEngine.render);
        SimpleEngine.context.cleanCanvas();
        SimpleEngine.renderFlag();
    }
}

export default SimpleEngine;
