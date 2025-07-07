
import { Plant, plantDatabase } from '@/data/plantDatabase';

export interface EnvironmentalInputs {
  latitude: number;
  longitude: number;
  soilType: string;
  avgTemperature: number;
  annualRainfall: number;
  humidity: number;
  city?: string;
}

export interface PlantRecommendation {
  plant: Plant;
  survivalScore: number;
  climateFit: number;
  reasons: string[];
}

export function calculatePlantRecommendations(inputs: EnvironmentalInputs): PlantRecommendation[] {
  const recommendations: PlantRecommendation[] = [];

  plantDatabase.forEach(plant => {
    let score = 0;
    let maxScore = 0;
    const reasons: string[] = [];

    // Temperature compatibility (30% weight)
    const tempWeight = 30;
    maxScore += tempWeight;
    if (inputs.avgTemperature >= plant.temperatureRange.min && 
        inputs.avgTemperature <= plant.temperatureRange.max) {
      score += tempWeight;
      reasons.push('Optimal temperature range');
    } else {
      const tempDiff = Math.min(
        Math.abs(inputs.avgTemperature - plant.temperatureRange.min),
        Math.abs(inputs.avgTemperature - plant.temperatureRange.max)
      );
      const tempScore = Math.max(0, tempWeight - (tempDiff * 2));
      score += tempScore;
      if (tempScore > tempWeight * 0.5) {
        reasons.push('Moderate temperature compatibility');
      }
    }

    // Rainfall compatibility (25% weight)
    const rainWeight = 25;
    maxScore += rainWeight;
    if (inputs.annualRainfall >= plant.rainfallRange.min && 
        inputs.annualRainfall <= plant.rainfallRange.max) {
      score += rainWeight;
      reasons.push('Perfect rainfall match');
    } else {
      const rainDiff = Math.min(
        Math.abs(inputs.annualRainfall - plant.rainfallRange.min),
        Math.abs(inputs.annualRainfall - plant.rainfallRange.max)
      );
      const rainScore = Math.max(0, rainWeight - (rainDiff / 50));
      score += rainScore;
      if (rainScore > rainWeight * 0.5) {
        reasons.push('Adequate rainfall levels');
      }
    }

    // Humidity compatibility (20% weight)
    const humidityWeight = 20;
    maxScore += humidityWeight;
    if (inputs.humidity >= plant.humidityRange.min && 
        inputs.humidity <= plant.humidityRange.max) {
      score += humidityWeight;
      reasons.push('Ideal humidity levels');
    } else {
      const humidityDiff = Math.min(
        Math.abs(inputs.humidity - plant.humidityRange.min),
        Math.abs(inputs.humidity - plant.humidityRange.max)
      );
      const humidityScore = Math.max(0, humidityWeight - humidityDiff);
      score += humidityScore;
      if (humidityScore > humidityWeight * 0.5) {
        reasons.push('Acceptable humidity range');
      }
    }

    // Soil type compatibility (15% weight)
    const soilWeight = 15;
    maxScore += soilWeight;
    if (plant.soilTypes.includes(inputs.soilType.toLowerCase())) {
      score += soilWeight;
      reasons.push('Compatible soil type');
    } else {
      // Partial score for versatile plants
      if (plant.soilTypes.length >= 3) {
        score += soilWeight * 0.5;
        reasons.push('Adaptable to various soils');
      }
    }

    // Drought tolerance bonus (10% weight)
    const droughtWeight = 10;
    maxScore += droughtWeight;
    const droughtScore = (plant.droughtTolerance / 10) * droughtWeight;
    score += droughtScore;
    if (plant.droughtTolerance >= 8) {
      reasons.push('Excellent drought tolerance');
    } else if (plant.droughtTolerance >= 6) {
      reasons.push('Good drought tolerance');
    }

    const survivalScore = Math.round((score / maxScore) * 100);
    const climateFit = Math.round(survivalScore * 0.9 + (plant.droughtTolerance * 2));

    recommendations.push({
      plant,
      survivalScore,
      climateFit: Math.min(100, climateFit),
      reasons
    });
  });

  // Sort by survival score and climate fit
  return recommendations
    .sort((a, b) => {
      const scoreDiff = b.survivalScore - a.survivalScore;
      if (scoreDiff !== 0) return scoreDiff;
      return b.climateFit - a.climateFit;
    })
    .slice(0, 6); // Return top 6 recommendations
}
