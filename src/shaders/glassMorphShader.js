export const glassMorphVertexShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const glassMorphFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Fresnel effect for glass edges
    vec3 viewDirection = normalize(vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

    // Scan lines effect
    float scanline = sin(vUv.y * 100.0 + uTime * 2.0) * 0.5 + 0.5;
    scanline = pow(scanline, 3.0) * 0.3;

    // Glitch effect (occasional flashes)
    float glitch = step(0.98, sin(uTime * 10.0 + vUv.y * 50.0)) * 0.5;

    // Combine effects
    vec3 color = uColor;
    color += fresnel * 0.5;           // Edge glow
    color += scanline;                // Scan lines
    color += glitch;                  // Glitch flashes

    // Alpha combines fresnel and base opacity
    float alpha = (fresnel * 0.6 + 0.4) * uOpacity;

    gl_FragColor = vec4(color, alpha);
  }
`;
