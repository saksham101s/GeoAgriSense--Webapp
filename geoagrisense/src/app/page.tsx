import Link from "next/link";
import { Leaf, ThermometerSun, Droplets, Map as MapIcon, Upload, FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <Leaf className="w-16 h-16 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Climate &amp; Agriculture <span className="text-primary">Analytics</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Analyze climate change impact on agriculture with advanced geospatial data visualization and AI-powered crop recommendations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2">
              <Link href="/map">
                <MapIcon className="w-5 h-5" />
                Explore Map
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="gap-2">
              <Link href="/upload">
                <Upload className="w-5 h-5" />
                Upload Data
              </Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="gap-2">
              <Link href="/reports">
                <FileBarChart className="w-5 h-5" />
                Generate Report
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Climate Summary Section */}
      <section className="py-16 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Climate Summary</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Current global climate indicators and their impact on agricultural productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Temperature Card */}
            <Card className="dashboard-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Global Temperature</CardTitle>
                  <ThermometerSun className="h-5 w-5 text-chart-1" />
                </div>
                <CardDescription>Anomaly from 1951-1980 average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-chart-1">+1.5°C</span>
                  <span className="text-muted-foreground ml-2 text-sm">↑ 0.2°C from last year</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-chart-1/40 to-chart-1 w-[75%]" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Temperature increase is affecting growing seasons and crop yields in temperate regions.
                </p>
              </CardContent>
            </Card>

            {/* Precipitation Card */}
            <Card className="dashboard-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Precipitation Patterns</CardTitle>
                  <Droplets className="h-5 w-5 text-chart-2" />
                </div>
                <CardDescription>Global rainfall variation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-chart-2">±14%</span>
                  <span className="text-muted-foreground ml-2 text-sm">Increased variability</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-chart-2/40 to-chart-2 w-[65%]" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Unpredictable rainfall patterns are causing drought in some regions and flooding in others.
                </p>
              </CardContent>
            </Card>

            {/* Crop Yield Card */}
            <Card className="dashboard-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">Crop Yield Impact</CardTitle>
                  <Leaf className="h-5 w-5 text-chart-4" />
                </div>
                <CardDescription>Projected global yield changes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline mb-2">
                  <span className="text-4xl font-bold text-chart-4">-7.4%</span>
                  <span className="text-muted-foreground ml-2 text-sm">Projected by 2030</span>
                </div>
                <div className="h-2 bg-muted rounded overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-chart-4/40 to-chart-4 w-[45%]" />
                </div>
                <p className="mt-4 text-sm text-muted-foreground">
                  Major staple crops like wheat, rice, and maize are showing vulnerability to climate shifts.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tools to help you understand and adapt to climate change impact on agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Map Analysis Feature */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-primary/10 p-3 rounded-lg">
                <MapIcon className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Interactive Map Analysis</h3>
                <p className="text-muted-foreground mb-3">
                  Visualize climate data layers including temperature changes, precipitation patterns, and crop yield projections with interactive filters.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/map">Explore Maps</Link>
                </Button>
              </div>
            </div>

            {/* AI Recommendations Feature */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-secondary/50 p-3 rounded-lg">
                <Leaf className="w-8 h-8 text-secondary-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">AI Crop Recommendations</h3>
                <p className="text-muted-foreground mb-3">
                  Get personalized crop suggestions based on your location, soil type, and future climate projections to maximize yield and sustainability.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/recommendations">Get Recommendations</Link>
                </Button>
              </div>
            </div>

            {/* Data Upload Feature */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-accent p-3 rounded-lg">
                <Upload className="w-8 h-8 text-accent-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Custom Data Integration</h3>
                <p className="text-muted-foreground mb-3">
                  Upload your own field data, soil samples, or weather station information to enhance analysis accuracy and get tailored insights.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/upload">Upload Data</Link>
                </Button>
              </div>
            </div>

            {/* Reports Feature */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="bg-muted p-3 rounded-lg">
                <FileBarChart className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Reports</h3>
                <p className="text-muted-foreground mb-3">
                  Generate detailed PDF reports with climate projections, crop recommendations, and adaptive strategies for your specific agricultural needs.
                </p>
                <Button asChild variant="outline" size="sm">
                  <Link href="/reports">Generate Reports</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Adapt to Climate Change?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Start exploring climate data and get AI-powered recommendations for sustainable agriculture.
          </p>
          <Button asChild size="lg">
            <Link href="/map">Start Exploring</Link>
          </Button>
        </div>
      </section>
    </MainLayout>
  );
}
