export const particleVertexShader = `
  uniform float uProgress;
  uniform float uTime;
  attribute vec3 aTargetPosition;
  attribute vec3 aInitialPosition;

  void main() {
    // Interpolate between initial random position and target sphere position
    vec3 pos = mix(aInitialPosition, aTargetPosition, uProgress);

    // Add wave motion for particles not yet converged
    pos.y += sin(uTime + pos.x * 5.0) * 0.1 * (1.0 - uProgress);

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Size based on distance and progress
    gl_PointSize = (3.0 + uProgress * 2.0) * (300.0 / -mvPosition.z);
  }
`;

export const particleFragmentShader = `
  uniform vec3 uColor;

  void main() {
    // Create circular particle
    vec2 center = gl_PointCoord - 0.5;
    float dist = length(center);

    // Discard pixels outside circle
    if (dist > 0.5) discard;

    // Soft edge with glow
    float alpha = smoothstep(0.5, 0.2, dist);

    gl_FragColor = vec4(uColor, alpha);
  }
`;
