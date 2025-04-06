import { Property } from '../firebase/services/property.service';
import { AIService } from './vertexAI';

interface PricingFactors {
  seasonality: number;  // 0.5 to 1.5
  demand: number;       // 0.8 to 1.3
  events: number;       // 1.0 to 1.5
  competition: number;  // 0.7 to 1.2
}

export class DynamicPricingAI {
  static async calculateDynamicPrice(
    property: Property,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    try {
      const prompt = `Analyze pricing factors for this property:
      Property Type: ${property.type}
      Location: ${property.address.city}, ${property.address.state}
      Dates: ${startDate.toISOString()} to ${endDate.toISOString()}
      Base Price: ${property.basePrice}
      
      Return a JSON object with these factors (numbers between 0.5 and 1.5):
      - seasonality
      - demand
      - events
      - competition`;

      const response = await AIService.generateResponse(prompt);
      const factors = JSON.parse(response);

      // Calculate dynamic price using all factors
      const dynamicPrice = property.basePrice * 
        this.normalizeFactorValue(factors.seasonality, 0.5, 1.5) * 
        this.normalizeFactorValue(factors.demand, 0.8, 1.3) * 
        this.normalizeFactorValue(factors.events, 1.0, 1.5) * 
        this.normalizeFactorValue(factors.competition, 0.7, 1.2);

      // Round to nearest whole number
      return Math.round(dynamicPrice);
    } catch (error) {
      console.error('Error calculating dynamic price:', error);
      return property.basePrice; // Fallback to base price
    }
  }

  private static normalizeFactorValue(value: number, min: number, max: number): number {
    if (!value || isNaN(value)) return 1.0;
    return Math.max(min, Math.min(max, value));
  }

  static async suggestPriceAdjustment(property: Property): Promise<string> {
    try {
      const prompt = `Analyze this property's pricing strategy:
      Current Base Price: ${property.basePrice}
      Property Type: ${property.type}
      Location: ${property.address.city}, ${property.address.state}
      Amenities: ${property.amenities.join(', ')}
      
      Suggest if the base price should be adjusted and why.`;

      return await AIService.generateResponse(prompt, 'You are a pricing strategy expert for vacation rentals.');
    } catch (error) {
      console.error('Error generating price adjustment suggestion:', error);
      return "Unable to analyze pricing at this time.";
    }
  }
}
