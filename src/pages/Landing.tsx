import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, GraduationCap, BarChart3, Lightbulb, BookOpen, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
            Predicting Student Academic Performance
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto">
            A machine learning system powered by <span className="font-semibold">Decision Tree Algorithms</span> 
            to forecast academic outcomes, identify at-risk students, and provide actionable insights for educators.
          </p>
        </div>

        {/* Key Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-10 w-10 text-blue-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Background</h3>
              <p className="text-sm text-slate-600">
                Leveraging educational data mining to improve performance prediction and reduce dropout rates.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Target className="h-10 w-10 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Objectives</h3>
              <p className="text-sm text-slate-600">
                Collect data, build predictive models, evaluate accuracy, and provide recommendations for improvement.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all">
            <CardContent className="p-6 text-center">
              <Lightbulb className="h-10 w-10 text-amber-500 mx-auto mb-3" />
              <h3 className="font-semibold text-lg">Significance</h3>
              <p className="text-sm text-slate-600">
                Empowering educators with early intervention strategies and transparent decision-making tools.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Card className="text-center shadow hover:shadow-md transition-all">
            <CardContent className="p-5">
              <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold">ML Prediction</h3>
              <p className="text-xs text-muted-foreground">Decision tree algorithms</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow hover:shadow-md transition-all">
            <CardContent className="p-5">
              <GraduationCap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold">25+ Parameters</h3>
              <p className="text-xs text-muted-foreground">Comprehensive analysis</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow hover:shadow-md transition-all">
            <CardContent className="p-5">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold">Performance Insights</h3>
              <p className="text-xs text-muted-foreground">Factor importance analysis</p>
            </CardContent>
          </Card>

          <Card className="text-center shadow hover:shadow-md transition-all">
            <CardContent className="p-5">
              <Lightbulb className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <h3 className="font-semibold">Smart Recommendations</h3>
              <p className="text-xs text-muted-foreground">Personalized guidance</p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="max-w-md mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>Sign in or create an account to access predictions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => navigate('/auth?mode=login')} className="w-full" size="lg">
                Sign In
              </Button>
              <Button onClick={() => navigate('/auth?mode=signup')} variant="outline" className="w-full" size="lg">
                Create Account
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-slate-500">
          <p>© 2025 Student Performance Prediction System — Powered by Decision Tree Algorithms</p>
          <p className="mt-1">Helping students achieve excellence through data-driven insights</p>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
