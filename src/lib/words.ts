import type { InputData } from "@/context/TypeTest";

// export function generateWords(amount: number): string[] {
//   const words = new Set<string>();
//   while (words.size < amount) {
//     const word = commonWords[Math.floor(Math.random() * commonWords.length)];
//     words.add(word + " ");
//   }
//   return Array.from(words);
// }

export function generateWords(maxCharacters: number): string[] {
  const words = new Set<string>();
  let totalLength = 0;

  while (totalLength < maxCharacters) {
    const word = commonWords[Math.floor(Math.random() * commonWords.length)];

    // Check if the word is already in the set
    if (!words.has(word)) {
      // Calculate new length including the word and a space (if it's not the first word)
      const newLength = totalLength + word.length + (words.size > 0 ? 1 : 0);

      if (newLength <= maxCharacters) {
        words.add(word + " ");
        totalLength = newLength;
      } else {
        break; // Break the loop if adding another word would exceed the limit
      }
    }
  }

  return Array.from(words);
}

export function generateLinesOfWords(amount: number) {
  let lines = [];
  for (let i = 0; i < amount; i++) {
    lines.push(generateWords(50));
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
      total += 1;
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
