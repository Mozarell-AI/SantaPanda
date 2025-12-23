
import React, { useRef, useEffect } from 'react';
import { SceneData } from '../types';
import { 
  drawRoomBase, 
  drawProp, 
  drawCharacter, 
  drawOverlay, 
  drawPictureFrame,
  CANVAS_WIDTH, 
  CANVAS_HEIGHT 
} from '../services/spriteService';

interface GameCanvasProps {
  scene: SceneData;
  isTransitioning: boolean;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ scene, isTransitioning }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Critical for pixel art look
    ctx.imageSmoothingEnabled = false;

    let animationFrameId: number;
    let startTime = Date.now();

    const render = () => {
      const currentTime = Date.now() - startTime;

      // Clear
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (scene.type === 'splash') {
         ctx.fillStyle = '#f8bbd0'; // Pink bg
         ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
         
         // Big Pandas Hug
         ctx.fillStyle = '#fff';
         ctx.beginPath();
         ctx.arc(CANVAS_WIDTH/2 - 20, CANVAS_HEIGHT/2, 40, 0, Math.PI*2);
         ctx.fill();
         ctx.beginPath();
         ctx.arc(CANVAS_WIDTH/2 + 20, CANVAS_HEIGHT/2, 40, 0, Math.PI*2);
         ctx.fill();
         
         // Eyes
         ctx.fillStyle = '#000';
         ctx.beginPath();
         ctx.arc(CANVAS_WIDTH/2 - 30, CANVAS_HEIGHT/2, 5, 0, Math.PI*2);
         ctx.arc(CANVAS_WIDTH/2 + 30, CANVAS_HEIGHT/2, 5, 0, Math.PI*2);
         ctx.fill();

         ctx.fillStyle = '#333';
         ctx.font = '16px "Press Start 2P"';
         ctx.textAlign = 'center';
         ctx.fillText("Pixel Panda", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 70);
         ctx.font = '10px "Press Start 2P"';
         ctx.fillText("9 Nights", CANVAS_WIDTH/2, CANVAS_HEIGHT/2 + 90);

      } else if (scene.type === 'night') {
        // 1. Base Room
        drawRoomBase(ctx);

        // 1.5 Wall Decor (Picture Frame)
        drawPictureFrame(ctx, scene.nightNumber || 0);

        // 2. Props (Back Layer)
        scene.props.forEach(prop => {
          if (prop.layer === 'back') {
            drawProp(ctx, prop.type, prop.x, prop.y, currentTime);
          }
        });

        // 3. Characters
        scene.characters.forEach(char => {
          drawCharacter(ctx, char.id, char.x, char.y, char.pose, currentTime);
        });

        // 4. Props (Front Layer)
        scene.props.forEach(prop => {
          if (prop.layer === 'front') {
            drawProp(ctx, prop.type, prop.x, prop.y, currentTime);
          }
        });

        // 5. Overlay
        if (scene.overlay) {
          drawOverlay(ctx, scene.overlay, currentTime);
        }
      }

      // Transition Fade
      if (isTransitioning) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [scene, isTransitioning]);

  return (
    <canvas 
      ref={canvasRef} 
      width={CANVAS_WIDTH} 
      height={CANVAS_HEIGHT}
      className="w-full h-auto shadow-2xl rounded-sm border-4 border-gray-800 bg-black cursor-pointer"
      style={{ imageRendering: 'pixelated' }} 
    />
  );
};

export default GameCanvas;
