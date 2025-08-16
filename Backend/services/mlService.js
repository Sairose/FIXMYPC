
export const positiveWords = [
  "good", "great", "awesome", "amazing", "fantastic", "excellent", "nice", "helpful",
  "friendly", "perfect", "wonderful", "best", "love", "loved", "like", "liked", "well",
  "superb", "brilliant", "fast", "quick", "smooth", "reliable", "trustworthy", "supportive",
  "cool", "outstanding", "impressive", "delightful", "satisfied", "happy", "joyful", "smiling",
  "awesome service", "thank you", "grateful", "appreciate", "sweet", "clean", "professional",
  "on time", "highly recommend", "amazing experience", "top", "neat", "beautiful", "calm",
  "enjoyed", "easy", "secure", "safe", "wow", "yay", "respectful", "helped", "solution", "solved",
  "cheerful", "exceptional", "peaceful", "affordable", "quick fix", "instant", "great job",
  "good work", "super", "value", "top-notch", "flawless", "dependable", "up to mark", "kind",
  "thankful", "graceful", "neat work", "prompt", "efficient", "enthusiastic", "engaging", "fun",
  "passion", "dedicated", "motivated", "responsive", "genius", "skilled", "recommend", "achieved",
  "beneficial", "lovely", "heavenly", "blessed", "yay", "woohoo", "win", "legend", "rockstar",

  // Emojis
  "😊", "😁", "😍", "🥰", "👍", "👏", "💯", "❤️", "🔥", "😃", "🎉", "✨", "🥳", "😎", "👌", "😇", "💪", "🙌", "🌟", "🎊", "💖"
];

export const negativeWords = [
  "bad", "worst", "rude", "late", "slow", "terrible", "poor", "unhelpful", "awful", "disappointed",
  "hate", "hated", "dislike", "angry", "frustrated", "annoying", "waste", "broken", "useless",
  "problem", "issue", "pain", "complain", "complaint", "confused", "hard", "delay", "delayed",
  "dirty", "noisy", "unprofessional", "insecure", "unsafe", "never again", "horrible", "dissatisfied",
  "mean", "not helpful", "terribly", "no response", "don't recommend", "low quality", "crap", "buggy",
  "glitch", "not working", "fake", "unreliable", "scam", "cheated", "confusing", "ignorant", "unskilled",
  "angrily", "damaged", "messed up", "stupid", "irritating",

  // Negative emojis
  "😡", "😠", "😤", "😞", "😩", "😖", "😢", "😭", "👎", "💔", "🤬", "🙄", "😒", "😬", "😓", "🫤", "😕", "😟", "😿", "🤯", "🤢", "🤮"
];

// Sigmoid function for logistic regression
const sigmoid = (z) => 1 / (1 + Math.exp(-z));

// Sentiment analyzer function
export const analyzeSentiment = (text) => {
  if (!text || typeof text !== 'string') return 'neutral';

  const words = text.toLowerCase().split(/\s+/); // split on whitespace
  let score = 0;

  for (let word of words) {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  }

  // Apply sigmoid to score
  const probability = sigmoid(score);

  if (probability > 0.6) return 'positive';
  if (probability < 0.4) return 'negative';
  return 'neutral';
};
