varying vec2 vertexUV;

uniform float T;
uniform vec2 R;

#define FC gl_FragCoord

#define PI 3.14159265359
#define S(a, b, x) smoothstep(a, b, x)

void main() {

  vec2 uv = vertexUV - .5;

  vec3 color = vec3(0.);

  color.rg = uv;

  gl_FragColor = vec4(color, 1.);
}
