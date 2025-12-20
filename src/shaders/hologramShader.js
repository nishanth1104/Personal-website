export const hologramVertexShader = `
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

export const hologramFragmentShader = `
  uniform float uTime;
  uniform vec3 uColor;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;
  varying vec2 vUv;

  void main() {
    // Fresnel effect for holographic edges
    vec3 viewDirection = normalize(vPosition);
    float fresnel = pow(1.0 - abs(dot(viewDirection, vNormal)), 2.0);

    // Horizontal scan lines (faster)
    float scanline = sin(vUv.y * 150.0 + uTime * 3.0) * 0.5 + 0.5;
    scanline = pow(scanline, 2.0) * 0.4;

    // Vertical interference pattern
    float interference = sin(vUv.x * 50.0 + uTime * 1.5) * 0.3;

    // Random noise flicker
    float flicker = sin(uTime * 20.0) * 0.1 + 0.9;

    // Combine effects
    vec3 color = uColor;
    color += fresnel * 0.6;          // Strong edge glow
    color += scanline;               // Scan lines
    color += interference;           // Interference
    color *= flicker;                // Subtle flicker

    // Alpha with fresnel and flicker
    float alpha = (fresnel * 0.7 + 0.3) * uOpacity * flicker;

    gl_FragColor = vec4(color, alpha);
  }
`;
