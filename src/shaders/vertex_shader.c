varying vec2 vertexUV;

void main() {

  vertexUV = uv;

  gl_Position =
      projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
}
