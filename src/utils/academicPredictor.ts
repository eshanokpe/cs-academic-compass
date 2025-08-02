import { StudentData } from '@/components/StudentDataForm';
import { PredictionResult } from '@/components/PredictionResults';

// Custom Decision Tree Node
interface TreeNode {
  featureIndex?: number;
  threshold?: number;
  left?: TreeNode;
  right?: TreeNode;
  prediction?: number;
  samples?: number;
}

// Training data - comprehensive dataset for CS academic performance
const trainingData = [
  // High performers (GPA 3.5-4.0)
  { features: [3.8, 90, 85, 90, 85, 80, 85, 0, 90, 5, 90, 4, 6, 2, 2, 4, 4, 0, 4, 1, 1, 4, 4, 4, 4], gpa: 3.85 },
  { features: [3.7, 88, 80, 85, 80, 75, 80, 1, 85, 4, 85, 4, 5, 3, 3, 3, 3, 0, 4, 0, 1, 4, 3, 4, 3], gpa: 3.65 },
  { features: [3.9, 95, 90, 95, 90, 85, 90, 0, 95, 5, 95, 5, 7, 2, 2, 4, 5, 0, 5, 1, 1, 5, 4, 5, 5], gpa: 3.95 },
  { features: [3.6, 85, 78, 82, 78, 75, 78, 1, 80, 4, 80, 3, 5, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], gpa: 3.55 },
  { features: [3.5, 82, 76, 80, 76, 72, 76, 1, 78, 4, 78, 3, 5, 2, 3, 4, 4, 0, 4, 1, 0, 4, 4, 4, 4], gpa: 3.45 },
  
  // Medium performers (GPA 2.5-3.4)
  { features: [3.2, 75, 70, 75, 70, 65, 70, 2, 70, 3, 70, 3, 4, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], gpa: 3.15 },
  { features: [3.0, 70, 65, 70, 65, 60, 65, 3, 65, 3, 65, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], gpa: 2.85 },
  { features: [3.3, 78, 72, 78, 72, 68, 72, 1, 75, 3, 75, 3, 4, 3, 3, 3, 3, 0, 3, 0, 0, 3, 3, 3, 3], gpa: 3.25 },
  { features: [2.9, 68, 62, 68, 62, 58, 62, 4, 60, 2, 60, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], gpa: 2.75 },
  { features: [3.1, 73, 67, 72, 67, 63, 67, 2, 68, 3, 68, 3, 4, 3, 3, 3, 3, 1, 3, 0, 0, 3, 3, 3, 3], gpa: 3.05 },
  
  // Low performers (GPA 1.8-2.4)
  { features: [2.5, 60, 50, 55, 50, 45, 50, 5, 50, 2, 50, 2, 2, 5, 5, 2, 1, 1, 1, 0, 0, 1, 2, 1, 1], gpa: 2.35 },
  { features: [2.3, 55, 45, 50, 45, 40, 45, 6, 45, 1, 45, 1, 1, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], gpa: 2.15 },
  { features: [2.7, 65, 55, 60, 55, 50, 55, 3, 55, 2, 55, 2, 2, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], gpa: 2.55 },
  { features: [2.1, 50, 40, 45, 40, 35, 40, 7, 40, 1, 40, 1, 1, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], gpa: 1.95 },
  { features: [2.4, 58, 48, 53, 48, 43, 48, 6, 48, 1, 48, 1, 2, 5, 5, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1], gpa: 2.25 },
  
  // Additional samples for better training
  { features: [3.4, 82, 76, 80, 76, 72, 76, 1, 78, 4, 78, 3, 5, 2, 3, 4, 4, 0, 4, 1, 0, 4, 4, 4, 4], gpa: 3.35 },
  { features: [2.8, 63, 57, 62, 57, 53, 57, 4, 58, 2, 58, 2, 3, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], gpa: 2.65 },
  { features: [3.75, 87, 82, 88, 82, 78, 82, 0, 88, 5, 88, 4, 6, 2, 2, 4, 4, 0, 4, 1, 1, 4, 4, 4, 4], gpa: 3.75 },
  { features: [2.6, 62, 52, 58, 52, 48, 52, 5, 52, 2, 52, 2, 2, 4, 4, 2, 2, 1, 2, 0, 0, 2, 2, 2, 2], gpa: 2.45 },
  { features: [3.45, 84, 78, 82, 78, 74, 78, 1, 80, 4, 80, 4, 5, 3, 3, 3, 4, 0, 4, 0, 1, 4, 3, 4, 3], gpa: 3.42 }
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

// Custom Decision Tree Implementation
class CustomDecisionTree {
  private root: TreeNode | null = null;
  private maxDepth: number = 10;
  private minSamples: number = 2;

  train(data: Array<{features: number[], gpa: number}>) {
    this.root = this.buildTree(data, 0);
  }

  private buildTree(data: Array<{features: number[], gpa: number}>, depth: number): TreeNode {
    const samples = data.length;
    
    // Base cases
    if (samples <= this.minSamples || depth >= this.maxDepth) {
      const avgGPA = data.reduce((sum, item) => sum + item.gpa, 0) / samples;
      return { prediction: avgGPA, samples };
    }

    // Find best split
    const bestSplit = this.findBestSplit(data);
    
    if (!bestSplit) {
      const avgGPA = data.reduce((sum, item) => sum + item.gpa, 0) / samples;
      return { prediction: avgGPA, samples };
    }

    // Split data
    const leftData = data.filter(item => item.features[bestSplit.featureIndex] <= bestSplit.threshold);
    const rightData = data.filter(item => item.features[bestSplit.featureIndex] > bestSplit.threshold);

    return {
      featureIndex: bestSplit.featureIndex,
      threshold: bestSplit.threshold,
      left: this.buildTree(leftData, depth + 1),
      right: this.buildTree(rightData, depth + 1),
      samples
    };
  }

  private findBestSplit(data: Array<{features: number[], gpa: number}>) {
    let bestVarianceReduction = 0;
    let bestSplit = null;
    const currentVariance = this.calculateVariance(data.map(d => d.gpa));

    for (let featureIndex = 0; featureIndex < data[0].features.length; featureIndex++) {
      const values = [...new Set(data.map(d => d.features[featureIndex]))].sort((a, b) => a - b);
      
      for (let i = 0; i < values.length - 1; i++) {
        const threshold = (values[i] + values[i + 1]) / 2;
        
        const leftData = data.filter(item => item.features[featureIndex] <= threshold);
        const rightData = data.filter(item => item.features[featureIndex] > threshold);
        
        if (leftData.length === 0 || rightData.length === 0) continue;

        const leftVariance = this.calculateVariance(leftData.map(d => d.gpa));
        const rightVariance = this.calculateVariance(rightData.map(d => d.gpa));
        
        const weightedVariance = (leftData.length * leftVariance + rightData.length * rightVariance) / data.length;
        const varianceReduction = currentVariance - weightedVariance;

        if (varianceReduction > bestVarianceReduction) {
          bestVarianceReduction = varianceReduction;
          bestSplit = { featureIndex, threshold };
        }
      }
    }

    return bestSplit;
  }

  private calculateVariance(values: number[]): number {
    if (values.length === 0) return 0;
    const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / values.length;
    return variance;
  }

  predict(features: number[]): number {
    if (!this.root) throw new Error('Model not trained');
    return this.predictNode(this.root, features);
  }

  private predictNode(node: TreeNode, features: number[]): number {
    if (node.prediction !== undefined) {
      return node.prediction;
    }

    if (node.featureIndex !== undefined && node.threshold !== undefined) {
      if (features[node.featureIndex] <= node.threshold) {
        return node.left ? this.predictNode(node.left, features) : 2.5;
      } else {
        return node.right ? this.predictNode(node.right, features) : 2.5;
      }
    }

    return 2.5; // Default fallback
  }

}

class AcademicPredictor {
  private model: CustomDecisionTree;
  private isModelTrained: boolean = false;

  constructor() {
    this.model = new CustomDecisionTree();
    this.trainModel();
  }

  private trainModel() {
    try {
      console.log('Training model with custom decision tree...');
      this.model.train(trainingData);
      this.isModelTrained = true;
      console.log('Model training completed successfully');
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

    // Calculate relative importance based on feature values and research-based weights
    const weights = [
      0.15, // High School GPA
      0.12, // Entrance Exam Score  
      0.10, // Math Grade
      0.12, // Programming Grade
      0.11, // Data Structures Grade
      0.10, // Algorithms Grade
      0.08, // English Grade
      -0.08, // Backlogs (negative impact)
      0.09, // Attendance %
      0.07, // Lab Participation
      0.08, // Assignment Performance
      0.06, // Semester Trend
      0.05, // Study Hours
      0.03, // Extracurricular Activity
      -0.04, // Stress Level (negative impact)
      0.04, // Parental Education
      0.04, // Financial Support
      -0.03, // Part-time Job (negative impact)
      0.07, // Programming Skill
      0.05, // Hackathon Participation
      0.06, // Internship Experience
      0.05, // GitHub Activity
      0.04, // Peer Influence
      0.05, // Faculty Feedback
      0.04  // Learning Resources
    ];
    
    for (let i = 0; i < features.length; i++) {
      // Normalize features based on their typical ranges
      let normalizedFeature: number;
      if (i === 0) { // High School GPA (0-4)
        normalizedFeature = features[i] / 4;
      } else if (i >= 1 && i <= 7) { // Exam scores and grades (0-100)
        normalizedFeature = features[i] / 100;
      } else if (i === 8) { // Attendance percentage (0-100)
        normalizedFeature = features[i] / 100;
      } else { // Other features (1-5 scale)
        normalizedFeature = features[i] / 5;
      }
      
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

  private generateRecommendation(predictedGPA: number, confidence: number): string {
    if (predictedGPA >= 3.5) {
      return confidence > 80 
        ? "Excellent academic trajectory! Continue current study habits and consider advanced projects."
        : "Good performance expected. Focus on consistency and explore leadership opportunities.";
    } else if (predictedGPA >= 2.7) {
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
      console.log('Generating prediction...');
      const features = this.studentDataToFeatures(data);
      const predictedGPA = this.model.predict(features);
      
      console.log('Predicted GPA:', predictedGPA);
      
      // Calculate confidence based on feature quality
      const confidence = this.calculateConfidence(features);
      
      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high';
      if (predictedGPA >= 3.3) riskLevel = 'low';
      else if (predictedGPA >= 2.7) riskLevel = 'medium';
      else riskLevel = 'high';

      const result = {
        predictedGPA,
        confidence,
        riskLevel,
        recommendation: this.generateRecommendation(predictedGPA, confidence),
        keyFactors: this.calculateFeatureImportance(data),
        improvementAreas: this.generateImprovementAreas(data)
      };

      console.log('Prediction result:', result);
      return result;
    } catch (error) {
      console.error('Prediction error:', error);
      throw new Error('Failed to generate prediction');
    }
  }

  private calculateConfidence(features: number[]): number {
    // Calculate confidence based on feature quality and consistency
    let score = 0;
    let weightSum = 0;
    
    // Academic performance factors (higher weight)
    const academicFeatures = [0, 1, 2, 3, 4, 5, 6]; // GPA, exam scores, grades
    const academicWeight = 0.4;
    
    for (const i of academicFeatures) {
      const normalized = i === 0 ? features[i] / 4 : features[i] / 100;
      score += normalized * academicWeight;
      weightSum += academicWeight;
    }
    
    // Engagement factors (medium weight)
    const engagementFeatures = [8, 9, 10, 11]; // Attendance, lab, assignment, trend
    const engagementWeight = 0.3;
    
    for (const i of engagementFeatures) {
      const normalized = i === 8 ? features[i] / 100 : features[i] / 5;
      score += normalized * engagementWeight;
      weightSum += engagementWeight;
    }
    
    // Other factors (lower weight)
    const otherWeight = 0.1;
    for (let i = 12; i < features.length; i++) {
      const normalized = features[i] / 5;
      score += normalized * otherWeight;
      weightSum += otherWeight;
    }
    
    const normalizedScore = score / weightSum;
    return Math.min(95, Math.max(65, normalizedScore * 100));
  }
}

export default AcademicPredictor;