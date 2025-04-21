import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MapPin, Home, Map as MapIcon, FileBarChart } from "lucide-react";
import MainLayout from "@/components/MainLayout";

export default function NotFound() {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 flex flex-col items-center text-center">
        <div className="w-24 h-24 rounded-full border-8 border-primary/20 flex items-center justify-center mb-6 relative">
          <MapPin className="w-10 h-10 text-primary" />
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-destructive rounded-full flex items-center justify-center text-white text-sm font-medium">?</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">Field Not Found</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-md">
          We couldn't locate the crop data you're looking for. It may have been moved or doesn't exist.
        </p>

        <div className="space-y-4 w-full max-w-md">
          <div className="bg-accent/30 p-5 rounded-lg mb-6">
            <p className="text-muted-foreground text-sm">
              Need assistance finding agricultural data? Try exploring our map interface or uploading your own field data.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="flex-1 gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                Return Home
              </Link>
            </Button>
            <Button asChild variant="outline" className="flex-1 gap-2">
              <Link href="/map">
                <MapIcon className="w-4 h-4" />
                Explore Map
              </Link>
            </Button>
          </div>

          <Button asChild variant="ghost" className="gap-2 mt-4">
            <Link href="/reports">
              <FileBarChart className="w-4 h-4" />
              Generate Reports
            </Link>
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
