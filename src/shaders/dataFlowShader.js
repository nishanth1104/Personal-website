export const dataFlowVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const dataFlowFragmentShader = `
  uniform float uTime;
  uniform vec3 uStartColor;
  uniform vec3 uEndColor;
  uniform float uProgress;
  varying vec2 vUv;

  void main() {
    // Gradient along connection
    vec3 color = mix(uStartColor, uEndColor, vUv.x);

    // Animated data flow (moving dash pattern)
    float flow = fract(vUv.x * 3.0 - uTime * 0.5);
    float flowPulse = smoothstep(0.0, 0.1, flow) * smoothstep(0.3, 0.2, flow);

    // Brighten where data flows
    color += flowPulse * 0.5;

    // Edge fade (vertical gradient)
    float edge = smoothstep(0.0, 0.05, vUv.y) * smoothstep(1.0, 0.95, vUv.y);

    // Opacity based on progress and edge
    float alpha = edge * uProgress;

    gl_FragColor = vec4(color, alpha);
  }
`;
