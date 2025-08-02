import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { GraduationCap, Code, Brain, Users, TrendingUp } from 'lucide-react';

export interface StudentData {
  // Academic History
  highSchoolGPA: number;
  entranceExamScore: number;
  mathGrade: number;
  programmingGrade: number;
  dataStructuresGrade: number;
  algorithmsGrade: number;
  englishGrade: number;
  backlogs: number;
  
  // Course Engagement
  attendancePercentage: number;
  labParticipation: number;
  assignmentPerformance: number;
  semesterTrend: number; // 1-5 scale
  
  // Behavioral Factors
  studyHours: number;
  extracurricularActivity: number; // 1-5 scale
  stressLevel: number; // 1-5 scale
  
  // Socio-Economic
  parentalEducation: number; // 1-5 scale
  financialSupport: number; // 1-5 scale
  partTimeJob: number; // 0-1 boolean
  
  // Technical Skills
  programmingSkillLevel: number; // 1-5 scale
  hackathonParticipation: number; // 0-1 boolean
  internshipExperience: number; // 0-1 boolean
  githubActivity: number; // 1-5 scale
  
  // External Factors
  peerInfluence: number; // 1-5 scale
  facultyFeedback: number; // 1-5 scale
  learningResources: number; // 1-5 scale
}

interface StudentDataFormProps {
  onSubmit: (data: StudentData) => void;
  isLoading?: boolean;
}

export const StudentDataForm: React.FC<StudentDataFormProps> = ({ onSubmit, isLoading = false }) => {
  const [formData, setFormData] = useState<StudentData>({
    highSchoolGPA: 3.5,
    entranceExamScore: 75,
    mathGrade: 80,
    programmingGrade: 85,
    dataStructuresGrade: 80,
    algorithmsGrade: 75,
    englishGrade: 80,
    backlogs: 0,
    attendancePercentage: 85,
    labParticipation: 4,
    assignmentPerformance: 80,
    semesterTrend: 3,
    studyHours: 4,
    extracurricularActivity: 3,
    stressLevel: 3,
    parentalEducation: 3,
    financialSupport: 3,
    partTimeJob: 0,
    programmingSkillLevel: 3,
    hackathonParticipation: 0,
    internshipExperience: 0,
    githubActivity: 3,
    peerInfluence: 3,
    facultyFeedback: 3,
    learningResources: 3,
  });

  const updateField = (field: keyof StudentData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const SliderField = ({ 
    label, 
    field, 
    min = 1, 
    max = 5, 
    step = 1,
    unit = "",
    description 
  }: {
    label: string;
    field: keyof StudentData;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    description?: string;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium">{label}</Label>
        <span className="text-sm text-muted-foreground">
          {formData[field]}{unit}
        </span>
      </div>
      <Slider
        value={[formData[field]]}
        onValueChange={([value]) => updateField(field, value)}
        max={max}
        min={min}
        step={step}
        className="w-full"
      />
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-card">
      <CardHeader className="text-center bg-gradient-academic text-primary-foreground rounded-t-lg">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <GraduationCap className="h-6 w-6" />
          CS Academic Performance Predictor
        </CardTitle>
        <CardDescription className="text-primary-foreground/80">
          Enter student data to predict academic performance using machine learning
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <Tabs defaultValue="academic" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="academic" className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                Academic
              </TabsTrigger>
              <TabsTrigger value="engagement" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Engagement
              </TabsTrigger>
              <TabsTrigger value="behavioral" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                Behavioral
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-1">
                <Code className="h-4 w-4" />
                Technical
              </TabsTrigger>
              <TabsTrigger value="external" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                External
              </TabsTrigger>
            </TabsList>

            <TabsContent value="academic" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Academic History & Background</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderField
                  label="High School GPA"
                  field="highSchoolGPA"
                  min={0}
                  max={4}
                  step={0.1}
                  description="Previous academic performance indicator"
                />
                <SliderField
                  label="Entrance Exam Score"
                  field="entranceExamScore"
                  min={0}
                  max={100}
                  unit="%"
                  description="College entrance examination performance"
                />
                <SliderField
                  label="Mathematics Grade"
                  field="mathGrade"
                  min={0}
                  max={100}
                  unit="%"
                  description="Performance in core mathematics subjects"
                />
                <SliderField
                  label="Programming Grade"
                  field="programmingGrade"
                  min={0}
                  max={100}
                  unit="%"
                  description="Programming fundamentals performance"
                />
                <SliderField
                  label="Data Structures Grade"
                  field="dataStructuresGrade"
                  min={0}
                  max={100}
                  unit="%"
                  description="Data structures and algorithms knowledge"
                />
                <SliderField
                  label="English Grade"
                  field="englishGrade"
                  min={0}
                  max={100}
                  unit="%"
                  description="Language and communication skills"
                />
                <SliderField
                  label="Number of Backlogs"
                  field="backlogs"
                  min={0}
                  max={10}
                  description="Failed or pending subjects"
                />
              </div>
            </TabsContent>

            <TabsContent value="engagement" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Course & University Engagement</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderField
                  label="Attendance Percentage"
                  field="attendancePercentage"
                  min={0}
                  max={100}
                  unit="%"
                  description="Regular class attendance"
                />
                <SliderField
                  label="Lab Participation"
                  field="labParticipation"
                  min={1}
                  max={5}
                  description="Active participation in laboratory sessions"
                />
                <SliderField
                  label="Assignment Performance"
                  field="assignmentPerformance"
                  min={0}
                  max={100}
                  unit="%"
                  description="Quality of assignment submissions"
                />
                <SliderField
                  label="Semester Trend"
                  field="semesterTrend"
                  min={1}
                  max={5}
                  description="Academic improvement over time (1=Declining, 5=Improving)"
                />
              </div>
            </TabsContent>

            <TabsContent value="behavioral" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Behavioral & Psychological Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderField
                  label="Daily Study Hours"
                  field="studyHours"
                  min={0}
                  max={12}
                  unit=" hrs"
                  description="Self-study time per day"
                />
                <SliderField
                  label="Extracurricular Activity"
                  field="extracurricularActivity"
                  min={1}
                  max={5}
                  description="Participation in non-academic activities"
                />
                <SliderField
                  label="Stress Level"
                  field="stressLevel"
                  min={1}
                  max={5}
                  description="Self-reported stress and mental health"
                />
                <SliderField
                  label="Parental Education Level"
                  field="parentalEducation"
                  min={1}
                  max={5}
                  description="Family educational background"
                />
                <SliderField
                  label="Financial Support"
                  field="financialSupport"
                  min={1}
                  max={5}
                  description="Availability of financial resources"
                />
                <SliderField
                  label="Part-time Job"
                  field="partTimeJob"
                  min={0}
                  max={1}
                  description="Working while studying (0=No, 1=Yes)"
                />
              </div>
            </TabsContent>

            <TabsContent value="technical" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Technical & Skill-Based Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderField
                  label="Programming Skill Level"
                  field="programmingSkillLevel"
                  min={1}
                  max={5}
                  description="Self-assessed or evaluated programming ability"
                />
                <SliderField
                  label="Hackathon Participation"
                  field="hackathonParticipation"
                  min={0}
                  max={1}
                  description="Competitive programming experience (0=No, 1=Yes)"
                />
                <SliderField
                  label="Internship Experience"
                  field="internshipExperience"
                  min={0}
                  max={1}
                  description="Industry work experience (0=No, 1=Yes)"
                />
                <SliderField
                  label="GitHub Activity"
                  field="githubActivity"
                  min={1}
                  max={5}
                  description="Code repository and project contributions"
                />
              </div>
            </TabsContent>

            <TabsContent value="external" className="space-y-4 mt-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">External & Environmental Factors</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SliderField
                  label="Peer Group Influence"
                  field="peerInfluence"
                  min={1}
                  max={5}
                  description="Positive influence from classmates"
                />
                <SliderField
                  label="Faculty Feedback"
                  field="facultyFeedback"
                  min={1}
                  max={5}
                  description="Quality of teacher support and guidance"
                />
                <SliderField
                  label="Learning Resources Access"
                  field="learningResources"
                  min={1}
                  max={5}
                  description="Availability of books, online courses, etc."
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-center pt-6 border-t">
            <Button
              type="submit"
              variant="academic"
              size="lg"
              disabled={isLoading}
              className="min-w-48"
            >
              {isLoading ? "Analyzing..." : "Predict Performance"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};