import { useRef, useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ruler, Download } from 'lucide-react';

interface GridCanvasProps {
  image: HTMLImageElement | null;
  isGrayscale: boolean;
  gridSize: number;
  gridColor: string;
  gridWidth: number;
}

const GridCanvas = ({ image, isGrayscale, gridSize, gridColor, gridWidth }: GridCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasSize] = useState({ width: 800, height: 600 });
  const [gridDimensions, setGridDimensions] = useState({
    cellWidth: 0,
    cellHeight: 0,
    displayWidth: 0,
    displayHeight: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (image) {
      // Calculate dimensions to maintain aspect ratio
      const containerWidth = 800;
      const containerHeight = 600;
      const imageAspectRatio = image.width / image.height;
      const containerAspectRatio = containerWidth / containerHeight;

      let drawWidth, drawHeight;

      if (imageAspectRatio > containerAspectRatio) {
        drawWidth = containerWidth;
        drawHeight = containerWidth / imageAspectRatio;
      } else {
        drawHeight = containerHeight;
        drawWidth = containerHeight * imageAspectRatio;
      }

      const offsetX = (containerWidth - drawWidth) / 2;
      const offsetY = (containerHeight - drawHeight) / 2;

      // Calculate grid cell dimensions
      const cellWidth = drawWidth / gridSize;
      const cellHeight = drawHeight / gridSize;

      // Convert pixels to centimeters (96 DPI standard: 1 pixel = 0.0264583 cm)
      const pixelToCm = 0.0264583;
      const cellWidthCm = cellWidth * pixelToCm;
      const cellHeightCm = cellHeight * pixelToCm;
      const displayWidthCm = drawWidth * pixelToCm;
      const displayHeightCm = drawHeight * pixelToCm;

      // Update grid dimensions state
      setGridDimensions({
        cellWidth: Math.round(cellWidthCm * 10) / 10,
        cellHeight: Math.round(cellHeightCm * 10) / 10,
        displayWidth: Math.round(displayWidthCm * 10) / 10,
        displayHeight: Math.round(displayHeightCm * 10) / 10,
      });

      // Draw image
      ctx.filter = isGrayscale ? 'grayscale(100%)' : 'none';
      ctx.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

      // Reset filter for grid
      ctx.filter = 'none';

      // Draw grid
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = gridWidth;
      ctx.globalAlpha = 0.8;

      // Vertical lines
      for (let i = 0; i <= gridSize; i++) {
        const x = offsetX + i * cellWidth;
        ctx.beginPath();
        ctx.moveTo(x, offsetY);
        ctx.lineTo(x, offsetY + drawHeight);
        ctx.stroke();
      }

      // Horizontal lines
      for (let i = 0; i <= gridSize; i++) {
        const y = offsetY + i * cellHeight;
        ctx.beginPath();
        ctx.moveTo(offsetX, y);
        ctx.lineTo(offsetX + drawWidth, y);
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    } else {
      // Reset grid dimensions when no image
      setGridDimensions({ cellWidth: 0, cellHeight: 0, displayWidth: 0, displayHeight: 0 });

      // Draw placeholder
      ctx.fillStyle = 'hsl(var(--muted))';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'hsl(var(--muted-foreground))';
      ctx.font = '18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Upload an image to start', canvas.width / 2, canvas.height / 2);
    }
  }, [image, isGrayscale, gridSize, gridColor, gridWidth]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;

    const link = document.createElement('a');
    link.download = `grid-drawing-${gridSize}x${gridSize}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-canvas-bg border-canvas-border">
        <div className="flex justify-center">
          <canvas
            ref={canvasRef}
            width={canvasSize.width}
            height={canvasSize.height}
            className="max-w-full h-auto rounded-lg shadow-medium border border-canvas-border"
          />
        </div>
      </Card>

      {/* Grid Dimensions Info */}
      {image && gridDimensions.cellWidth > 0 && (
        <Card className="p-4 bg-card border-canvas-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
              <Ruler className="w-4 h-4 text-accent-foreground" />
            </div>
            <h3 className="font-semibold text-card-foreground">Grid Measurements</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">Cell Width (X-axis)</p>
              <Badge variant="outline" className="w-full justify-center font-mono">
                {gridDimensions.cellWidth} cm
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Cell Height (Y-axis)</p>
              <Badge variant="outline" className="w-full justify-center font-mono">
                {gridDimensions.cellHeight} cm
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Total Width</p>
              <Badge variant="secondary" className="w-full justify-center font-mono">
                {gridDimensions.displayWidth} cm
              </Badge>
            </div>

            <div className="space-y-1">
              <p className="text-muted-foreground">Total Height</p>
              <Badge variant="secondary" className="w-full justify-center font-mono">
                {gridDimensions.displayHeight} cm
              </Badge>
            </div>
          </div>

          <div className="mt-4 p-3 rounded-lg bg-muted/50 border border-border/50">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-card-foreground">💡 Pro Tip:</span> Use these measurements to create a matching {gridSize}×{gridSize} grid on your drawing paper.
              Each cell should be approximately {gridDimensions.cellWidth}×{gridDimensions.cellHeight} cm when drawn.
            </p>
          </div>
        </Card>
      )}

      {/* Download Button */}
      {image && (
        <Card className="p-4 bg-card border-canvas-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Download className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <h3 className="font-semibold text-card-foreground">Export Grid Image</h3>
                <p className="text-sm text-muted-foreground">Download the image with grid overlay</p>
              </div>
            </div>
            <Button
              onClick={handleDownload}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default GridCanvas;
