
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlantRecommendation } from '@/utils/plantRecommendation';

interface PlantCardProps {
  recommendation: PlantRecommendation;
  rank: number;
}

const PlantCard = ({ recommendation, rank }: PlantCardProps) => {
  const { plant, survivalScore, climateFit, reasons } = recommendation;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-orange-600 bg-orange-50';
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'tree': return '🌳';
      case 'shrub': return '🌿';
      case 'grass': return '🌾';
      case 'perennial': return '🌸';
      case 'annual': return '🌼';
      default: return '🌱';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-green-50 to-blue-50 border-green-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{plant.image}</span>
            <div>
              <CardTitle className="text-lg text-green-800 flex items-center gap-2">
                #{rank} {plant.name}
                <span className="text-sm">{getTypeIcon(plant.type)}</span>
              </CardTitle>
              <p className="text-sm text-green-600 italic">{plant.scientificName}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-sm text-gray-700">{plant.description}</p>
          
          <div className="flex gap-2 flex-wrap">
            <Badge className={`${getScoreColor(survivalScore)} border-0`}>
              Survival: {survivalScore}%
            </Badge>
            <Badge className={`${getScoreColor(climateFit)} border-0`}>
              Climate Fit: {climateFit}%
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Drought: {plant.droughtTolerance}/10
            </Badge>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-2">Why this plant works:</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              {reasons.slice(0, 3).map((reason, index) => (
                <li key={index} className="flex items-center gap-1">
                  <span className="text-green-500">✓</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-green-700 mb-1">Benefits:</h4>
            <div className="flex flex-wrap gap-1">
              {plant.benefits.slice(0, 3).map((benefit, index) => (
                <Badge key={index} variant="secondary" className="text-xs bg-green-100 text-green-700">
                  {benefit}
                </Badge>
              ))}
            </div>
          </div>

          <div className="text-xs text-gray-500 pt-2 border-t border-green-100">
            <p><strong>Temperature:</strong> {plant.temperatureRange.min}°C to {plant.temperatureRange.max}°C</p>
            <p><strong>Soil:</strong> {plant.soilTypes.join(', ')}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlantCard;
