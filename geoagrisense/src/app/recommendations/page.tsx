"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Leaf, ThermometerSun, Droplets, Wind, Download, Info, CalendarClock, PieChart, Sparkles } from "lucide-react";
import MainLayout from "@/components/MainLayout";

// Form schema
const formSchema = z.object({
  location: z.string().min(2, { message: "Please enter a valid location" }),
  soilType: z.string().min(1, { message: "Please select a soil type" }),
  currentCrop: z.string().optional(),
  landSize: z.string().optional(),
  irrigationType: z.string().optional(),
  farmingStyle: z.string().optional(),
});

// Sample recommendation data (in a real app, this would come from an API)
const cropRecommendations = [
  {
    id: 1,
    crop: "Winter Wheat",
    confidence: 92,
    sustainabilityScore: 85,
    profitPotential: "High",
    waterRequirement: "Medium",
    temperatureTolerance: "Cold-tolerant",
    description: "Winter wheat is well-suited to your soil type and climate projections indicate favorable growing conditions through 2030.",
    rotationSuggestion: "Consider rotating with legumes such as soybeans or field peas to improve soil nitrogen content.",
    adaptationStrategies: ["Early planting to avoid late summer heat stress", "Reduced tillage to conserve soil moisture", "Consider drought-resistant varieties"],
    projectedYield: "4.2-5.1 tons/ha",
    marketTrends: "Stable demand with projected 3% annual price increases"
  },
  {
    id: 2,
    crop: "Barley",
    confidence: 87,
    sustainabilityScore: 82,
    profitPotential: "Medium-High",
    waterRequirement: "Low-Medium",
    temperatureTolerance: "Cold-tolerant",
    description: "Barley's drought tolerance makes it suitable for projected rainfall variability in your region over the next decade.",
    rotationSuggestion: "Excellent in rotation with canola or cereal rye.",
    adaptationStrategies: ["Consider malting varieties for premium pricing", "Implement water conservation techniques", "Monitor for increased pest pressure"],
    projectedYield: "3.5-4.3 tons/ha",
    marketTrends: "Growing craft brewery demand driving premium prices for quality barley"
  },
  {
    id: 3,
    crop: "Canola/Rapeseed",
    confidence: 78,
    sustainabilityScore: 75,
    profitPotential: "High",
    waterRequirement: "Medium",
    temperatureTolerance: "Moderate",
    description: "Canola can perform well in your soil conditions with moderate climate resilience. Increasing temperatures may require adjusted planting dates.",
    rotationSuggestion: "Excellent in rotation with cereals. Avoid planting after other brassica crops.",
    adaptationStrategies: ["Early sowing to avoid flowering during hottest periods", "Monitor for increased insect pressure", "Consider heat-tolerant varieties"],
    projectedYield: "2.8-3.4 tons/ha",
    marketTrends: "Strong demand for plant-based oils with stable price projections"
  }
];

// Climate projection data for the recommendation
const climateProjection = {
  temperature: {
    current: "9.8°C",
    trend: "+1.7°C by 2030",
    description: "Warming trend will extend growing season but may increase heat stress during summer months."
  },
  precipitation: {
    current: "720mm/year",
    trend: "-5% annual with increased variability",
    description: "More intense rainfall events with longer dry periods. Winter precipitation increasing, summer decreasing."
  },
  extremeEvents: {
    heatwaves: "Increasing frequency (+30% by 2030)",
    drought: "Moderate risk increase",
    flooding: "Slight risk increase in spring"
  }
};

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<null | typeof cropRecommendations>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendation-1");

  // Form definition with react-hook-form and zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "",
      soilType: "",
      currentCrop: "",
      landSize: "",
      irrigationType: "",
      farmingStyle: "",
    },
  });

  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      setRecommendations(cropRecommendations);
      setIsLoading(false);
    }, 1500);
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">AI Crop Recommendations</h1>
            <p className="text-muted-foreground max-w-3xl">
              Get personalized crop suggestions based on your location, soil type, and future climate projections
              to optimize yield and sustainability under changing conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Input Form */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Farm Information</CardTitle>
                  <CardDescription>
                    Enter your details to get tailored crop recommendations
                    based on climate projections.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      {/* Location */}
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, Region, or Coordinates" {...field} />
                            </FormControl>
                            <FormDescription>
                              Enter your farm location for climate data
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Soil Type */}
                      <FormField
                        control={form.control}
                        name="soilType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Soil Type</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select soil type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="loam">Loam</SelectItem>
                                <SelectItem value="clay">Clay</SelectItem>
                                <SelectItem value="sandy">Sandy</SelectItem>
                                <SelectItem value="silt">Silt</SelectItem>
                                <SelectItem value="clay-loam">Clay Loam</SelectItem>
                                <SelectItem value="sandy-loam">Sandy Loam</SelectItem>
                                <SelectItem value="silty-clay">Silty Clay</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the predominant soil type in your fields
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Current Crop (Optional) */}
                      <FormField
                        control={form.control}
                        name="currentCrop"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Current Crop (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Currently growing" {...field} />
                            </FormControl>
                            <FormDescription>
                              For better rotation recommendations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Land Size (Optional) */}
                      <FormField
                        control={form.control}
                        name="landSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Land Size (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Area in hectares/acres" {...field} />
                            </FormControl>
                            <FormDescription>
                              For scale-appropriate recommendations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Irrigation Type (Optional) */}
                      <FormField
                        control={form.control}
                        name="irrigationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Irrigation Type (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select if applicable" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="none">Rain-fed (No Irrigation)</SelectItem>
                                <SelectItem value="drip">Drip Irrigation</SelectItem>
                                <SelectItem value="sprinkler">Sprinkler System</SelectItem>
                                <SelectItem value="flood">Flood Irrigation</SelectItem>
                                <SelectItem value="center-pivot">Center Pivot</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Helps determine water-efficient crop options
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* Farming Style (Optional) */}
                      <FormField
                        control={form.control}
                        name="farmingStyle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Farming Style (Optional)</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select if applicable" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="conventional">Conventional</SelectItem>
                                <SelectItem value="organic">Organic</SelectItem>
                                <SelectItem value="regenerative">Regenerative</SelectItem>
                                <SelectItem value="conservation">Conservation</SelectItem>
                                <SelectItem value="precision">Precision Agriculture</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              For practice-appropriate recommendations
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        className="w-full"
                        disabled={isLoading}
                      >
                        {isLoading ? "Analyzing Data..." : "Get Recommendations"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-2">
              {!recommendations && !isLoading && (
                <Card className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <Sparkles className="w-16 h-16 text-muted-foreground mb-4" />
                  <h2 className="text-2xl font-bold mb-2">AI Crop Advisor</h2>
                  <p className="text-muted-foreground max-w-md mb-8">
                    Enter your farm details to receive personalized crop recommendations
                    based on climate projections through 2030.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-md">
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <ThermometerSun className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Temperature Trends</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <Droplets className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Rainfall Patterns</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <Leaf className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Crop Resilience</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <Wind className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Extreme Weather</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <PieChart className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Yield Analysis</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-accent/30 rounded-lg">
                      <CalendarClock className="w-8 h-8 text-primary mb-2" />
                      <span className="text-sm text-center">Planting Calendar</span>
                    </div>
                  </div>
                </Card>
              )}

              {isLoading && (
                <Card className="h-full flex flex-col items-center justify-center p-12">
                  <div className="animate-pulse space-y-8 w-full">
                    <div className="h-8 bg-muted rounded w-3/4 mx-auto" />
                    <div className="space-y-4">
                      <div className="h-4 bg-muted rounded w-5/6 mx-auto" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-4 bg-muted rounded w-4/6 mx-auto" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-24 bg-muted rounded" />
                      <div className="h-24 bg-muted rounded" />
                      <div className="h-24 bg-muted rounded" />
                      <div className="h-24 bg-muted rounded" />
                    </div>
                    <div className="h-32 bg-muted rounded" />
                  </div>
                </Card>
              )}

              {recommendations && (
                <div className="space-y-6">
                  {/* Climate Projections Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Climate Projections for Your Location</CardTitle>
                      <CardDescription>
                        Based on IPCC models and regional climate data
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Temperature */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <ThermometerSun className="w-5 h-5 text-chart-1" />
                            <h3 className="font-semibold">Temperature</h3>
                          </div>
                          <div className="bg-muted p-3 rounded-lg space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Current Avg:</span>
                              <span className="font-medium">{climateProjection.temperature.current}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Projected:</span>
                              <span className="font-medium text-chart-1">{climateProjection.temperature.trend}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {climateProjection.temperature.description}
                          </p>
                        </div>

                        {/* Precipitation */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Droplets className="w-5 h-5 text-chart-2" />
                            <h3 className="font-semibold">Precipitation</h3>
                          </div>
                          <div className="bg-muted p-3 rounded-lg space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Current Avg:</span>
                              <span className="font-medium">{climateProjection.precipitation.current}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Projected:</span>
                              <span className="font-medium text-chart-2">{climateProjection.precipitation.trend}</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {climateProjection.precipitation.description}
                          </p>
                        </div>

                        {/* Extreme Events */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Wind className="w-5 h-5 text-chart-5" />
                            <h3 className="font-semibold">Extreme Events</h3>
                          </div>
                          <div className="bg-muted p-3 rounded-lg space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Heatwaves:</span>
                              <span className="font-medium">{climateProjection.extremeEvents.heatwaves}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Drought Risk:</span>
                              <span className="font-medium">{climateProjection.extremeEvents.drought}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Flooding Risk:</span>
                              <span className="font-medium">{climateProjection.extremeEvents.flooding}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Crop Recommendations Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Crops</CardTitle>
                      <CardDescription>
                        Suggestions optimized for climate resilience, profitability, and sustainability
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <Tabs defaultValue="recommendation-1" value={activeTab} onValueChange={setActiveTab}>
                        <div className="px-6">
                          <TabsList className="grid grid-cols-3 w-full">
                            {recommendations.map((rec, idx) => (
                              <TabsTrigger
                                key={rec.id}
                                value={`recommendation-${rec.id}`}
                              >
                                Option {idx + 1}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </div>

                        {recommendations.map(recommendation => (
                          <TabsContent
                            key={recommendation.id}
                            value={`recommendation-${recommendation.id}`}
                            className="p-6 pt-4"
                          >
                            <div className="space-y-6">
                              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                <div>
                                  <h3 className="text-2xl font-bold text-primary flex items-center gap-2">
                                    <Leaf className="w-6 h-6" />
                                    {recommendation.crop}
                                  </h3>
                                  <p className="text-muted-foreground">{recommendation.description}</p>
                                </div>

                                <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-lg">
                                  <div className="text-xs">AI Confidence</div>
                                  <div className="text-lg font-bold">{recommendation.confidence}%</div>
                                </div>
                              </div>

                              {/* Metrics */}
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-muted p-3 rounded-lg">
                                  <div className="text-xs text-muted-foreground">Sustainability</div>
                                  <div className="text-lg font-semibold">{recommendation.sustainabilityScore}/100</div>
                                </div>
                                <div className="bg-muted p-3 rounded-lg">
                                  <div className="text-xs text-muted-foreground">Profit Potential</div>
                                  <div className="text-lg font-semibold">{recommendation.profitPotential}</div>
                                </div>
                                <div className="bg-muted p-3 rounded-lg">
                                  <div className="text-xs text-muted-foreground">Water Need</div>
                                  <div className="text-lg font-semibold">{recommendation.waterRequirement}</div>
                                </div>
                                <div className="bg-muted p-3 rounded-lg">
                                  <div className="text-xs text-muted-foreground">Temperature</div>
                                  <div className="text-lg font-semibold">{recommendation.temperatureTolerance}</div>
                                </div>
                              </div>

                              {/* Detailed Info */}
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-1">Rotation Recommendation</h4>
                                  <p className="text-sm text-muted-foreground">{recommendation.rotationSuggestion}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold mb-1">Climate Adaptation Strategies</h4>
                                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                                    {recommendation.adaptationStrategies.map((strategy) => (
                                      <li key={`strategy-${recommendation.id}-${strategy}`}>{strategy}</li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h4 className="font-semibold mb-1">Projected Yield</h4>
                                    <p className="text-sm text-muted-foreground">{recommendation.projectedYield}</p>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-1">Market Trends</h4>
                                    <p className="text-sm text-muted-foreground">{recommendation.marketTrends}</p>
                                  </div>
                                </div>
                              </div>

                              {/* Alert Info */}
                              <div className="bg-accent/30 rounded-md p-3 text-sm flex items-start gap-2">
                                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <div>
                                  Recommendations are based on climate projections through 2030. Long-term planning
                                  should consider additional scenarios beyond this timeframe.
                                </div>
                              </div>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download Report
                      </Button>
                      <Button>View Planting Calendar</Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
