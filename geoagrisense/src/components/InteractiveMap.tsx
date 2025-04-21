"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, LayersControl, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Slider } from "@/components/ui/slider";

// Fix for Leaflet icon issues in Next.js
useEffect(() => {
  // Fix for missing Leaflet marker icons
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}, []);

// Custom legend component
const Legend = ({ layer }: { layer: string }) => {
  const getGradient = () => {
    switch (layer) {
      case 'temperature':
        return {
          colors: ['#053061', '#4393c3', '#e6f598', '#f46d43', '#9e0142'],
          labels: ['-3.0°C', '-1.5°C', '0°C', '+1.5°C', '+3.0°C']
        };
      case 'precipitation':
        return {
          colors: ['#a6611a', '#dfc27d', '#f5f5f5', '#80cdc1', '#018571'],
          labels: ['-50%', '-25%', 'Normal', '+25%', '+50%']
        };
      case 'crop-yield':
        return {
          colors: ['#a50026', '#f46d43', '#ffffbf', '#74add1', '#313695'],
          labels: ['-30%', '-15%', 'No change', '+15%', '+30%']
        };
      default:
        return {
          colors: ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b'],
          labels: ['Low', '', '', '', 'Medium', '', '', '', 'High']
        };
    }
  };

  const { colors, labels } = getGradient();

  return (
    <div className="absolute z-[1000] bottom-8 right-8 bg-background/90 p-3 rounded-md shadow-md border border-border text-xs">
      <h4 className="font-medium mb-2 text-sm">Legend</h4>
      <div className="flex items-center">
        <div className="flex h-4 w-full">
          {colors.map((color, i) => (
            <div
              key={i}
              className="flex-1"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-1">
        {labels.filter((_, i) => i === 0 || i === Math.floor(labels.length / 2) || i === labels.length - 1).map((label, i) => (
          <div key={i}>{label}</div>
        ))}
      </div>
    </div>
  );
};

// Custom component to update the map view when center changes
const MapUpdater = ({ center, zoom }: { center: [number, number], zoom: number }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
};

// Sample GeoJSON data - in a real app this would be fetched from an API
const sampleGeoJSON = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Wheat Field 1",
        "crop": "wheat",
        "yield_change": -5,
        "temperature_anomaly": 1.2,
        "precipitation_change": -12
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-96.8, 40.8],
          [-96.7, 40.8],
          [-96.7, 40.7],
          [-96.8, 40.7],
          [-96.8, 40.8]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Corn Field 2",
        "crop": "corn",
        "yield_change": 3,
        "temperature_anomaly": 0.8,
        "precipitation_change": 15
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-97.0, 41.0],
          [-96.9, 41.0],
          [-96.9, 40.9],
          [-97.0, 40.9],
          [-97.0, 41.0]
        ]]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "name": "Soybean Field 3",
        "crop": "soybeans",
        "yield_change": -8,
        "temperature_anomaly": 1.7,
        "precipitation_change": -20
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-97.2, 40.6],
          [-97.1, 40.6],
          [-97.1, 40.5],
          [-97.2, 40.5],
          [-97.2, 40.6]
        ]]
      }
    }
  ]
};

// Sample point data for weather stations
const weatherStations = [
  {
    position: [40.85, -96.75],
    name: "Weather Station 1",
    temperature: "32.4°C",
    precipitation: "720mm/year",
    trend: "+1.5°C since 1990"
  },
  {
    position: [40.95, -96.95],
    name: "Weather Station 2",
    temperature: "31.1°C",
    precipitation: "680mm/year",
    trend: "+1.7°C since 1990"
  },
  {
    position: [40.55, -97.15],
    name: "Weather Station 3",
    temperature: "33.2°C",
    precipitation: "640mm/year",
    trend: "+1.9°C since 1990"
  }
];

type InteractiveMapProps = {
  selectedLayer: string;
  selectedYear?: string;
  selectedCrop?: string;
  selectedRegion?: string;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  selectedLayer,
  selectedYear = '2023',
  selectedCrop = 'all',
  selectedRegion = 'global'
}) => {
  const [opacity, setOpacity] = useState(75);
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.75, -96.85]);
  const [zoom, setZoom] = useState(9);

  // Style function for GeoJSON based on selected layer
  const getStyle = (feature: any) => {
    const baseStyle = {
      weight: 2,
      opacity: opacity / 100,
      color: '#fff',
      dashArray: '3',
      fillOpacity: opacity / 100,
    };

    if (!feature.properties) return { ...baseStyle, fillColor: '#cccccc' };

    let fillColor = '#cccccc';

    // Apply filter for crop type
    if (selectedCrop !== 'all' && feature.properties.crop !== selectedCrop) {
      return { ...baseStyle, fillColor, fillOpacity: 0.1 };
    }

    switch (selectedLayer) {
      case 'temperature':
        if (feature.properties.temperature_anomaly > 2) fillColor = '#9e0142';
        else if (feature.properties.temperature_anomaly > 1) fillColor = '#f46d43';
        else if (feature.properties.temperature_anomaly > 0) fillColor = '#e6f598';
        else if (feature.properties.temperature_anomaly > -1) fillColor = '#4393c3';
        else fillColor = '#053061';
        break;
      case 'precipitation':
        if (feature.properties.precipitation_change > 30) fillColor = '#018571';
        else if (feature.properties.precipitation_change > 10) fillColor = '#80cdc1';
        else if (feature.properties.precipitation_change > -10) fillColor = '#f5f5f5';
        else if (feature.properties.precipitation_change > -30) fillColor = '#dfc27d';
        else fillColor = '#a6611a';
        break;
      case 'crop-yield':
        if (feature.properties.yield_change > 20) fillColor = '#313695';
        else if (feature.properties.yield_change > 10) fillColor = '#74add1';
        else if (feature.properties.yield_change > -10) fillColor = '#ffffbf';
        else if (feature.properties.yield_change > -20) fillColor = '#f46d43';
        else fillColor = '#a50026';
        break;
    }

    return { ...baseStyle, fillColor };
  };

  // Popup content for each feature
  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties) {
      const { name, crop, yield_change, temperature_anomaly, precipitation_change } = feature.properties;
      layer.bindPopup(`
        <div class="p-2">
          <h3 class="font-semibold">${name}</h3>
          <p>Crop: ${crop.charAt(0).toUpperCase() + crop.slice(1)}</p>
          <p>Yield Change: ${yield_change > 0 ? '+' : ''}${yield_change}%</p>
          <p>Temp Anomaly: ${temperature_anomaly > 0 ? '+' : ''}${temperature_anomaly}°C</p>
          <p>Precipitation: ${precipitation_change > 0 ? '+' : ''}${precipitation_change}%</p>
        </div>
      `);
    }
  };

  // When region selection changes, update the map center
  useEffect(() => {
    if (selectedRegion === 'north-america') {
      setMapCenter([40.75, -96.85]);
      setZoom(9);
    } else if (selectedRegion === 'europe') {
      setMapCenter([48.85, 2.35]); // Paris
      setZoom(6);
    } else if (selectedRegion === 'africa') {
      setMapCenter([0.33, 32.58]); // Uganda
      setZoom(6);
    } else if (selectedRegion === 'asia') {
      setMapCenter([35.86, 104.19]); // China
      setZoom(4);
    } else {
      setMapCenter([40.75, -96.85]);
      setZoom(9);
    }
  }, [selectedRegion]);

  return (
    <div className="relative w-full h-full">
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-2 bg-background/90 px-4 py-2 rounded-md border border-border">
        <div className="text-sm">Layer Opacity:</div>
        <div className="w-32">
          <Slider
            value={[opacity]}
            max={100}
            step={5}
            onValueChange={(values) => setOpacity(values[0])}
          />
        </div>
        <div className="text-sm">{opacity}%</div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: '100%', width: '100%', zIndex: 1 }}
        className="rounded-lg"
      >
        <MapUpdater center={mapCenter} zoom={zoom} />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              attribution='&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Terrain">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
              url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Agricultural Data">
            <GeoJSON
              data={sampleGeoJSON as any}
              style={getStyle}
              onEachFeature={onEachFeature}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Weather Stations">
            {weatherStations.map((station, index) => (
              <Marker key={index} position={station.position as [number, number]}>
                <Popup>
                  <div className="p-1">
                    <h3 className="font-medium">{station.name}</h3>
                    <p className="text-sm">Temperature: {station.temperature}</p>
                    <p className="text-sm">Precipitation: {station.precipitation}</p>
                    <p className="text-sm">Trend: {station.trend}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </LayersControl.Overlay>
        </LayersControl>
      </MapContainer>

      <Legend layer={selectedLayer} />
    </div>
  );
};

export default InteractiveMap;
