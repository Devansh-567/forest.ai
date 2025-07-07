
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Leaf, MapPin, Thermometer, Cloud, Droplets, Mountain } from 'lucide-react';
import PlantCard from '@/components/PlantCard';
import { calculatePlantRecommendations, EnvironmentalInputs, PlantRecommendation } from '@/utils/plantRecommendation';
import { toast } from '@/hooks/use-toast';

const Index = () => {
  const [inputs, setInputs] = useState<EnvironmentalInputs>({
    latitude: 34.0522,
    longitude: -118.2437,
    soilType: 'sandy',
    avgTemperature: 20,
    annualRainfall: 400,
    humidity: 50,
    city: 'Los Angeles'
  });

  const [recommendations, setRecommendations] = useState<PlantRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof EnvironmentalInputs, value: any) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const handleGetRecommendations = async () => {
    setIsLoading(true);
    toast({
      title: "Analyzing environmental conditions...",
      description: "Our AI is finding the best drought-resistant plants for your location.",
    });

    // Simulate API processing time
    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = calculatePlantRecommendations(inputs);
    setRecommendations(results);
    setIsLoading(false);

    toast({
      title: "Recommendations ready!",
      description: `Found ${results.length} suitable drought-resistant plant species.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-teal-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-green-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <Leaf className="text-green-600 w-8 h-8" />
            <h1 className="text-3xl font-bold text-green-800">
              AI Plant Species Recommender
            </h1>
          </div>
          <p className="text-green-600 text-lg">
            Discover drought-resistant native plants perfect for your climate and soil conditions
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-white shadow-lg border-green-200">
              <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100">
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Environmental Parameters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pt-6">
                {/* Location */}
                <div className="space-y-3">
                  <Label className="text-green-700 font-semibold">Location</Label>
                  <Input
                    placeholder="City name (optional)"
                    value={inputs.city || ''}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="border-green-200 focus:border-green-400"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label className="text-sm text-gray-600">Latitude</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={inputs.latitude}
                        onChange={(e) => handleInputChange('latitude', parseFloat(e.target.value))}
                        className="border-green-200"
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-gray-600">Longitude</Label>
                      <Input
                        type="number"
                        step="0.0001"
                        value={inputs.longitude}
                        onChange={(e) => handleInputChange('longitude', parseFloat(e.target.value))}
                        className="border-green-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Soil Type */}
                <div className="space-y-2">
                  <Label className="text-green-700 font-semibold flex items-center gap-2">
                    <Mountain className="w-4 h-4" />
                    Soil Type
                  </Label>
                  <Select value={inputs.soilType} onValueChange={(value) => handleInputChange('soilType', value)}>
                    <SelectTrigger className="border-green-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="loamy">Loamy Soil</SelectItem>
                      <SelectItem value="rocky">Rocky Soil</SelectItem>
                      <SelectItem value="gravelly">Gravelly Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Temperature */}
                <div className="space-y-3">
                  <Label className="text-green-700 font-semibold flex items-center gap-2">
                    <Thermometer className="w-4 h-4" />
                    Average Temperature: {inputs.avgTemperature}°C
                  </Label>
                  <Slider
                    value={[inputs.avgTemperature]}
                    onValueChange={(value) => handleInputChange('avgTemperature', value[0])}
                    min={-10}
                    max={50}
                    step={1}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>-10°C</span>
                    <span>50°C</span>
                  </div>
                </div>

                {/* Rainfall */}
                <div className="space-y-3">
                  <Label className="text-green-700 font-semibold flex items-center gap-2">
                    <Cloud className="w-4 h-4" />
                    Annual Rainfall: {inputs.annualRainfall}mm
                  </Label>
                  <Slider
                    value={[inputs.annualRainfall]}
                    onValueChange={(value) => handleInputChange('annualRainfall', value[0])}
                    min={50}
                    max={2000}
                    step={25}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>50mm</span>
                    <span>2000mm</span>
                  </div>
                </div>

                {/* Humidity */}
                <div className="space-y-3">
                  <Label className="text-green-700 font-semibold flex items-center gap-2">
                    <Droplets className="w-4 h-4" />
                    Humidity: {inputs.humidity}%
                  </Label>
                  <Slider
                    value={[inputs.humidity]}
                    onValueChange={(value) => handleInputChange('humidity', value[0])}
                    min={5}
                    max={95}
                    step={5}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>5%</span>
                    <span>95%</span>
                  </div>
                </div>

                <Button 
                  onClick={handleGetRecommendations}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Leaf className="w-5 h-5 mr-2" />
                      Get Plant Recommendations
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {recommendations.length > 0 ? (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-green-200">
                  <h2 className="text-2xl font-bold text-green-800 mb-2">
                    🌱 Recommended Plants for Your Location
                  </h2>
                  <p className="text-green-600">
                    Based on your environmental conditions, here are the top drought-resistant plant species:
                  </p>
                </div>
                
                <div className="grid gap-6">
                  {recommendations.map((recommendation, index) => (
                    <PlantCard
                      key={recommendation.plant.id}
                      recommendation={recommendation}
                      rank={index + 1}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <Card className="bg-white shadow-lg border-green-200 h-fit">
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <div className="text-6xl">🌿</div>
                    <h3 className="text-xl font-semibold text-green-800">
                      Ready to Find Your Perfect Plants?
                    </h3>
                    <p className="text-green-600 max-w-md mx-auto">
                      Enter your location and environmental conditions on the left to get personalized 
                      drought-resistant plant recommendations powered by AI.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-8 max-w-sm mx-auto text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Native species priority
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Drought tolerance scoring
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Climate compatibility
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        Soil type matching
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
