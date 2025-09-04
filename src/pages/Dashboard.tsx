import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/firebase/config';
import { StudentDataForm, StudentData } from '@/components/StudentDataForm';
import { PredictionResults, PredictionResult } from '@/components/PredictionResults';
import AcademicPredictor from '@/utils/academicPredictor';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';

const Dashboard = () => {
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [user] = useAuthState(auth);

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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: "There was an error signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
 
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header with user info and logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            Academic Performance Predictor
          </h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <User className="h-4 w-4" />
              <span>{user?.email}</span>
            </div>
            <Button 
              onClick={handleLogout} 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent">
            A Development of Predicting student academic performance using decision tree Algorithm
          </h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Advanced machine learning prediction system for computer science student academic performance using decision tree algorithms
          </p>
        </div>

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
      </div>
    </div>
  );
};

export default Dashboard;