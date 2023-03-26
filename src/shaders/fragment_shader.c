varying vec2 vertexUV;

void main() {

  vec3 color = vec3(0.);

  color.rg = vertexUV;

  gl_FragColor = vec4(color, 1.);
}
