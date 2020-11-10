import shaderVert from "../shaders/vertex.glsl";
import shaderFrag from "../shaders/fragment.glsl";

import { mat4 } from 'gl-matrix';

enum AttributeType {
    FLOAT = 'FLOAT',
    NONE = 'NONE'
}


class ShaderProgram {

    gl: WebGLRenderingContext;
    ANGLE: ANGLE_instanced_arrays;
    shaderProgram!: WebGLProgram;
    positionLoc!: number;
    iLeftBottomLoc!: number;
    iColorLoc!: number;

    attibuteBuffer!: WebGLBuffer;
    arrayBuffer?: ArrayBuffer;

    vertexAttributes: { [key: string]: { name: string; location: number; type: AttributeType; numComponents: number; } } = {};
    uniforms: { [key: string]: { name: string; location: WebGLUniformLocation; type: number; }; };

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

        this._fillVertexAttributes();

        for (const attributeName in this.vertexAttributes) {
            const vertexAttribute = this.vertexAttributes[attributeName];
            gl.enableVertexAttribArray(vertexAttribute.location);
            if (attributeName.indexOf('ai_') === 0) {
                this.ANGLE.vertexAttribDivisorANGLE(vertexAttribute.location, 1);
            }

        }

        this.uniforms = this._fillUniforms();
        const ratio = this.gl.canvas.width / this.gl.canvas.height;
        const pMatrix = mat4.ortho(mat4.create(), -ratio, ratio, -1.0, 1.0, 1.0, -1.0);
        this.gl.uniformMatrix4fv(this.uniforms['u_pMatrix'].location, false, pMatrix);
        this.gl.uniform1f(this.uniforms['u_time'].location, 0);


        this.attibuteBuffer = gl.createBuffer()!;

        // const a = vec4.create();
        // a[0] = 0;
        // a[1] = -0.6666667;
        // a[2] = 0;
        // a[3] = 1;

        // console.log(vec4.transformMat4(vec4.create(), a, pMatrix));
    }


    _fillVertexAttributes() {
        const attributesCount = this.gl.getProgramParameter(this.shaderProgram, this.gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributesCount; i++) {
            const info = this.gl.getActiveAttrib(this.shaderProgram, i)!;
            var name = info.name;
            if (name.indexOf('gl_') !== 0) {
                const location = this.gl.getAttribLocation(this.shaderProgram, name);
                let type;
                let numComponents;
                switch (info.type) {
                    case this.gl.FLOAT_VEC2:
                        type = AttributeType.FLOAT;
                        numComponents = 2;
                        break;
                    case this.gl.FLOAT_VEC3:
                        type = AttributeType.FLOAT;
                        numComponents = 3;
                        break;
                    case this.gl.FLOAT_VEC4:
                        type = AttributeType.FLOAT;
                        numComponents = 4;
                        break;
                    default:
                        type = AttributeType.NONE;
                        numComponents = 0;
                }


                this.vertexAttributes[name] = { name, location, type, numComponents };
            }
        }
    }

    /**
     * Заполнить массив униформов программы шейдера
     * @method _fillUniforms
     * @private
     * @param gl {WebGLRenderingContext} Контекст рисования
     */
    _fillUniforms() {
        var uniforms: { [key: string]: { name: string; location: WebGLUniformLocation; type: number; } } = {};
        var uniformsCount = this.gl.getProgramParameter(this.shaderProgram, this.gl.ACTIVE_UNIFORMS);
        for (var i = 0; i < uniformsCount; i++) {
            var info = this.gl.getActiveUniform(this.shaderProgram, i)!;
            var name = info.name;
            if (name.indexOf('gl_') !== 0) {
                var location = this.gl.getUniformLocation(this.shaderProgram, name)!;
                uniforms[name] = { name, location, type: info.type };
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

    updateAttibutes(arrayBuffer: ArrayBuffer, attributes: any[]) {
        const gl = this.gl;
        if (arrayBuffer !== this.arrayBuffer) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.attibuteBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                arrayBuffer,
                gl.STATIC_DRAW
            );


            for (let i = 0; i < attributes.length; i++) {

                const { name, offset, stride, normalize = false } = attributes[i];
                const { location, numComponents, type } = this.vertexAttributes[name];
                if (location !== undefined) {
                    gl.vertexAttribPointer(
                        location,
                        numComponents,
                        gl[type],
                        normalize,
                        stride,
                        offset
                    );
                }
            }

            this.arrayBuffer = arrayBuffer;
        }
        gl.uniform1f(this.uniforms['u_time'].location, performance.now());

    }
}

export default ShaderProgram;
