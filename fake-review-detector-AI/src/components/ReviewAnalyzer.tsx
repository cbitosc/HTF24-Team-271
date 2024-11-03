import React, { useState } from 'react';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { analyzeReview } from '../utils/analyzer';
import { AnalysisResult } from '../types';

export default function ReviewAnalyzer() {
  const [review, setReview] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!review.trim()) return;
    
    setLoading(true);
    const analysis = await analyzeReview(review);
    setResult(analysis);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2">
          Enter Review Text
        </label>
        <textarea
          id="review"
          rows={6}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Paste the review text here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={loading || !review.trim()}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {loading ? 'Analyzing...' : 'Analyze Review'}
      </button>

      {result && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              {result.score >= 70 ? (
                <CheckCircle className="h-6 w-6 text-green-500" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-500" />
              )}
              <span className="font-medium">Authenticity Score</span>
            </div>
            <span className="text-lg font-bold">{result.score}%</span>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-gray-900">Key Indicators</h4>
            <ul className="space-y-2">
              {result.indicators.map((indicator, index) => (
                <li
                  key={index}
                  className="flex items-center space-x-2 text-sm text-gray-600"
                >
                  <span className={`w-2 h-2 rounded-full ${
                    indicator.type === 'positive' ? 'bg-green-500' : 'bg-red-500'
                  }`} />
                  <span>{indicator.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-2">Detailed Analysis</h4>
            <p className="text-sm text-gray-600">{result.analysis}</p>
          </div>
        </div>
      )}
    </div>
  );
}