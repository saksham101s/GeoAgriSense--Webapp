"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FileBarChart,
  Download,
  FileText,
  BookOpen,
  MapPin,
  Sparkles,
  Check,
  Mail,
  Share2,
  ThermometerSun,
  Droplets,
  Leaf,
  CalendarClock,
  Printer,
  FileJson,
  Table
} from "lucide-react"; // Table component imported here
import MainLayout from "@/components/MainLayout";

// Sample report types
const reportTypes = [
  {
    id: "climate-impact",
    name: "Climate Impact Assessment",
    description: "Analyze how climate change is affecting your agricultural land",
    icon: <ThermometerSun className="w-4 h-4" />
  },
  {
    id: "crop-recommendations",
    name: "Crop Recommendations",
    description: "Get personalized crop suggestions based on climate projections",
    icon: <Leaf className="w-4 h-4" />
  },
  {
    id: "water-management",
    name: "Water Management",
    description: "Rainfall patterns and irrigation strategies under changing conditions",
    icon: <Droplets className="w-4 h-4" />
  },
  {
    id: "seasonal-planning",
    name: "Seasonal Planning",
    description: "Optimal planting and harvesting schedules based on climate data",
    icon: <CalendarClock className="w-4 h-4" />
  }
];

// Sample templates
const reportTemplates = [
  { id: "detailed", name: "Detailed Report", pages: "10-15", format: "PDF" },
  { id: "summary", name: "Executive Summary", pages: "3-5", format: "PDF" },
  { id: "presentation", name: "Presentation Slides", pages: "8-12", format: "PDF/PPTX" },
  { id: "data-export", name: "Data Export", pages: "N/A", format: "CSV/JSON" }
];

// Sample history reports (in a real app, this would come from an API)
const reportHistory = [
  {
    id: "rep-001",
    name: "Climate Impact Assessment Q1 2023",
    date: "2023-03-15",
    type: "Climate Impact Assessment",
    pages: 12,
    format: "PDF"
  },
  {
    id: "rep-002",
    name: "Wheat Crop Recommendations",
    date: "2023-05-22",
    type: "Crop Recommendations",
    pages: 8,
    format: "PDF"
  },
  {
    id: "rep-003",
    name: "Seasonal Planning Summer 2023",
    date: "2023-04-10",
    type: "Seasonal Planning",
    pages: 5,
    format: "PDF"
  }
];

// Preview data for sample report
const reportPreviewData = {
  sections: [
    "Executive Summary",
    "Climate Projections",
    "Agricultural Impact Analysis",
    "Crop Recommendations",
    "Adaptation Strategies",
    "Economic Implications",
    "References"
  ],
  charts: 5,
  maps: 3,
  tables: 4,
  pages: 14
};

export default function ReportsPage() {
  const [selectedReportType, setSelectedReportType] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [activeTab, setActiveTab] = useState("create");

  // Handle report generation
  const handleGenerateReport = () => {
    if (!selectedReportType || !selectedTemplate) return;

    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      setIsGenerating(false);
      setReportGenerated(true);
    }, 3000);
  };

  // Format date
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Generate Reports</h1>
            <p className="text-muted-foreground max-w-3xl">
              Create detailed reports with agricultural insights, climate projections, and adaptation strategies
              for your specific location and crops.
            </p>
          </div>

          {/* Main Tabs */}
          <Tabs
            defaultValue="create"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="w-full max-w-md">
              <TabsTrigger value="create" className="flex-1 flex items-center justify-center gap-2">
                <FileText className="w-4 h-4" />
                <span>Create Report</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex-1 flex items-center justify-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>Report History</span>
              </TabsTrigger>
            </TabsList>

            {/* Create Report Tab */}
            <TabsContent value="create" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Report Configuration */}
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Report Configuration</CardTitle>
                      <CardDescription>
                        Select options to generate your custom report
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Report Type */}
                      <div className="space-y-3">
                        <Label htmlFor="report-type">Report Type</Label>
                        <Select
                          value={selectedReportType}
                          onValueChange={setSelectedReportType}
                        >
                          <SelectTrigger id="report-type">
                            <SelectValue placeholder="Select report type" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTypes.map(type => (
                              <SelectItem
                                key={type.id}
                                value={type.id}
                                className="flex items-center"
                              >
                                <div className="flex items-center gap-2">
                                  {type.icon}
                                  <span>{type.name}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {selectedReportType ?
                            reportTypes.find(t => t.id === selectedReportType)?.description :
                            "Choose the type of analysis to include in your report"
                          }
                        </p>
                      </div>

                      {/* Location */}
                      <div className="space-y-3">
                        <Label htmlFor="location">Location</Label>
                        <div className="flex gap-2">
                          <Input
                            id="location"
                            placeholder="Enter location or coordinates"
                            className="flex-1"
                          />
                          <Button variant="outline" size="icon">
                            <MapPin className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Region to analyze in the report
                        </p>
                      </div>

                      {/* Crop Selection */}
                      <div className="space-y-3">
                        <Label htmlFor="crop">Primary Crop</Label>
                        <Select>
                          <SelectTrigger id="crop">
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="wheat">Wheat</SelectItem>
                            <SelectItem value="corn">Corn (Maize)</SelectItem>
                            <SelectItem value="soybeans">Soybeans</SelectItem>
                            <SelectItem value="rice">Rice</SelectItem>
                            <SelectItem value="cotton">Cotton</SelectItem>
                            <SelectItem value="coffee">Coffee</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Report Template */}
                      <div className="space-y-3">
                        <Label htmlFor="template">Report Template</Label>
                        <Select
                          value={selectedTemplate}
                          onValueChange={setSelectedTemplate}
                        >
                          <SelectTrigger id="template">
                            <SelectValue placeholder="Select template" />
                          </SelectTrigger>
                          <SelectContent>
                            {reportTemplates.map(template => (
                              <SelectItem key={template.id} value={template.id}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          {selectedTemplate ?
                            `${reportTemplates.find(t => t.id === selectedTemplate)?.pages} pages, ${reportTemplates.find(t => t.id === selectedTemplate)?.format} format` :
                            "Choose the report structure and format"
                          }
                        </p>
                      </div>

                      {/* Time Period */}
                      <div className="space-y-3">
                        <Label>Time Period</Label>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="date-from" className="text-xs">From</Label>
                            <Input id="date-from" type="date" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="date-to" className="text-xs">To</Label>
                            <Input id="date-to" type="date" />
                          </div>
                        </div>
                      </div>

                      {/* Generate Button */}
                      <Button
                        onClick={handleGenerateReport}
                        className="w-full"
                        disabled={!selectedReportType || !selectedTemplate || isGenerating}
                      >
                        {isGenerating ? "Generating..." : "Generate Report"}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Include Data Card */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-base">Additional Data Sources</CardTitle>
                      <CardDescription>
                        Optional data to include in your report
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" id="include-weather" className="mr-2" />
                          <Label htmlFor="include-weather" className="text-sm">Historical Weather Data</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-soil" className="mr-2" />
                          <Label htmlFor="include-soil" className="text-sm">Soil Analysis</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-yield" className="mr-2" />
                          <Label htmlFor="include-yield" className="text-sm">Previous Yield Records</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-market" className="mr-2" />
                          <Label htmlFor="include-market" className="text-sm">Market Trend Analysis</Label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="include-carbon" className="mr-2" />
                          <Label htmlFor="include-carbon" className="text-sm">Carbon Sequestration Potential</Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Report Preview */}
                <div className="lg:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Report Preview</CardTitle>
                      <CardDescription>
                        Preview of what your report will include
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {!selectedReportType || !selectedTemplate ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <FileBarChart className="w-16 h-16 text-muted-foreground mb-4" />
                          <h3 className="text-lg font-medium mb-2">Select report options</h3>
                          <p className="text-sm text-muted-foreground max-w-md">
                            Choose a report type and template to see a preview of what will be included
                            in your generated report.
                          </p>
                        </div>
                      ) : isGenerating ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin mb-4" />
                          <h3 className="text-lg font-medium mb-2">Generating your report</h3>
                          <p className="text-sm text-muted-foreground max-w-md">
                            This may take a minute as we compile climate data, analyze patterns,
                            and generate personalized recommendations.
                          </p>
                        </div>
                      ) : reportGenerated ? (
                        <div className="space-y-6">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 bg-primary/10 rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                                <Check className="w-5 h-5 text-green-600 dark:text-green-500" />
                              </div>
                              <div>
                                <h3 className="font-medium">Report Ready</h3>
                                <p className="text-sm text-muted-foreground">14 pages, PDF format</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              <Button className="flex items-center gap-2">
                                <Download className="w-4 h-4" />
                                Download PDF
                              </Button>
                              <Button variant="outline" className="flex items-center gap-2">
                                <FileJson className="w-4 h-4" />
                                Raw Data
                              </Button>
                            </div>
                          </div>

                          <div className="border rounded-lg">
                            <div className="p-4 border-b">
                              <h3 className="font-medium">Report Summary</h3>
                            </div>
                            <div className="p-4 space-y-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-muted-foreground">Report Type</p>
                                  <p className="font-medium">
                                    {reportTypes.find(t => t.id === selectedReportType)?.name}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Template</p>
                                  <p className="font-medium">
                                    {reportTemplates.find(t => t.id === selectedTemplate)?.name}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Date Generated</p>
                                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                                </div>
                                <div>
                                  <p className="text-sm text-muted-foreground">Report ID</p>
                                  <p className="font-medium">REP-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-3">Included Sections</h3>
                              <ul className="space-y-2 text-sm">
                                {reportPreviewData.sections.map((section) => (
                                  <li key={section} className="flex items-center gap-2">
                                    <Check className="w-4 h-4 text-primary" />
                                    {section}
                                  </li>
                                ))}
                              </ul>
                            </div>

                            <div className="border rounded-lg p-4">
                              <h3 className="font-medium mb-3">Report Contents</h3>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="flex items-center gap-2">
                                  <FileBarChart className="w-4 h-4 text-primary" />
                                  <span>{reportPreviewData.charts} Charts & Graphs</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="w-4 h-4 text-primary" />
                                  <span>{reportPreviewData.maps} Interactive Maps</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Table className="w-4 h-4 text-primary" />
                                  <span>{reportPreviewData.tables} Data Tables</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="w-4 h-4 text-primary" />
                                  <span>{reportPreviewData.pages} Total Pages</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" className="flex items-center gap-2">
                              <Printer className="w-4 h-4" />
                              Print Report
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              Email Report
                            </Button>
                            <Button variant="outline" className="flex items-center gap-2">
                              <Share2 className="w-4 h-4" />
                              Share Report
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="p-4 bg-accent/30 rounded-lg">
                            <div className="flex items-center gap-3 mb-4">
                              <Sparkles className="w-5 h-5 text-primary" />
                              <h3 className="font-medium">Report Preview for {reportTypes.find(t => t.id === selectedReportType)?.name}</h3>
                            </div>

                            <p className="text-sm text-muted-foreground mb-4">
                              Your report will include the following components based on your selections:
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Climate change projections for your region</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Specific impact analysis on selected crops</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Adaptation strategies and recommendations</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Visualization of key climate indicators</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Projected yield changes and variability</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Check className="w-4 h-4 text-primary mt-0.5" />
                                <span>Economic implications of climate adaptation</span>
                              </div>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {selectedReportType === "climate-impact" && (
                              <>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Temperature Trends</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <ThermometerSun className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Precipitation Changes</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <Droplets className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Growing Season Shifts</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <CalendarClock className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                              </>
                            )}

                            {selectedReportType === "crop-recommendations" && (
                              <>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Crop Suitability Analysis</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <Leaf className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Variety Recommendations</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <Sparkles className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Climate Resilience Scores</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="h-32 bg-muted rounded flex items-center justify-center">
                                      <FileBarChart className="w-8 h-8 text-muted-foreground" />
                                    </div>
                                  </CardContent>
                                </Card>
                              </>
                            )}
                          </div>

                          <Button
                            onClick={handleGenerateReport}
                            className="w-full"
                            disabled={isGenerating}
                          >
                            Generate Full Report
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Report History Tab */}
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Report History</CardTitle>
                  <CardDescription>
                    View and download your previously generated reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr className="text-left">
                          <th className="p-3 font-medium">Report Name</th>
                          <th className="p-3 font-medium">Type</th>
                          <th className="p-3 font-medium">Date</th>
                          <th className="p-3 font-medium">Format</th>
                          <th className="p-3 font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {reportHistory.map(report => (
                          <tr key={report.id} className="hover:bg-accent/10">
                            <td className="p-3">{report.name}</td>
                            <td className="p-3">{report.type}</td>
                            <td className="p-3">{formatDate(report.date)}</td>
                            <td className="p-3">{report.format}</td>
                            <td className="p-3">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 px-2">
                                  <Share2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline" onClick={() => setActiveTab("create")}>
                    Create New Report
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download All Reports
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
