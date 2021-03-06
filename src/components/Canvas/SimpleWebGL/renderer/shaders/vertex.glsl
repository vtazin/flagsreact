precision lowp float;

attribute vec2 a_position;
attribute vec4 ai_leftBottom;
attribute float ai_color;

uniform mat4 u_pMatrix;
uniform float u_time;
uniform vec4 u_Material[7];

varying vec4 v_color;

void main(void)
{

    v_color=u_Material[int(ai_color)];
    float alpha=ai_leftBottom.y+ai_leftBottom.w*u_time/1000.;
    vec2 centerPosition=vec2(sin(alpha)*ai_leftBottom.x,cos(alpha)*ai_leftBottom.x-ai_leftBottom.z);
    gl_Position=u_pMatrix*vec4(a_position+centerPosition,0.,1.);
}