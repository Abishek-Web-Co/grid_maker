import { useState } from 'react';
import { toast } from 'sonner';
import ImageUpload from '@/components/ImageUpload';
import GridCanvas from '@/components/GridCanvas';
import ControlPanel from '@/components/ControlPanel';
import Manual from '@/components/Manual';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Brush, Sparkles } from 'lucide-react';

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [gridSize, setGridSize] = useState(8);
  const [gridColor, setGridColor] = useState('#ffffff');
  const [gridWidth, setGridWidth] = useState(2);

  const handleImageUpload = (file: File) => {
    const img = new Image();
    img.onload = () => {
      setUploadedImage(img);
      toast.success('Image uploaded successfully!');
    };
    img.onerror = () => {
      toast.error('Failed to load image. Please try another file.');
    };
    img.src = URL.createObjectURL(file);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="py-8 px-4 text-center border-b border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center">
              <Brush className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Artist Grid Tool
            </h1>
            <Badge variant="secondary" className="hidden sm:flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Pro Drawing Reference
            </Badge>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Perfect your proportions with professional grid overlay. Upload any image, customize your grid, 
            and create accurate drawings with the time-tested grid method.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Left Panel - Upload & Controls */}
          <div className="lg:col-span-1 space-y-6">
            <ImageUpload 
              onImageUpload={handleImageUpload} 
              hasImage={!!uploadedImage}
            />
            <ControlPanel
              isGrayscale={isGrayscale}
              onGrayscaleToggle={setIsGrayscale}
              gridSize={gridSize}
              onGridSizeChange={setGridSize}
              gridColor={gridColor}
              onGridColorChange={setGridColor}
              gridWidth={gridWidth}
              onGridWidthChange={setGridWidth}
            />
          </div>

          {/* Main Canvas Area */}
          <div className="lg:col-span-3">
            <GridCanvas
              image={uploadedImage}
              isGrayscale={isGrayscale}
              gridSize={gridSize}
              gridColor={gridColor}
              gridWidth={gridWidth}
            />
          </div>
        </div>

        {/* Manual Section */}
        <div className="mt-16">
          <Separator className="mb-8" />
          <Manual />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-4 text-center border-t border-border/50 mt-16">
        <p className="text-sm text-muted-foreground">
          Created for artists, by artists. Master the grid method and improve your drawing accuracy.
        </p>
      </footer>
    </div>
  );
};

export default Index;