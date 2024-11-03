// Simulated ML model responses
const getRandomScore = () => Math.floor(Math.random() * 100);

const getRandomIndicators = (score: number) => {
  const indicators = [
    {
      type: score >= 70 ? 'positive' : 'negative',
      text: 'Natural language patterns and flow'
    },
    {
      type: score >= 60 ? 'positive' : 'negative',
      text: 'Sentiment consistency throughout review'
    },
    {
      type: score >= 80 ? 'positive' : 'negative',
      text: 'Specific product details mentioned'
    },
    {
      type: score >= 50 ? 'positive' : 'negative',
      text: 'Review posting patterns'
    }
  ] as const;

  return indicators.slice(0, 3 + Math.floor(Math.random() * 2));
};

const getAnalysis = (score: number) => {
  if (score >= 80) {
    return 'This review exhibits natural language patterns and specific details that suggest authentic user experience. The sentiment analysis shows consistent emotional expression throughout the text.';
  } else if (score >= 50) {
    return 'While some aspects of this review appear genuine, there are potential concerns regarding the writing style and lack of specific details. Further verification may be needed.';
  } else {
    return 'Multiple red flags detected in this review, including unnatural language patterns and inconsistent sentiment. High probability of being artificially generated.';
  }
};

// Simulated API calls
export const analyzeReview = async (text: string) => {
  await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay
  const score = getRandomScore();
  return {
    score,
    indicators: getRandomIndicators(score),
    analysis: getAnalysis(score)
  };
};

export const analyzeBatch = async (reviews: string[]) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  return reviews.map(text => ({
    text,
    score: getRandomScore()
  }));
};

export const analyzeUrl = async (url: string) => {
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
  const score = getRandomScore();
  return {
    score,
    indicators: getRandomIndicators(score),
    analysis: getAnalysis(score)
  };
};