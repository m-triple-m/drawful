import React, { useRef, useEffect, useState } from 'react';

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    setContext(ctx);
  }, []);

  const startDrawing = (e) => {
    context.beginPath();
    context.moveTo(e.clientX, e.clientY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    context.lineTo(e.clientX, e.clientY);
    context.stroke();
  };

  const stopDrawing = () => {
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      style={{ border: '1px solid black', cursor: 'url("/pencil-cursor.png"), auto' }}
    />
  );
};

export default Canvas;