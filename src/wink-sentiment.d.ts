declare module 'wink-sentiment' {
  interface WinkSentimentResult {
    score: number;
    normalizedScore: number;
    tokenizedPhrase: string[];
    positive: string[];
    negative: string[];
    emoji: string[];
    tags: string[];
  }
  function winkSentiment(text: string): WinkSentimentResult;
  export = winkSentiment;
}
