import { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "@/components/ui/card";
import { HeroSection } from "@/components/ui/hero-section";
import { Camera, Play } from "lucide-react";
import heroImage from "@/assets/hero-students.jpg";

interface GalleryItem {
  id: number;
  title: string;
  description: string;
  photo: string;
  createdAt: string;
}

export default function Gallery() {
  const [galleryData, setGalleryData] = useState<GalleryItem[]>([]);

  const getAllGalleryDataApi = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/gallery");      
      // Access galleryData array from response
      setGalleryData(res.data.galleryData);
    } catch (error) {
      console.error("Error fetching gallery data:", error);
    }
  };

  useEffect(() => {
    getAllGalleryDataApi();
  }, []);

  return (
    <div className="pt-16">
      <HeroSection
        subtitle="School Gallery"
        title="Capturing Moments of Excellence"
        description="Explore the vibrant life at Siddhartha School through our collection of photos showcasing academic achievements, campus life, and memorable events."
        backgroundImage={heroImage}
        height="md"
      />

      {/* Gallery Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Gallery</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Latest moments and highlights from our school.
            </p>
          </div>

          {galleryData.length === 0 ? (
            <p className="text-center text-muted-foreground">Loading gallery...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {galleryData.map((item) => (
                <Card
                  key={item.id}
                  className="overflow-hidden shadow-card hover:shadow-elegant transition-smooth cursor-pointer group"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={item.photo}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                      <Camera className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold mb-1">{item.title}</h4>
                    <p className="text-muted-foreground text-xs">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">School Video Tour</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Take a virtual tour of our campus and see what makes Siddhartha School special.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-elegant">
              <div className="relative aspect-video bg-muted flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary flex items-center justify-center">
                    <Play className="w-10 h-10 text-white ml-1" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Campus Virtual Tour</h3>
                  <p className="text-muted-foreground">Click to watch our school tour video</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
