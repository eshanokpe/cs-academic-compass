import React, { useState } from 'react';
import { StudentDataForm, StudentData } from '@/components/StudentDataForm';
import { PredictionResults, PredictionResult } from '@/components/PredictionResults';
import AcademicPredictor from '@/utils/academicPredictor';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, GraduationCap, BarChart3, Lightbulb } from 'lucide-react';

const Index = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handlePrediction = async (studentData: StudentData) => {
    setIsLoading(true);
    
    try {
      // Simulate processing time for better UX
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const predictor = new AcademicPredictor();
      const result = predictor.predict(studentData);
      
      setPrediction(result);
      
      toast({
        title: "Prediction Complete",
        description: "Academic performance analysis has been generated successfully.",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "There was an error generating the prediction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetPrediction = () => {
    setPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            A Development of Predictiong student academic performance using decision tree Algorithm
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced machine learning prediction system for computer science student academic performance using decision tree algorithms
          </p>
        </div>

        {/* Feature Cards */}
        {/* {!prediction && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="text-center shadow-card hover:shadow-academic transition-all duration-300">
              <CardContent className="p-4">
                <Brain className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">ML Prediction</h3>
                <p className="text-xs text-muted-foreground">Decision tree algorithms</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-academic transition-all duration-300">
              <CardContent className="p-4">
                <GraduationCap className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">25+ Parameters</h3>
                <p className="text-xs text-muted-foreground">Comprehensive analysis</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-academic transition-all duration-300">
              <CardContent className="p-4">
                <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Performance Insights</h3>
                <p className="text-xs text-muted-foreground">Factor importance analysis</p>
              </CardContent>
            </Card>
            
            <Card className="text-center shadow-card hover:shadow-academic transition-all duration-300">
              <CardContent className="p-4">
                <Lightbulb className="h-8 w-8 text-accent mx-auto mb-2" />
                <h3 className="font-semibold text-sm">Smart Recommendations</h3>
                <p className="text-xs text-muted-foreground">Personalized improvement areas</p>
              </CardContent>
            </Card>
          </div>
        )} */}

        {/* Main Content */}
        {!prediction ? (
          <StudentDataForm onSubmit={handlePrediction} isLoading={isLoading} />
        ) : (
          <div className="space-y-6">
            <PredictionResults result={prediction} />
            
            <div className="text-center ">
              <Button 
                onClick={resetPrediction}
                variant="outline"
                size="lg"
                className="min-w-48 "
              >
                Analyze Another Student
              </Button>
            </div>
          </div>
        )}

        {/* Footer */}
        {/* <div className="mt-16 text-center text-sm text-muted-foreground">
          <p> A Development of Predictiong student academic performance using decision tree Algorithm - Powered by Machine Learning Decision Trees</p>
          <p className="mt-1">Helping students achieve academic excellence through data-driven insights</p>
        </div> */}
      </div>
    </div>
  );
};

export default Index;
