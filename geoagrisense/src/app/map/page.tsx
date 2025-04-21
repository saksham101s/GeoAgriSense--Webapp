"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Layers,
  MapPin,
  Filter,
  Download,
  Thermometer,
  Droplets,
  Leaf,
  Info
} from "lucide-react";
import MainLayout from "@/components/MainLayout";

export default function MapPage() {
  // State for filters
  const [selectedYear, setSelectedYear] = useState("2023");
  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [selectedRegion, setSelectedRegion] = useState("global");
  const [selectedLayer, setSelectedLayer] = useState("temperature");

  // Data layers - these would be dynamic in a real app
  const layers = [
    { id: "temperature", name: "Temperature Anomalies", icon: <Thermometer className="w-4 h-4" /> },
    { id: "precipitation", name: "Rainfall Patterns", icon: <Droplets className="w-4 h-4" /> },
    { id: "crop-yield", name: "Crop Yield Changes", icon: <Leaf className="w-4 h-4" /> },
  ];

  const years = ["2018", "2019", "2020", "2021", "2022", "2023"];
  const crops = ["wheat", "rice", "maize", "soybeans", "cotton"];
  const regions = ["global", "north-america", "south-america", "europe", "africa", "asia", "oceania"];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Interactive Map Analysis</h1>
            <p className="text-muted-foreground">
              Explore climate data layers with customizable filters to understand agricultural impacts.
            </p>
          </div>

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar with Filters */}
            <div className="lg:col-span-1 space-y-6">
              {/* Filter Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Filters</CardTitle>
                    <Filter className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardDescription>Customize map view</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Year Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <Select
                      value={selectedYear}
                      onValueChange={setSelectedYear}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year}>{year}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Crop Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Crop Type</label>
                    <Select
                      value={selectedCrop}
                      onValueChange={setSelectedCrop}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent>
                        {crops.map(crop => (
                          <SelectItem key={crop} value={crop}>
                            {crop.charAt(0).toUpperCase() + crop.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Region Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Region</label>
                    <Select
                      value={selectedRegion}
                      onValueChange={setSelectedRegion}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Region" />
                      </SelectTrigger>
                      <SelectContent>
                        {regions.map(region => (
                          <SelectItem key={region} value={region}>
                            {region === "global" ? "Global" :
                              region.split('-').map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                              ).join(' ')
                            }
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Data Layers Card */}
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Data Layers</CardTitle>
                    <Layers className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <CardDescription>Choose visualization layers</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="temperature" value={selectedLayer} onValueChange={setSelectedLayer}>
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="temperature">Temp</TabsTrigger>
                      <TabsTrigger value="precipitation">Rain</TabsTrigger>
                      <TabsTrigger value="crop-yield">Yield</TabsTrigger>
                    </TabsList>

                    <div className="mt-4 space-y-4">
                      {/* Layer Opacity */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <label className="text-sm font-medium">Layer Opacity</label>
                          <span className="text-sm text-muted-foreground">75%</span>
                        </div>
                        <Slider defaultValue={[75]} max={100} step={5} />
                      </div>

                      {/* Layer Info */}
                      <div className="bg-accent/40 rounded-md p-3 text-sm flex items-start gap-2">
                        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <div>
                          {selectedLayer === "temperature" && "Temperature anomalies shown as deviation from the 1951-1980 baseline."}
                          {selectedLayer === "precipitation" && "Precipitation patterns showing deviation from historical averages."}
                          {selectedLayer === "crop-yield" && "Crop yield projections compared to previous 5-year average."}
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="pt-2">
                        <p className="text-sm font-medium mb-2">Legend</p>
                        <div className="space-y-1">
                          {selectedLayer === "temperature" && (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#053061]" />
                                <span className="text-xs">-3.0°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#4393c3]" />
                                <span className="text-xs">-1.5°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#e6f598]" />
                                <span className="text-xs">0°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#f46d43]" />
                                <span className="text-xs">+1.5°C</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#9e0142]" />
                                <span className="text-xs">+3.0°C</span>
                              </div>
                            </>
                          )}

                          {selectedLayer === "precipitation" && (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#a6611a]" />
                                <span className="text-xs">-50%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#dfc27d]" />
                                <span className="text-xs">-25%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#f5f5f5]" />
                                <span className="text-xs">Normal</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#80cdc1]" />
                                <span className="text-xs">+25%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#018571]" />
                                <span className="text-xs">+50%</span>
                              </div>
                            </>
                          )}

                          {selectedLayer === "crop-yield" && (
                            <>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#a50026]" />
                                <span className="text-xs">-30%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#f46d43]" />
                                <span className="text-xs">-15%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#ffffbf]" />
                                <span className="text-xs">No change</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#74add1]" />
                                <span className="text-xs">+15%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-sm bg-[#313695]" />
                                <span className="text-xs">+30%</span>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Buttons */}
              <div className="space-y-2">
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Export Map Data
                </Button>
                <Button variant="outline" className="w-full flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Set Custom Location
                </Button>
              </div>
            </div>

            {/* Map Area */}
            <div className="lg:col-span-3">
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle>
                        {selectedLayer === "temperature" && "Temperature Anomalies"}
                        {selectedLayer === "precipitation" && "Precipitation Patterns"}
                        {selectedLayer === "crop-yield" && "Crop Yield Changes"}
                      </CardTitle>
                      <CardDescription>
                        {selectedYear} | {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} |
                        {selectedRegion === "global" ? " Global" :
                          ` ${selectedRegion.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}`
                        }
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      {layers.map(layer => (
                        <Button
                          key={layer.id}
                          variant={selectedLayer === layer.id ? "default" : "ghost"}
                          size="sm"
                          onClick={() => setSelectedLayer(layer.id)}
                          className="flex items-center gap-1"
                        >
                          {layer.icon}
                          <span className="hidden sm:inline">{layer.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Map Container */}
                  <div className="map-container relative bg-muted flex items-center justify-center">
                    <div className="text-center p-8">
                      <p className="text-muted-foreground mb-4">Interactive map will be loaded here with Mapbox or Leaflet</p>
                      <div className="text-sm text-muted-foreground">
                        <p>Selected filters:</p>
                        <p>Year: {selectedYear} | Crop: {selectedCrop} | Region: {selectedRegion}</p>
                        <p>Layer: {selectedLayer}</p>
                      </div>
                    </div>

                    {/* Attribution (would be provided by map library) */}
                    <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                      Map data © GeoAgriSense
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Data Insights */}
          <Card>
            <CardHeader>
              <CardTitle>Data Insights for {selectedCrop.charAt(0).toUpperCase() + selectedCrop.slice(1)} in {selectedYear}</CardTitle>
              <CardDescription>
                Based on selected map filters and climate projections
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Thermometer className="w-5 h-5 text-chart-1" />
                    Temperature Impact
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    The average temperature increase of 1.5°C has extended growing seasons in northern regions
                    but reduced yields in tropical areas due to heat stress during flowering stages.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-chart-2" />
                    Precipitation Patterns
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Rainfall variability has increased by 14%, with more intense rain events punctuated by
                    longer dry periods, presenting challenges for traditional irrigation systems.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Leaf className="w-5 h-5 text-chart-4" />
                    Yield Projections
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Global {selectedCrop} yields are projected to decrease by 7.4% by 2030 if current climate trends continue.
                    Regional adaptation strategies could mitigate up to 60% of these losses.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
