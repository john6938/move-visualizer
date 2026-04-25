import { MOVES } from '../config/moves';
import type { AbstractSegment } from '../types';

const findMove = (features: string[]): string => {
  for (const move of Object.keys(MOVES)) {
    if (features.includes(move)) return move;
  }
  return 'uncertain';
};

const findSubtype = (features: string[], move: string): string | undefined => {
  for (const subtype of MOVES[move] ?? []) {
    if (features.includes(subtype)) return subtype;
  }
  return undefined;
};

export const parseXmlAbstract = (text: string): AbstractSegment[] => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(text, 'text/xml');
  const parserError = doc.querySelector('parsererror');
  if (parserError) throw new Error('Failed to parse XML: ' + parserError.textContent);

  const segmentNodes = Array.from(doc.querySelectorAll('segment'));
  return segmentNodes.map(node => {
    const featuresAttr = node.getAttribute('features') ?? '';
    const features = featuresAttr.split(';').map(f => f.trim());
    const move = findMove(features);
    const subtype = findSubtype(features, move);
    return {
      content: node.textContent ?? '',
      move,
      subtype,
    };
  });
};
