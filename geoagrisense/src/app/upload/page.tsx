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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Upload,
  FileType,
  Table,
  DatabaseBackup,
  CheckCircle,
  AlertCircle,
  Info,
  ArrowRight,
  MapPin
} from "lucide-react";
import MainLayout from "@/components/MainLayout";

export default function UploadPage() {
  const [activeTab, setActiveTab] = useState("file-upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [uploadProgress, setUploadProgress] = useState(0);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
      setUploadStatus("idle");
    }
  };

  // Handle file upload
  const handleUpload = () => {
    if (!selectedFile) return;

    setUploadStatus("uploading");
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  // Supported file types
  const supportedFileTypes = [
    { name: "CSV Files", extension: ".csv", description: "Tabular data with headers", size: "Up to 50MB" },
    { name: "GeoJSON", extension: ".geojson", description: "Geographic data features", size: "Up to 100MB" },
    { name: "Shapefile", extension: ".zip (containing .shp)", description: "Vector data with attributes", size: "Up to 100MB" },
    { name: "NetCDF", extension: ".nc", description: "Multidimensional scientific data", size: "Up to 200MB" },
    { name: "Excel Files", extension: ".xlsx, .xls", description: "Spreadsheet data with multiple sheets", size: "Up to 50MB" }
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-6">
          {/* Page Header */}
          <div>
            <h1 className="text-3xl font-bold mb-2">Upload Data</h1>
            <p className="text-muted-foreground max-w-3xl">
              Upload your own agricultural and climate data for enhanced analysis.
              We support various file formats for geospatial data, crop yields, soil samples, and weather records.
            </p>
          </div>

          {/* Main Upload Area */}
          <Tabs
            defaultValue="file-upload"
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="grid grid-cols-3 w-full max-w-md">
              <TabsTrigger value="file-upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                <span>File Upload</span>
              </TabsTrigger>
              <TabsTrigger value="api-connect" className="flex items-center gap-2">
                <DatabaseBackup className="w-4 h-4" />
                <span>API Connect</span>
              </TabsTrigger>
              <TabsTrigger value="manual-entry" className="flex items-center gap-2">
                <Table className="w-4 h-4" />
                <span>Manual Entry</span>
              </TabsTrigger>
            </TabsList>

            {/* File Upload Tab */}
            <TabsContent value="file-upload">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Upload Data Files</CardTitle>
                      <CardDescription>
                        Drag and drop files or click to browse. We support CSV, GeoJSON, Shapefiles, NetCDF, and Excel.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className={`
                          border-2 border-dashed rounded-lg p-12 text-center
                          ${uploadStatus === "error" ? "border-destructive" : "border-border"}
                          transition-all hover:border-primary/50 cursor-pointer
                        `}
                        onClick={() => document.getElementById("file-input")?.click()}
                      >
                        {uploadStatus === "idle" && !selectedFile && (
                          <>
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              <Upload className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">Click to upload or drag and drop</h3>
                            <p className="text-sm text-muted-foreground">
                              Upload your data files (max 200MB per file)
                            </p>
                          </>
                        )}

                        {uploadStatus === "idle" && selectedFile && (
                          <>
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              <FileType className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">{selectedFile.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB - Ready to upload
                            </p>
                            <Button
                              className="mt-4"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUpload();
                              }}
                            >
                              Upload File
                            </Button>
                          </>
                        )}

                        {uploadStatus === "uploading" && (
                          <>
                            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                              <FileType className="w-6 h-6 text-primary" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">Uploading {selectedFile?.name}</h3>
                            <div className="w-full bg-muted h-2 rounded-full overflow-hidden mt-4 mb-2">
                              <div
                                className="bg-primary h-full transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                              />
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {uploadProgress}% Uploaded
                            </p>
                          </>
                        )}

                        {uploadStatus === "success" && (
                          <>
                            <div className="mx-auto w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mb-4">
                              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-500" />
                            </div>
                            <h3 className="text-lg font-medium mb-1">Upload Complete</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              Your file has been successfully uploaded and is being processed
                            </p>
                            <Button variant="outline" onClick={() => {
                              setSelectedFile(null);
                              setUploadStatus("idle");
                            }}>
                              Upload Another File
                            </Button>
                          </>
                        )}

                        {uploadStatus === "error" && (
                          <>
                            <div className="mx-auto w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                              <AlertCircle className="w-6 h-6 text-destructive" />
                            </div>
                            <h3 className="text-lg font-medium mb-1 text-destructive">Upload Failed</h3>
                            <p className="text-sm text-muted-foreground mb-4">
                              There was an error uploading your file. Please try again.
                            </p>
                            <Button variant="outline" onClick={() => setUploadStatus("idle")}>
                              Try Again
                            </Button>
                          </>
                        )}

                        <input
                          id="file-input"
                          type="file"
                          className="hidden"
                          accept=".csv,.geojson,.zip,.nc,.xlsx,.xls"
                          onChange={handleFileChange}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <div className="flex items-start gap-2 text-sm">
                        <Info className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-muted-foreground">
                          All uploaded data is encrypted and stored securely. You can delete your data at any time.
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </div>

                {/* File Type Info Card */}
                <div className="md:col-span-1">
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle>Supported Formats</CardTitle>
                      <CardDescription>
                        Data file formats we currently support
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {supportedFileTypes.map((fileType, index) => (
                          <div key={fileType.name} className={`py-2 ${index !== 0 ? 'border-t border-border' : ''}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <FileType className="w-4 h-4 text-primary" />
                              <span className="font-medium">{fileType.name}</span>
                            </div>
                            <div className="text-xs text-muted-foreground ml-6 space-y-1">
                              <p>Extension: {fileType.extension}</p>
                              <p>{fileType.description}</p>
                              <p>Size limit: {fileType.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                      <Button variant="outline" className="w-full flex items-center gap-2">
                        <FileType className="w-4 h-4" />
                        View Sample Files
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* API Connect Tab */}
            <TabsContent value="api-connect">
              <Card>
                <CardHeader>
                  <CardTitle>Connect to Data API</CardTitle>
                  <CardDescription>
                    Connect to weather services, satellite imagery, or your own data API
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="api-url">API Endpoint URL</Label>
                      <Input id="api-url" placeholder="https://api.example.com/data" />
                      <p className="text-xs text-muted-foreground">
                        The base URL of your API endpoint
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="api-key">API Key (Optional)</Label>
                      <Input id="api-key" placeholder="Your API key" type="password" />
                      <p className="text-xs text-muted-foreground">
                        Authentication key if required by the API
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="data-format">Data Format</Label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="json">JSON</option>
                        <option value="csv">CSV</option>
                        <option value="xml">XML</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        Format of the data returned by the API
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="api-method">Request Method</Label>
                      <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                        <option value="get">GET</option>
                        <option value="post">POST</option>
                      </select>
                      <p className="text-xs text-muted-foreground">
                        HTTP method used to request data
                      </p>
                    </div>
                  </div>

                  <div className="bg-accent/30 rounded-md p-3 text-sm flex items-start gap-2">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <div>
                      Your API should return climate or agricultural data in a supported format.
                      We can automatically map fields if the structure is consistent.
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Test Connection</Button>
                  <Button>Connect API</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Manual Entry Tab */}
            <TabsContent value="manual-entry">
              <Card>
                <CardHeader>
                  <CardTitle>Manual Data Entry</CardTitle>
                  <CardDescription>
                    Enter field observations and measurements manually
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="data-name">Data Set Name</Label>
                      <Input id="data-name" placeholder="e.g., Field Observations 2023" />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="location">Location</Label>
                      <div className="flex gap-2">
                        <Input id="location" placeholder="Coordinates or address" />
                        <Button variant="outline" size="icon">
                          <MapPin className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="crop-type">Crop Type</Label>
                      <Input id="crop-type" placeholder="e.g., Wheat, Corn" />
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="area">Area Size</Label>
                      <Input id="area" placeholder="e.g., 10 hectares" />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label htmlFor="measurements">Observations & Measurements</Label>
                    <textarea
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-32"
                      placeholder="Enter your observations, measurements, and notes about crop health, soil conditions, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label>Add Field (Optional)</Label>
                      <div className="flex gap-2">
                        <Input placeholder="Field name" />
                        <Input placeholder="Value" />
                        <Button variant="outline" size="icon">
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <Button variant="outline">Clear Form</Button>
                  <Button>Save Data</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Data Usage Section */}
          <Card>
            <CardHeader>
              <CardTitle>How Your Data Is Used</CardTitle>
              <CardDescription>
                Understanding how we process and analyze your uploaded information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Enhanced Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Your uploaded data is combined with our climate models to provide more accurate and personalized
                    agricultural insights specific to your fields and crops.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Data Privacy</h3>
                  <p className="text-sm text-muted-foreground">
                    All data is securely stored and encrypted. Your data remains private and is never shared with
                    third parties without your explicit permission.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Data Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Uploaded geospatial data can be visualized on maps and combined with climate layers to identify
                    patterns and make better agricultural decisions.
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
