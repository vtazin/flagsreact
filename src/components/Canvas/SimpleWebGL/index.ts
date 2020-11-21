import Context from "./renderer/Context";
import Mesh from "./Mesh";
import { MeshDescription } from "../../../worker/helper/helper";

export type ColorRGBA = [number, number, number, number];

export type MeshType = {
    aPosition: [number, number][],
    aInstancedLeftBottom: [number, number, number, number][],
    aInstancedColor: number[],
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

    static setMeshDescription(meshDesscription: MeshDescription) {
        if (!this.mesh) {
            this.mesh = new Mesh(meshDesscription);
        }
        else {
            this.mesh.updateContent(meshDesscription);
        }
    }
    static setCleanColor(color: ColorRGBA) {
        this.context.setCleanColor(color);
    }

    static setColorList(colorList: ColorRGBA[]) {
        this.context.shaderProgram.setColorListUniform(colorList);
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
