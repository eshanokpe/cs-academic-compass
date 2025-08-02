import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, BarChart3 } from 'lucide-react';

export interface PredictionResult {
  predictedGPA: number;
  confidence: number;
  riskLevel: 'low' | 'medium' | 'high';
  recommendation: string;
  keyFactors: Array<{
    factor: string;
    impact: number;
    description: string;
  }>;
  improvementAreas: string[];
}

interface PredictionResultsProps {
  result: PredictionResult;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ result }) => {
  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'danger';
      default: return 'secondary';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-4 w-4" />;
      case 'medium': return <AlertTriangle className="h-4 w-4" />;
      case 'high': return <TrendingDown className="h-4 w-4" />;
      default: return <BarChart3 className="h-4 w-4" />;
    }
  };

  const getGPAColor = (gpa: number) => {
    if (gpa >= 3.5) return 'text-academic-success';
    if (gpa >= 2.5) return 'text-academic-warning';
    return 'text-academic-danger';
  };

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      {/* Main Prediction Card */}
      <Card className="shadow-academic">
        <CardHeader className="text-center bg-gradient-subtle rounded-t-lg">
          <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            Academic Performance Prediction
          </CardTitle>
          <CardDescription>
            Machine Learning Analysis Results
          </CardDescription>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Predicted GPA */}
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Predicted GPA</h3>
              <div className={`text-4xl font-bold ${getGPAColor(result.predictedGPA)}`}>
                {result.predictedGPA.toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground">Out of 4.0</p>
            </div>

            {/* Confidence Score */}
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Prediction Confidence</h3>
              <div className="text-4xl font-bold text-primary">
                {Math.round(result.confidence)}%
              </div>
              <Progress value={result.confidence} className="w-full" />
            </div>

            {/* Risk Level */}
            <div className="text-center space-y-2">
              <h3 className="text-sm font-medium text-muted-foreground">Risk Level</h3>
              <Badge 
                variant={getRiskColor(result.riskLevel) as any}
                className="text-lg px-4 py-2 capitalize"
              >
                {getRiskIcon(result.riskLevel)}
                {result.riskLevel}
              </Badge>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-6 p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Recommendation
            </h3>
            <p className="text-sm text-muted-foreground">{result.recommendation}</p>
          </div>
        </CardContent>
      </Card>

      {/* Key Factors Analysis */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Key Performance Factors
          </CardTitle>
          <CardDescription>
            Factors most influencing the prediction (ordered by importance)
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {result.keyFactors.map((factor, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-sm">{factor.factor}</span>
                <span className={`text-sm font-semibold ${
                  factor.impact > 0 ? 'text-academic-success' : 'text-academic-danger'
                }`}>
                  {factor.impact > 0 ? '+' : ''}{factor.impact.toFixed(1)}
                </span>
              </div>
              <Progress 
                value={Math.abs(factor.impact * 10)} 
                className="h-2"
              />
              <p className="text-xs text-muted-foreground">{factor.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Improvement Areas */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            Areas for Improvement
          </CardTitle>
          <CardDescription>
            Targeted recommendations to enhance academic performance
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.improvementAreas.map((area, index) => (
              <div 
                key={index}
                className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20"
              >
                <div className="h-2 w-2 bg-accent rounded-full flex-shrink-0" />
                <span className="text-sm text-foreground">{area}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};