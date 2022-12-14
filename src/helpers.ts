import { IData } from './types';

interface ISpeechesOnTopic {
  [k: string]: number;
}

interface ISpeechesPerPolitian {
  [k: string]: number;
}

// Extract request param "url"
const extractUrls = (params: string | string[]) => {
  return Array.isArray(params) ? params : [params];
};

// 1. Which politician gave the most speeches in a specific year?
const mostSpeechesIn = (year: number, data: IData[]) => {
  let speechesPerPolitican: ISpeechesPerPolitian = {};
  let politicianWithMostSpeeches;

  // Count speeches per politian
  data.forEach((speech) => {
    if (speech.Date.getFullYear() !== year) return;

    if (speech.Speaker in speechesPerPolitican) {
      speechesPerPolitican[`${speech.Speaker}`] += 1;
    } else {
      speechesPerPolitican[`${speech.Speaker}`] = 1;
    }
  });

  if (Object.keys(speechesPerPolitican).length < 1) return null;

  // Get politian with most speeches
  politicianWithMostSpeeches = Object.keys(speechesPerPolitican).reduce(
    (prev, current) => {
      return speechesPerPolitican[prev] > speechesPerPolitican[current]
        ? prev
        : current;
    },
  );

  return politicianWithMostSpeeches;
};

// 2. Which politician gave the most speeches on the topic „Internal Security"?
const mostSpeechesOnTopic = (topic: string, data: IData[]) => {
  let speechesOnTopic: ISpeechesOnTopic = {};
  let politianWithMostSpeechesOnTopic;

  // Collect all entries with speeches about "Internal security"
  data.forEach((speech) => {
    if (speech.Topic !== topic) return;

    if (topic in speech) {
      speechesOnTopic[`${speech.Speaker}`] += 1;
    } else {
      speechesOnTopic[`${speech.Speaker}`] = 1;
    }
  });

  if (Object.keys(speechesOnTopic).length < 1) return null;

  // Create object with
  // key -> topic; value -> count
  politianWithMostSpeechesOnTopic = Object.keys(speechesOnTopic).reduce(
    (prev, current) => {
      return speechesOnTopic[prev] > speechesOnTopic[current] ? prev : current;
    },
  );

  return politianWithMostSpeechesOnTopic;
};

// 3. Which politician used the fewest words (in total)?
const viewestWordsInTotal = (data: IData[]) => {
  let politian;

  const numberOfWords = data.reduce((prev, current) => {
    if (prev.Words < current.Words) {
      politian = prev.Speaker;
      return prev;
    } else {
      politian = current.Speaker;
      return current;
    }
  });

  return politian;
};

export {
  extractUrls,
  mostSpeechesIn,
  mostSpeechesOnTopic,
  viewestWordsInTotal,
};
