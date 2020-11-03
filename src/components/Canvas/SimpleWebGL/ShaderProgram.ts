import shaderVert from "./vertex.glsl";
import shaderFrag from "./fragment.glsl";

class ShaderProgram {

    gl: WebGLRenderingContext;
    ANGLE: ANGLE_instanced_arrays;
    shaderProgram!: WebGLProgram;
    positionLoc!: number;
    iLeftBottomLoc!: number;
    iColorLoc!: number;

    constructor(gl: WebGLRenderingContext, ANGLE: ANGLE_instanced_arrays) {
        this.gl = gl;
        this.ANGLE = ANGLE;

        const vertexShader = this.compileShader(gl, shaderVert, gl.VERTEX_SHADER);
        const fragmentShader = this.compileShader(
            gl,
            shaderFrag,
            gl.FRAGMENT_SHADER
        );
        this.shaderProgram = this.createProgram(gl, vertexShader, fragmentShader);


        this.gl.useProgram(this.shaderProgram);

        this.positionLoc = gl.getAttribLocation(this.shaderProgram, "a_position");
        gl.enableVertexAttribArray(this.positionLoc);
        this.iLeftBottomLoc = gl.getAttribLocation(
            this.shaderProgram,
            "a_instansedLeftBottom"
        );
        gl.enableVertexAttribArray(this.iLeftBottomLoc);
        this.ANGLE.vertexAttribDivisorANGLE(this.iLeftBottomLoc, 1);

        this.iColorLoc = gl.getAttribLocation(
            this.shaderProgram,
            "a_instancedColor"
        );
        gl.enableVertexAttribArray(this.iColorLoc);
        this.ANGLE.vertexAttribDivisorANGLE(this.iColorLoc, 1);
        const matrixLoc = gl.getUniformLocation(this.shaderProgram, "matrix");
        gl.uniformMatrix4fv(matrixLoc, false, [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
        ]);
    }


    _fillVertexAttributes(gl) {
        var vertexAttributes = {};
        var attributesCount = gl.getProgramParameter(this.mCompiledProgram, gl.ACTIVE_ATTRIBUTES);
        for (var i = 0; i < attributesCount; i++) {
            var info = gl.getActiveAttrib(this.mCompiledProgram, i);
            var name = info.name;
            if (name.indexOf('gl_') !== 0) {
                var location = gl.getAttribLocation(this.mCompiledProgram, name);
                vertexAttributes[name] = new GWTK.gEngine.Renderer.ShaderVertexAttribute(name, location, info.type);
            }
        }
        return vertexAttributes;
    }

    /**
     * Заполнить массив униформов программы шейдера
     * @method _fillUniforms
     * @private
     * @param gl {WebGLRenderingContext} Контекст рисования
     */
    _fillUniforms(gl) {
        var uniforms = {};
        var uniformsCount = gl.getProgramParameter(this.mCompiledProgram, gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < uniformsCount; i++) {
            var info = gl.getActiveUniform(this.mCompiledProgram, i);
            var name = info.name;
            if (name.indexOf('gl_') !== 0) {
                var location = gl.getUniformLocation(this.mCompiledProgram, name);
                uniforms[name] = this._createUniform(gl, name, location, info.type);
                if (name.indexOf('og_texture') === 0) {
                    var ind = parseInt(name.substring(10));
                    uniforms[name].setValue(ind);
                }
            }
        }
        return uniforms;
    }



    private compileShader(
        gl: WebGLRenderingContext,
        shaderSource: string,
        shaderType: number
    ) {
        // Create the shader object
        var shader = gl.createShader(shaderType)!;

        // Set the shader source code.
        gl.shaderSource(shader, shaderSource);

        // Compile the shader
        gl.compileShader(shader);

        // Check if it compiled
        var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!success) {
            // Something went wrong during compilation; get the error
            throw Error("could not compile shader:" + gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    private createProgram(
        gl: WebGLRenderingContext,
        vertexShader: WebGLShader,
        fragmentShader: WebGLShader
    ) {
        // create a program.
        var program = gl.createProgram()!;

        // attach the shaders.
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // link the program.
        gl.linkProgram(program);

        // Check if it linked.
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!success) {
            // something went wrong with the link
            throw Error("program failed to link:" + gl.getProgramInfoLog(program));
        }

        return program;
    }

    activate() {
        this.gl.useProgram(this.shaderProgram);
    }
}

export default ShaderProgram;
