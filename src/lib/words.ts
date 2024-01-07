import type { InputData } from "@/context/TypeTest";

export function generateWords(amount: number) {
  const words = new Set<string>();
  while (words.size < amount) {
    const word = commonWords[Math.floor(Math.random() * commonWords.length)];
    words.add(word + " ");
  }
  return Array.from(words);
}


export function generateLinesOfWords(amount: number) {
  let lines = [];
  for (let i = 0; i < amount; i++) {
    lines.push(generateWords(10));
  }
  return lines;
}

export function calculateWordsPerMinute(
  inputData: InputData,
  durationInSeconds: number,
) {
  const correctChars = getTotalCorrectCharsTyped(inputData);

  return Math.round(correctChars / 5 / (durationInSeconds / 60));
}

function getTotalCorrectCharsTyped(data: InputData) {
  let total = 0;
  for (const line of data) {
    for (const word of line) {
      total += 1
      for (const char of word) {
        if (char === true) {
          total += 1;
        }
      }
    }
  }
  return total;
}

let commonWords = [
  "the",
  "of",
  "and",
  "a",
  "to",
  "in",
  "is",
  "you",
  "that",
  "it",
  "he",
  "was",
  "for",
  "on",
  "are",
  "as",
  "with",
  "his",
  "they",
  "I",
  "at",
  "be",
  "this",
  "have",
  "from",
  "or",
  "one",
  "had",
  "by",
  "word",
  "but",
  "not",
  "what",
  "all",
  "were",
  "we",
  "when",
  "your",
  "can",
  "said",
  "there",
  "use",
  "an",
  "each",
  "which",
  "she",
  "do",
  "how",
  "their",
  "if",
  "will",
  "up",
  "other",
  "about",
  "out",
  "many",
  "then",
  "them",
  "these",
  "so",
  "some",
  "her",
  "would",
  "make",
  "like",
  "him",
  "into",
  "time",
  "has",
  "look",
  "two",
  "more",
  "write",
  "go",
  "see",
  "number",
  "no",
  "way",
  "could",
  "people",
  "my",
  "than",
  "first",
  "water",
  "been",
  "call",
  "who",
  "oil",
  "its",
  "now",
  "find",
  "long",
  "down",
  "day",
  "did",
  "get",
  "come",
  "made",
  "may",
  "part",
];
