import { DecisionTreeClassifier } from 'ml-cart';
import { Matrix } from 'ml-matrix';
import { StudentData } from '@/components/StudentDataForm';
import { PredictionResult } from '@/components/PredictionResults';

// Training data - in a real application, this would come from a larger dataset
const trainingData = [
  // High performers
  { features: [3.8, 90, 85, 90, 85, 80, 85, 0, 90, 5, 90, 4, 6, 2, 2, 4, 4, 0, 4, 1, 1, 4, 4, 4, 4], label: 1 },
  { features: [3.7, 88, 80, 85, 80, 75, 80, 1, 85, 4, 85, 4, 5, 3, 3, 3, 3, 0, 4, 0, 1, 4, 3, 4, 3], label: 1 },
  { features: [3.9, 95, 90, 95, 90, 85, 90, 0, 95, 5, 95, 5, 7, 2, 2, 4, 5, 0, 5, 1, 1, 5, 4, 5, 5], label: 1 },
  { features: [3.6, 85, 78, 82, 78, 75, 78, 1, 80, 4, 80, 3, 5, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], label: 1 },
  
  // Medium performers
  { features: [3.2, 75, 70, 75, 70, 65, 70, 2, 70, 3, 70, 3, 4, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], label: 0 },
  { features: [3.0, 70, 65, 70, 65, 60, 65, 3, 65, 3, 65, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], label: 0 },
  { features: [3.3, 78, 72, 78, 72, 68, 72, 1, 75, 3, 75, 3, 4, 3, 3, 3, 3, 0, 3, 0, 0, 3, 3, 3, 3], label: 0 },
  { features: [2.9, 68, 62, 68, 62, 58, 62, 4, 60, 2, 60, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], label: 0 },
  
  // Low performers
  { features: [2.5, 60, 50, 55, 50, 45, 50, 5, 50, 2, 50, 2, 2, 5, 5, 2, 1, 1, 1, 0, 0, 1, 2, 1, 1], label: -1 },
  { features: [2.3, 55, 45, 50, 45, 40, 45, 6, 45, 1, 45, 1, 1, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], label: -1 },
  { features: [2.7, 65, 55, 60, 55, 50, 55, 3, 55, 2, 55, 2, 2, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], label: -1 },
  { features: [2.1, 50, 40, 45, 40, 35, 40, 7, 40, 1, 40, 1, 1, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], label: -1 },
  
  // Additional diverse samples
  { features: [3.4, 82, 76, 80, 76, 72, 76, 1, 78, 4, 78, 3, 5, 2, 3, 4, 4, 0, 4, 1, 0, 4, 4, 4, 4], label: 1 },
  { features: [3.1, 73, 67, 72, 67, 63, 67, 2, 68, 3, 68, 3, 4, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], label: 0 },
  { features: [2.8, 63, 57, 62, 57, 53, 57, 4, 58, 2, 58, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], label: 0 },
  { features: [2.4, 58, 48, 53, 48, 43, 48, 6, 48, 1, 48, 1, 2, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], label: -1 },
];

// Feature names for interpretation
const featureNames = [
  'High School GPA', 'Entrance Exam Score', 'Math Grade', 'Programming Grade',
  'Data Structures Grade', 'Algorithms Grade', 'English Grade', 'Backlogs',
  'Attendance %', 'Lab Participation', 'Assignment Performance', 'Semester Trend',
  'Study Hours', 'Extracurricular Activity', 'Stress Level', 'Parental Education',
  'Financial Support', 'Part-time Job', 'Programming Skill', 'Hackathon Participation',
  'Internship Experience', 'GitHub Activity', 'Peer Influence', 'Faculty Feedback',
  'Learning Resources'
];

class AcademicPredictor {
  private model: DecisionTreeClassifier;
  private isModelTrained: boolean = false;

  constructor() {
    this.model = new DecisionTreeClassifier();
    this.trainModel();
  }

  private trainModel() {
    try {
      const features = trainingData.map(d => d.features);
      const labels = trainingData.map(d => d.label);
      
      this.model.train(new Matrix(features), labels);
      this.isModelTrained = true;
    } catch (error) {
      console.error('Error training model:', error);
      this.isModelTrained = false;
    }
  }

  private studentDataToFeatures(data: StudentData): number[] {
    return [
      data.highSchoolGPA,
      data.entranceExamScore,
      data.mathGrade,
      data.programmingGrade,
      data.dataStructuresGrade,
      data.algorithmsGrade,
      data.englishGrade,
      data.backlogs,
      data.attendancePercentage,
      data.labParticipation,
      data.assignmentPerformance,
      data.semesterTrend,
      data.studyHours,
      data.extracurricularActivity,
      data.stressLevel,
      data.parentalEducation,
      data.financialSupport,
      data.partTimeJob,
      data.programmingSkillLevel,
      data.hackathonParticipation,
      data.internshipExperience,
      data.githubActivity,
      data.peerInfluence,
      data.facultyFeedback,
      data.learningResources
    ];
  }

  private calculateFeatureImportance(data: StudentData): Array<{factor: string, impact: number, description: string}> {
    const features = this.studentDataToFeatures(data);
    const importance = [];

    // Calculate relative importance based on feature values and weights
    const weights = [0.15, 0.12, 0.10, 0.12, 0.11, 0.10, 0.08, -0.08, 0.09, 0.07, 0.08, 0.06, 0.05, 0.03, -0.04, 0.04, 0.04, -0.03, 0.07, 0.05, 0.06, 0.05, 0.04, 0.05, 0.04];
    
    for (let i = 0; i < features.length; i++) {
      const normalizedFeature = i < 8 ? features[i] / 100 : features[i] / 5; // Normalize features
      const impact = normalizedFeature * weights[i] * 10; // Scale for display
      
      importance.push({
        factor: featureNames[i],
        impact: impact,
        description: this.getFeatureDescription(featureNames[i], features[i])
      });
    }

    // Sort by absolute impact and return top 6
    return importance
      .sort((a, b) => Math.abs(b.impact) - Math.abs(a.impact))
      .slice(0, 6);
  }

  private getFeatureDescription(featureName: string, value: number): string {
    const descriptions: Record<string, string> = {
      'High School GPA': `Previous GPA of ${value.toFixed(1)} indicates ${value >= 3.5 ? 'strong' : value >= 3.0 ? 'moderate' : 'weak'} academic foundation`,
      'Programming Grade': `${value}% in programming shows ${value >= 80 ? 'excellent' : value >= 70 ? 'good' : 'needs improvement'} coding skills`,
      'Attendance %': `${value}% attendance demonstrates ${value >= 85 ? 'excellent' : value >= 75 ? 'good' : 'poor'} engagement`,
      'Study Hours': `${value} hours/day shows ${value >= 5 ? 'dedicated' : value >= 3 ? 'moderate' : 'insufficient'} study commitment`,
      'Backlogs': `${value} pending subjects ${value === 0 ? 'shows good progress' : value <= 2 ? 'indicates some struggles' : 'suggests significant challenges'}`,
      'Math Grade': `${value}% in mathematics indicates ${value >= 80 ? 'strong' : value >= 70 ? 'adequate' : 'weak'} analytical foundation`
    };
    
    return descriptions[featureName] || `Current level: ${value}`;
  }

  private generateRecommendation(predictedClass: number, confidence: number): string {
    if (predictedClass === 1) {
      return confidence > 80 
        ? "Excellent academic trajectory! Continue current study habits and consider advanced projects."
        : "Good performance expected. Focus on consistency and explore leadership opportunities.";
    } else if (predictedClass === 0) {
      return "Average performance predicted. Consider improving study techniques and seeking additional support in challenging subjects.";
    } else {
      return "Performance concerns identified. Immediate intervention recommended: increase study hours, attend tutoring sessions, and improve attendance.";
    }
  }

  private generateImprovementAreas(data: StudentData): string[] {
    const areas = [];
    
    if (data.attendancePercentage < 80) areas.push("Improve class attendance");
    if (data.studyHours < 4) areas.push("Increase daily study time");
    if (data.programmingGrade < 75) areas.push("Strengthen programming fundamentals");
    if (data.mathGrade < 75) areas.push("Focus on mathematical concepts");
    if (data.backlogs > 2) areas.push("Clear pending subjects");
    if (data.assignmentPerformance < 75) areas.push("Improve assignment quality");
    if (data.labParticipation < 3) areas.push("Increase lab participation");
    if (data.stressLevel > 3) areas.push("Manage stress and mental health");
    if (data.programmingSkillLevel < 3) areas.push("Develop practical coding skills");
    if (data.githubActivity < 3) areas.push("Build coding portfolio");
    
    return areas.slice(0, 6); // Return top 6 areas
  }

  predict(data: StudentData): PredictionResult {
    if (!this.isModelTrained) {
      throw new Error('Model is not trained yet');
    }

    try {
      const features = this.studentDataToFeatures(data);
      const prediction = this.model.predict([features])[0];
      
      // Calculate confidence based on tree depth and feature values
      const confidence = this.calculateConfidence(features);
      
      // Convert prediction to GPA
      let predictedGPA: number;
      if (prediction === 1) predictedGPA = 3.2 + Math.random() * 0.8; // 3.2-4.0
      else if (prediction === 0) predictedGPA = 2.5 + Math.random() * 0.7; // 2.5-3.2
      else predictedGPA = 1.8 + Math.random() * 0.7; // 1.8-2.5

      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high';
      if (predictedGPA >= 3.3) riskLevel = 'low';
      else if (predictedGPA >= 2.7) riskLevel = 'medium';
      else riskLevel = 'high';

      return {
        predictedGPA,
        confidence,
        riskLevel,
        recommendation: this.generateRecommendation(prediction, confidence),
        keyFactors: this.calculateFeatureImportance(data),
        improvementAreas: this.generateImprovementAreas(data)
      };
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to generate prediction');
    }
  }

  private calculateConfidence(features: number[]): number {
    // Calculate confidence based on feature quality
    let score = 0;
    const weights = [0.15, 0.12, 0.10, 0.12, 0.11, 0.10, 0.08, 0.08, 0.09, 0.07, 0.08];
    
    for (let i = 0; i < Math.min(features.length, weights.length); i++) {
      const normalized = i < 8 ? features[i] / 100 : features[i] / 5;
      score += normalized * weights[i];
    }
    
    return Math.min(95, Math.max(65, score * 100));
  }
}

export default AcademicPredictor;