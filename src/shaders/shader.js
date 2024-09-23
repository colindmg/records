export const vertexShader = `

varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  // Varyings
  vUv = uv;
}
`;

export const fragmentShader = `

uniform sampler2D uTexture;

varying vec2 vUv;

void main() {
  // gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);

  vec4 color = texture2D(uTexture, vUv);
  gl_FragColor = color;
}
`;
