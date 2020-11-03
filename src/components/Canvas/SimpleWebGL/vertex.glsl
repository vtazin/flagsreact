precision lowp float;

attribute vec2 a_position;
attribute vec2 a_instansedLeftBottom;
attribute vec4 a_instancedColor;

uniform mat4 matrix;


varying vec4 v_color;

void main(void)
{
    v_color=a_instancedColor;
    gl_Position=matrix*vec4(a_position+a_instansedLeftBottom,0.,1.);
}