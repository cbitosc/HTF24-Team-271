export interface AnalysisResult {
  score: number;
  indicators: Array<{
    type: 'positive' | 'negative';
    text: string;
  }>;
  analysis: string;
}

export interface BatchResult {
  text: string;
  score: number;
}