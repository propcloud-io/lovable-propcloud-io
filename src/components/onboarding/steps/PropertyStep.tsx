
import React, { useState } from 'react';
import { useOnboarding } from '@/contexts/OnboardingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Plus } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

const propertyTypes = [
  'Apartment',
  'House',
  'Condo',
  'Villa',
  'Cabin',
  'Boutique Hotel',
  'Other'
];

const PropertyStep: React.FC = () => {
  const { nextStep, prevStep } = useOnboarding();
  const { toast } = useToast();
  const [properties, setProperties] = useState([
    { name: '', location: '', type: '' }
  ]);

  const handlePropertyChange = (index: number, field: string, value: string) => {
    const updatedProperties = [...properties];
    updatedProperties[index] = { ...updatedProperties[index], [field]: value };
    setProperties(updatedProperties);
  };

  const addProperty = () => {
    setProperties([...properties, { name: '', location: '', type: '' }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Filter out empty properties
    const validProperties = properties.filter(
      prop => prop.name && prop.location && prop.type
    );
    
    if (validProperties.length === 0) {
      toast({
        title: "No properties added",
        description: "Please add at least one property to continue",
        variant: "destructive"
      });
      return;
    }
    
    // In a real app, you would save this data to your backend
    localStorage.setItem('user_properties', JSON.stringify(validProperties));
    
    toast({
      title: "Properties saved",
      description: `${validProperties.length} ${validProperties.length === 1 ? 'property' : 'properties'} added successfully`
    });
    
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Add Your Properties</h2>
        <p className="text-muted-foreground">
          Let us know about the properties you want to manage with PropCloud
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {properties.map((property, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <h3 className="font-medium">Property {index + 1}</h3>
            
            <div className="space-y-2">
              <Label htmlFor={`property-name-${index}`}>Property Name</Label>
              <Input 
                id={`property-name-${index}`}
                placeholder="e.g. Beach Villa"
                value={property.name}
                onChange={(e) => handlePropertyChange(index, 'name', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`property-location-${index}`}>Location</Label>
              <Input 
                id={`property-location-${index}`}
                placeholder="e.g. Miami, FL"
                value={property.location}
                onChange={(e) => handlePropertyChange(index, 'location', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`property-type-${index}`}>Property Type</Label>
              <Select 
                value={property.type}
                onValueChange={(value) => handlePropertyChange(index, 'type', value)}
              >
                <SelectTrigger id={`property-type-${index}`}>
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  {propertyTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        
        <Button 
          type="button" 
          variant="outline" 
          className="w-full"
          onClick={addProperty}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Another Property
        </Button>
        
        <div className="flex flex-col-reverse sm:flex-row justify-between space-y-4 space-y-reverse sm:space-y-0 sm:space-x-4 mt-8">
          <Button type="button" variant="outline" onClick={prevStep}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button type="submit">
            Continue
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PropertyStep;
