import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  Grid3X3, 
  Palette, 
  Eye, 
  Lightbulb, 
  Target,
  Layers,
  MousePointer
} from 'lucide-react';

const Manual = () => {
  const steps = [
    {
      icon: Upload,
      title: "Upload Your Reference",
      description: "Click 'Select Image' to upload your reference photo (JPG, PNG, GIF, WebP)",
      tips: ["High-resolution images work best", "Portrait or landscape both supported"]
    },
    {
      icon: Grid3X3,
      title: "Adjust Grid Settings",
      description: "Customize the grid overlay to match your drawing needs",
      tips: ["Start with 8x8 for beginners", "Use more grids (12-16) for detailed work"]
    },
    {
      icon: Eye,
      title: "Toggle Black & White",
      description: "Switch to grayscale mode to better see values and contrast",
      tips: ["B&W mode helps focus on light/shadow", "Great for value studies"]
    },
    {
      icon: Palette,
      title: "Choose Grid Color",
      description: "Select a grid color that contrasts well with your image",
      tips: ["White grid for dark images", "Black grid for light images", "Colored grids for special effects"]
    }
  ];

  const techniques = [
    {
      icon: Target,
      title: "Grid Method Basics",
      description: "Draw corresponding grid on your paper, then copy each square one by one"
    },
    {
      icon: Layers,
      title: "Proportion Check",
      description: "Use grid lines to measure distances and check proportions accurately"
    },
    {
      icon: MousePointer,
      title: "Detail Focus",
      description: "Focus on one grid square at a time to avoid being overwhelmed"
    }
  ];

  return (
    <div className="space-y-8">
      <Card className="p-8 bg-card border-canvas-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-primary flex items-center justify-center mb-4">
            <Lightbulb className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-card-foreground mb-2">
            How to Use Artist Grid Tool
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Master the grid drawing method used by professional artists for accurate proportions and detailed artwork
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-xl bg-secondary flex items-center justify-center">
                <step.icon className="w-6 h-6 text-secondary-foreground" />
              </div>
              <Badge variant="outline" className="text-xs">
                Step {index + 1}
              </Badge>
              <h3 className="font-semibold text-card-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
              <div className="space-y-1">
                {step.tips.map((tip, tipIndex) => (
                  <p key={tipIndex} className="text-xs text-accent italic">
                    💡 {tip}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <h3 className="text-lg font-semibold text-card-foreground mb-4 text-center">
            Drawing Techniques
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {techniques.map((technique, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                  <technique.icon className="w-4 h-4 text-accent-foreground" />
                </div>
                <div>
                  <h4 className="font-medium text-card-foreground text-sm">{technique.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">{technique.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 rounded-lg bg-gradient-accent/10 border border-accent/20">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-accent-warm flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-3 h-3 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground text-sm mb-2">Pro Tips</h4>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>• Start with simple subjects before attempting complex portraits</li>
                <li>• Use a lighter grid (less opacity) once you're more confident</li>
                <li>• Practice measuring without the grid occasionally to improve your natural eye</li>
                <li>• Save different grid settings for different types of artwork</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Manual;