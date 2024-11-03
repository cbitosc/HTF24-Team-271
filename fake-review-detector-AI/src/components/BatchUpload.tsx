import React, { useState } from 'react';
import { Upload, FileText, CheckCircle } from 'lucide-react';
import { analyzeBatch } from '../utils/analyzer';
import { BatchResult } from '../types';

export default function BatchUpload() {
  const [results, setResults] = useState<BatchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    try {
      const text = await file.text();
      const reviews = text.split('\n').filter(line => line.trim());
      const batchResults = await analyzeBatch(reviews);
      setResults(batchResults);
    } catch (error) {
      console.error('Error processing file:', error);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="text-center">
          <Upload className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4">
            <label htmlFor="file-upload" className="cursor-pointer">
              <span className="mt-2 block text-sm font-medium text-gray-600">
                Upload a CSV or JSON file
              </span>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                accept=".csv,.json"
                onChange={handleFileUpload}
                disabled={loading}
              />
            </label>
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Supported formats: CSV, JSON (max 5MB)
          </p>
        </div>
      </div>

      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto" />
          <p className="mt-2 text-sm text-gray-600">Processing reviews...</p>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Results</h3>
            <button
              onClick={() => setResults([])}
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Clear
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {results.map((result, index) => (
                <li key={index} className="px-4 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-gray-400" />
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        Review #{index + 1}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <CheckCircle
                        className={`h-5 w-5 ${
                          result.score >= 70 ? 'text-green-500' : 'text-red-500'
                        }`}
                      />
                      <span className="ml-2 text-sm font-medium">
                        {result.score}%
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                    {result.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}