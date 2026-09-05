"use client";

import { useEffect, useRef, type MouseEvent as ReactMouseEvent } from "react";

const vertexShader = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = (position + 1.0) * 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;
  varying vec2 vUv;
  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_distortion;
  uniform float u_gloss;
  uniform vec3 u_baseColor;
  uniform vec3 u_tintColor;
  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 p = uv * 6.5 - vec2(16.0);
    vec2 i = vec2(p);
    float c = 1.0;
    float inten = 0.06 * u_distortion;
    for (int n = 0; n < 4; n++) {
      float t = u_time * (1.0 - (3.2 / float(n + 1)));
      i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
      c += 1.0 / length(vec2(p.x / (sin(i.x + t) / inten), p.y / (cos(i.y + t) / inten)));
    }
    c /= 4.0;
    c = 1.18 - pow(c, 1.35);
    float highlight = pow(abs(c), 7.7);
    vec3 color = mix(vec3(0.08, 0.28, 0.75), vec3(0.35, 0.65, 1.0), clamp(highlight, 0.0, 1.0));
    color += vec3(pow(clamp(c, 0.0, 1.0), 2.8)) * 0.5;
    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ElectricCatalogueButton() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const speedBoostRef = useRef(1);
  const restoreTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", { alpha: false, antialias: false });
    if (!canvas || !gl) return;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    const program = gl.createProgram();
    if (!vertex || !fragment || !program) return;

    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const timeUniform = gl.getUniformLocation(program, "u_time");
    const resolutionUniform = gl.getUniformLocation(program, "u_resolution");
    const distortionUniform = gl.getUniformLocation(program, "u_distortion");
    const glossUniform = gl.getUniformLocation(program, "u_gloss");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let time = 0;
    let previous = 0;

    const render = (timestamp: number) => {
      if (!previous) previous = timestamp;
      const delta = (timestamp - previous) / 1000;
      previous = timestamp;
      if (!reducedMotion.matches) time += delta * 0.7 * speedBoostRef.current;

      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * pixelRatio));
      const height = Math.max(1, Math.round(canvas.clientHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform1f(timeUniform, time);
      gl.uniform2f(resolutionUniform, width, height);
      gl.uniform1f(distortionUniform, 1.2);
      gl.uniform1f(glossUniform, 1.4);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      frame = window.requestAnimationFrame(render);
    };

    frame = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frame);
      if (restoreTimerRef.current !== null) window.clearTimeout(restoreTimerRef.current);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, []);

  const handleClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    speedBoostRef.current = 3.2;
    if (restoreTimerRef.current !== null) window.clearTimeout(restoreTimerRef.current);
    restoreTimerRef.current = window.setTimeout(() => {
      speedBoostRef.current = 1;
    }, 300);

    const rect = event.currentTarget.getBoundingClientRect();
    const ripple = document.createElement("span");
    ripple.className = "categoryLiquidRipple";
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;
    event.currentTarget.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 600);
  };

  return (
    <a
      className="categoryCatalogueLink categoryLiquidCatalogueButton"
      href="#diary-catalogue"
      aria-label="Download catalogue"
      onMouseEnter={() => { speedBoostRef.current = 1.8; }}
      onMouseLeave={() => { speedBoostRef.current = 1; }}
      onFocus={() => { speedBoostRef.current = 1.8; }}
      onBlur={() => { speedBoostRef.current = 1; }}
      onClick={handleClick}
    >
      <canvas ref={canvasRef} aria-hidden="true" />
      <span>Download catalogue</span>
    </a>
  );
}
