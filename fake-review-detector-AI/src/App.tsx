import React from 'react';
import { Upload, FileText, Link, AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';
import ReviewAnalyzer from './components/ReviewAnalyzer';
import BatchUpload from './components/BatchUpload';
import UrlParser from './components/UrlParser';
import { Tabs } from './components/Tabs';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6 text-indigo-600" />
            <span className="font-semibold text-xl text-gray-900">ReviewGuard</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Detect Fake Reviews with AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our advanced AI system analyzes reviews using linguistic patterns and metadata 
            to identify potentially fraudulent content with high accuracy.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Tabs
            tabs={[
              {
                id: 'single',
                label: 'Single Review',
                icon: <FileText className="h-5 w-5" />,
                content: <ReviewAnalyzer />
              },
              {
                id: 'batch',
                label: 'Batch Upload',
                icon: <Upload className="h-5 w-5" />,
                content: <BatchUpload />
              },
              {
                id: 'url',
                label: 'URL Parser',
                icon: <Link className="h-5 w-5" />,
                content: <UrlParser />
              }
            ]}
          />
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<CheckCircle className="h-8 w-8 text-green-500" />}
            title="99% Accuracy"
            description="Our AI model is trained on millions of verified reviews to ensure high precision detection."
          />
          <FeatureCard
            icon={<Info className="h-8 w-8 text-blue-500" />}
            title="Detailed Analysis"
            description="Get comprehensive reports with linguistic patterns and metadata insights."
          />
          <FeatureCard
            icon={<XCircle className="h-8 w-8 text-red-500" />}
            title="Real-time Detection"
            description="Instant feedback on review authenticity with confidence scoring."
          />
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { 
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-3 mb-4">
        {icon}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;