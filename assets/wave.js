(() => {
  'use strict';

  const canvas = document.querySelector('[data-wave-state]');
  if (!(canvas instanceof HTMLCanvasElement)) return;

  try {
    const context = canvas.getContext('2d');
    if (!context) {
      canvas.dataset.waveState = 'unsupported';
      return;
    }

    const fallback = canvas.parentElement?.querySelector('.wave-fallback');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const maximumDpr = 2;
    let width = 1;
    let height = 1;
    let resizeFrameId = 0;
    const phase = 0.3;

    if (fallback instanceof HTMLElement) fallback.hidden = true;

    function sizeCanvas() {
      const bounds = canvas.parentElement?.getBoundingClientRect() ?? canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(bounds.width));
      height = Math.max(1, Math.round(bounds.height));
      const dpr = Math.min(window.devicePixelRatio || 1, maximumDpr);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function waveProfile() {
      const shortLandscape = width >= 640 && height <= 180;
      if (shortLandscape) {
        return { amplitude: height * 0.34, baseline: height * 0.5, lines: 16, frequency: 2.05 };
      }
      if (width < 480) {
        return { amplitude: height * 0.3, baseline: height * 0.52, lines: 18, frequency: 1.72 };
      }
      if (width < 900) {
        return { amplitude: height * 0.27, baseline: height * 0.51, lines: 20, frequency: 1.55 };
      }
      return { amplitude: height * 0.24, baseline: height * 0.5, lines: 22, frequency: 1.38 };
    }

    function drawWave() {
      const profile = waveProfile();
      context.clearRect(0, 0, width, height);
      context.lineCap = 'round';
      context.lineJoin = 'round';

      for (let line = 0; line < profile.lines; line += 1) {
        const normalizedLine = profile.lines === 1 ? 0 : line / (profile.lines - 1);
        const centeredLine = normalizedLine - 0.5;
        const linePhase = phase + centeredLine * 1.6;
        const alpha = 0.14 + (1 - Math.abs(centeredLine) * 1.45) * 0.54;

        context.beginPath();
        for (let x = -10; x <= width + 10; x += 10) {
          const progress = x / width;
          const envelope = Math.pow(Math.max(0, Math.sin(progress * Math.PI)), 1.15);
          const primary = Math.sin(progress * Math.PI * 2 * profile.frequency + linePhase);
          const detail = Math.sin(progress * Math.PI * 5.1 - phase * 0.6 + centeredLine * 2.4);
          const spread = centeredLine * profile.amplitude * 0.75 * envelope;
          const y = profile.baseline
            + spread
            + envelope * profile.amplitude * (primary * 0.62 + detail * 0.11);

          if (x === -10) context.moveTo(x, y);
          else context.lineTo(x, y);
        }

        context.strokeStyle = `rgba(0, 0, 0, ${Math.max(0.08, alpha)})`;
        context.lineWidth = line === 0 || line === profile.lines - 1 ? 1.8 : 1.05;
        context.stroke();
      }
    }

    function renderStill(state) {
      sizeCanvas();
      drawWave();
      canvas.dataset.waveState = state;
    }

    function updateMotionState() {
      if (reducedMotion.matches) {
        renderStill('reduced');
        return;
      }
      canvas.dataset.waveState = document.hidden ? 'paused' : 'running';
    }

    function handleVisibilityChange() {
      updateMotionState();
    }

    function handleMotionChange() {
      updateMotionState();
    }

    function handleResize() {
      if (resizeFrameId) return;
      resizeFrameId = window.requestAnimationFrame(() => {
        resizeFrameId = 0;
        sizeCanvas();
        drawWave();
      });
    }

    sizeCanvas();
    drawWave();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('resize', handleResize, { passive: true });
    reducedMotion.addEventListener('change', handleMotionChange);
    updateMotionState();
  } catch {
    canvas.dataset.waveState = 'unsupported';
  }
})();
