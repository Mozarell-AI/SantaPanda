
export const CANVAS_WIDTH = 240;
export const CANVAS_HEIGHT = 320;

export const drawRoomBase = (ctx: CanvasRenderingContext2D) => {
  // Walls
  ctx.fillStyle = '#4a4157'; // Dark purple-grey
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  
  // Floor
  ctx.fillStyle = '#6d5e75'; // Lighter floor
  ctx.fillRect(0, 200, CANVAS_WIDTH, CANVAS_HEIGHT - 200);

  // Window
  ctx.fillStyle = '#2d2436';
  ctx.fillRect(40, 40, 60, 80);
  ctx.fillStyle = '#8b9bb4'; // Glass
  ctx.fillRect(45, 45, 50, 70);
  // Window Frame
  ctx.fillStyle = '#4a4157';
  ctx.fillRect(68, 45, 4, 70);
  ctx.fillRect(45, 75, 50, 4);

  // Rug
  ctx.fillStyle = '#8f5e5e';
  ctx.fillRect(80, 240, 80, 40);
};

export const drawPictureFrame = (ctx: CanvasRenderingContext2D, nightNumber: number = 0) => {
  // Frame position: Wall to the right of the window (Window ends at x=100)
  const x = 130;
  const y = 50;
  const w = 40;
  const h = 50;

  // Frame Border
  ctx.fillStyle = '#3e2723'; // Dark Wood
  ctx.fillRect(x, y, w, h);
  
  // Canvas/Paper inside
  ctx.fillStyle = '#efebe9';
  ctx.fillRect(x + 2, y + 2, w - 4, h - 4);

  // "Picture" Content - simplistic placeholder that changes color/shape per night
  // This allows the user to see "different pictures" visually for now
  ctx.save();
  ctx.translate(x + w/2, y + h/2);
  
  // Seedable pseudo-random art based on nightNumber
  const artColor = `hsl(${(nightNumber * 40) % 360}, 60%, 60%)`;
  ctx.fillStyle = artColor;
  
  if (nightNumber % 3 === 0) {
      // Circle art
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
  } else if (nightNumber % 3 === 1) {
      // Rect art
      ctx.fillRect(-8, -8, 16, 16);
  } else {
      // Abstract line
      ctx.strokeStyle = artColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, 10);
      ctx.lineTo(10, -10);
      ctx.stroke();
  }
  
  ctx.restore();
};

export const drawProp = (ctx: CanvasRenderingContext2D, type: string, x: number, y: number, time: number) => {
  ctx.save();
  ctx.translate(x, y);

  if (type === 'bed') {
    // Headboard
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(0, -20, 80, 20);
    // Mattress
    ctx.fillStyle = '#d7ccc8';
    ctx.fillRect(0, 0, 80, 15);
    // Blanket body (base)
    ctx.fillStyle = '#5d4037';
    ctx.fillRect(0, 15, 80, 40);
  }

  if (type === 'sax' || type === 'sax_active') {
     // Gold color
     ctx.fillStyle = '#ffd700';
     // Shape
     ctx.beginPath();
     ctx.moveTo(0, 0);
     ctx.lineTo(10, 20);
     ctx.lineTo(5, 30);
     ctx.lineTo(15, 25);
     ctx.fill();
     // Glow if active
     if (type === 'sax_active') {
       ctx.shadowColor = 'orange';
       ctx.shadowBlur = 10;
       ctx.fillStyle = '#fff9c4';
       ctx.fillRect(2, -5 + Math.sin(time / 200) * 2, 4, 4); // Floating note
       ctx.shadowBlur = 0;
     }
  }

  if (type === 'panda') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(10, 10, 8, 0, Math.PI * 2); // Head
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(6, 6, 3, 0, Math.PI * 2); // Ear L
    ctx.arc(14, 6, 3, 0, Math.PI * 2); // Ear R
    ctx.arc(8, 10, 2, 0, Math.PI * 2); // Eye L
    ctx.arc(12, 10, 2, 0, Math.PI * 2); // Eye R
    ctx.fill();
    // Body
    ctx.fillRect(5, 15, 10, 10);
  }

  if (type === 'panda_xmas') {
      // Two pandas hugging in sweaters
      // Panda 1 (Left)
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.fill(); // Head
      ctx.fillStyle = '#000'; 
      ctx.beginPath(); ctx.arc(-4, -4, 3, 0, Math.PI*2); ctx.fill(); // Ear
      ctx.beginPath(); ctx.arc(4, -4, 3, 0, Math.PI*2); ctx.fill(); // Ear
      ctx.beginPath(); ctx.arc(-2, 0, 2, 0, Math.PI*2); ctx.fill(); // Eye
      ctx.beginPath(); ctx.arc(2, 0, 2, 0, Math.PI*2); ctx.fill(); // Eye
      
      // Sweater Red
      ctx.fillStyle = '#d32f2f';
      ctx.fillRect(-6, 6, 12, 14);
      
      // Panda 2 (Right)
      ctx.translate(12, 0);
      ctx.fillStyle = '#ffffff';
      ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI*2); ctx.fill(); // Head
      ctx.fillStyle = '#000'; 
      ctx.beginPath(); ctx.arc(-4, -4, 3, 0, Math.PI*2); ctx.fill(); // Ear
      ctx.beginPath(); ctx.arc(4, -4, 3, 0, Math.PI*2); ctx.fill(); // Ear
      ctx.beginPath(); ctx.arc(-2, 0, 2, 0, Math.PI*2); ctx.fill(); // Eye
      ctx.beginPath(); ctx.arc(2, 0, 2, 0, Math.PI*2); ctx.fill(); // Eye

      // Sweater Green
      ctx.fillStyle = '#388e3c';
      ctx.fillRect(-6, 6, 12, 14);

      // Scarf connecting them
      ctx.fillStyle = '#fbc02d';
      ctx.fillRect(-12, 6, 14, 4);
  }

  if (type === 'clock') {
    ctx.fillStyle = '#5d4037';
    ctx.beginPath();
    ctx.arc(10, 10, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(10, 10, 9, 0, Math.PI * 2);
    ctx.fill();
    // Hands
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(10, 10);
    const angle = (time / 1000) % (Math.PI * 2);
    ctx.lineTo(10 + Math.sin(angle) * 7, 10 - Math.cos(angle) * 7);
    ctx.stroke();
  }

  if (type === 'mug') {
    ctx.fillStyle = '#e57373';
    ctx.fillRect(0, 0, 10, 12);
    ctx.strokeStyle = '#e57373';
    ctx.lineWidth = 2;
    ctx.strokeRect(8, 2, 4, 6); // Handle
    // Steam
    ctx.fillStyle = 'rgba(255,255,255,0.5)';
    ctx.fillRect(2, -5 - Math.sin(time / 300) * 2, 2, 4);
    ctx.fillRect(6, -8 - Math.sin(time / 300 + 1) * 2, 2, 4);
  }

  if (type === 'lamp') {
    ctx.fillStyle = '#fbc02d'; // Shade
    ctx.beginPath();
    ctx.moveTo(0, 10);
    ctx.lineTo(20, 10);
    ctx.lineTo(15, 0);
    ctx.lineTo(5, 0);
    ctx.fill();
    // Stand
    ctx.fillStyle = '#3e2723';
    ctx.fillRect(9, 10, 2, 10);
    // Light
    ctx.fillStyle = `rgba(255, 235, 59, ${0.2 + Math.random() * 0.1})`;
    ctx.beginPath();
    ctx.arc(10, 20, 25, 0, Math.PI * 2);
    ctx.fill();
  }

  if (type === 'cake') {
    ctx.fillStyle = '#8d6e63'; // Chocolate
    ctx.fillRect(0, 5, 15, 10);
    ctx.fillStyle = '#f48fb1'; // Frosting
    ctx.fillRect(0, 5, 15, 3);
    // Candle
    ctx.fillStyle = '#ef5350';
    ctx.fillRect(6, 0, 3, 5);
    ctx.fillStyle = '#ffeb3b';
    ctx.fillRect(6, -2, 3, 2);
  }

  ctx.restore();
};

export const drawCharacter = (ctx: CanvasRenderingContext2D, id: 'guy' | 'girl', x: number, y: number, pose: string, time: number) => {
  ctx.save();
  ctx.translate(x, y);

  // Breathing animation
  const breathe = Math.sin(time / 500) * 2;

  if (pose === 'under_blanket') {
     // Just heads
     if (id === 'guy') {
       ctx.fillStyle = '#ef9a9a'; // Skin
       ctx.fillRect(0, 0, 14, 14);
       ctx.fillStyle = '#3e2723'; // Hair
       ctx.fillRect(0, 0, 14, 4);
     } else {
       ctx.fillStyle = '#ffe0b2'; // Skin
       ctx.fillRect(0, 0, 14, 14);
       ctx.fillStyle = '#212121'; // Hair (Black Bob)
       ctx.fillRect(-2, -2, 18, 12);
       ctx.fillRect(-2, 0, 4, 16); // Sides
       ctx.fillRect(12, 0, 4, 16);
     }
     // Blanket over them
     ctx.fillStyle = '#5d4037';
     ctx.fillRect(-10, 12, 40, 20);
  } else {
    // Full body sitting
    const bodyY = 14 + breathe;
    
    // Head
    if (id === 'guy') {
      ctx.fillStyle = '#ef9a9a'; // Skin
      ctx.fillRect(0, breathe, 14, 14);
      ctx.fillStyle = '#3e2723'; // Hair
      ctx.fillRect(0, breathe, 14, 4);
      // Shirt
      ctx.fillStyle = '#4db6ac'; // Teal shirt
      ctx.fillRect(-3, bodyY, 20, 25);
    } else {
      ctx.fillStyle = '#ffe0b2'; // Skin
      ctx.fillRect(0, breathe, 14, 14);
      // Hair (Bob)
      ctx.fillStyle = '#212121'; 
      ctx.fillRect(-2, breathe - 2, 18, 12); // Top
      ctx.fillRect(-2, breathe, 4, 16); // Left
      ctx.fillRect(12, breathe, 4, 16); // Right
      // Dress/Sweater
      ctx.fillStyle = '#ec407a'; // Pink
      ctx.fillRect(-3, bodyY, 20, 25);
    }
    
    // Legs (Sitting)
    ctx.fillStyle = '#3e2723'; // Pants/Leggings
    ctx.fillRect(-3, bodyY + 25, 8, 20); // Leg L
    ctx.fillRect(9, bodyY + 25, 8, 20); // Leg R
  }

  ctx.restore();
};

export const drawOverlay = (ctx: CanvasRenderingContext2D, type: string, time: number) => {
  if (type === 'rain') {
    ctx.save();
    // Restrict rain to window glass area
    ctx.beginPath();
    ctx.rect(45, 45, 50, 70);
    ctx.clip();
    
    ctx.fillStyle = 'rgba(100, 149, 237, 0.4)';
    for(let i=0; i<20; i++) {
        const rx = 45 + (i * 13 + time * 0.1) % 50; 
        const ry = 45 + (i * 7 + time * 0.2) % 70;
        ctx.fillRect(rx, ry, 1, 4);
    }
    // Blue tint on glass
    ctx.fillStyle = 'rgba(0, 10, 30, 0.2)';
    ctx.fillRect(45, 45, 50, 70);
    
    ctx.restore();
  }

  if (type === 'confetti') {
    for(let i=0; i<30; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#ffeb3b' : '#ff4081';
        const cx = (i * 17 + Math.sin(time / 500) * 20) % CANVAS_WIDTH;
        const cy = (i * 13 + time * 0.05) % CANVAS_HEIGHT;
        ctx.fillRect(cx, cy, 2, 2);
    }
  }

  if (type === 'kitchen') {
    // Darken bottom
    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(0, 100, CANVAS_WIDTH, CANVAS_HEIGHT - 100);

    // Draw Kitchen Slice at Top
    ctx.save();
    // Clip top area
    ctx.beginPath();
    ctx.rect(0, 0, CANVAS_WIDTH, 100);
    ctx.clip();

    // Floor
    ctx.fillStyle = '#fff9c4'; 
    ctx.fillRect(0, 0, CANVAS_WIDTH, 100);

    // Fridge
    ctx.fillStyle = '#eeeeee';
    ctx.fillRect(180, 20, 50, 80);
    // Fridge Light Flicker
    if (Math.floor(time / 200) % 20 > 15) {
       ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
       ctx.fillRect(180, 20, 50, 80);
    }

    // Legs Walking
    const walkX = 120 + Math.sin(time / 500) * 40;
    ctx.fillStyle = '#424242'; // Pants
    
    // Leg 1
    const leg1Y = Math.sin(time / 100) * 5;
    ctx.fillRect(walkX, 40 + leg1Y, 10, 60);
    
    // Leg 2
    const leg2Y = Math.cos(time / 100) * 5;
    ctx.fillRect(walkX + 15, 40 + leg2Y, 10, 60);

    ctx.restore();
    
    // Separator Line
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(CANVAS_WIDTH, 100);
    ctx.stroke();
  }
};
