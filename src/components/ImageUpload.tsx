import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  hasImage: boolean;
}

const ImageUpload = ({ onImageUpload, hasImage }: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onImageUpload(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="p-6 bg-card border-canvas-border">
      <div className="text-center space-y-4">
        {!hasImage ? (
          <>
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
              <ImageIcon className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-card-foreground">
                Upload Reference Image
              </h3>
              <p className="text-muted-foreground text-sm mt-1">
                Choose an image to start drawing with grid overlay
              </p>
            </div>
          </>
        ) : (
          <div className="w-12 h-12 mx-auto rounded-full bg-secondary flex items-center justify-center">
            <Upload className="w-6 h-6 text-secondary-foreground" />
          </div>
        )}
        
        <Button 
          onClick={handleButtonClick}
          className="bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium px-6 py-2 transition-opacity"
        >
          <Upload className="w-4 h-4 mr-2" />
          {hasImage ? 'Change Image' : 'Select Image'}
        </Button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <p className="text-xs text-muted-foreground">
          Supports JPG, PNG, GIF, WebP formats
        </p>
      </div>
    </Card>
  );
};

export default ImageUpload;