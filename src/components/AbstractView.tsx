import React from 'react';
import { parseXmlAbstract } from '../utils/xmlParser';
import { MOVE_COLORS } from '../config/moveColors';
import { MOVE_DISPLAY_NAMES, SUBTYPE_DISPLAY_NAMES } from '../config/moves';
import type { AbstractSegment } from '../types';

interface AnnotatedSegmentProps {
  segment: AbstractSegment;
  showSubtype: boolean;
}

const AnnotatedSegment: React.FC<AnnotatedSegmentProps> = ({ segment, showSubtype }) => {
  const colors = MOVE_COLORS[segment.move] ?? MOVE_COLORS['uncertain'];
  const moveLabel = MOVE_DISPLAY_NAMES[segment.move] ?? segment.move;
  const subtypeLabel = segment.subtype
    ? (SUBTYPE_DISPLAY_NAMES[segment.subtype] ?? segment.subtype)
    : null;
  const badgeText =
    showSubtype && subtypeLabel ? `${moveLabel} \u2013 ${subtypeLabel}` : moveLabel;

  return (
    <span className={`${colors.bg} rounded-sm px-0.5`}>
      <span className={`inline-flex items-center text-xs font-medium px-1.5 py-0.5 rounded mr-1 whitespace-nowrap ${colors.badge}`}>
        {badgeText}
      </span>
      {segment.content}
    </span>
  );
};

interface AbstractViewProps {
  xml: string;
  showAnnotation: boolean;
  showSubtype: boolean;
  domainLabel: string;
  abstractNumber: number;
}

const AbstractView: React.FC<AbstractViewProps> = ({
  xml,
  showAnnotation,
  showSubtype,
  domainLabel,
  abstractNumber,
}) => {
  let segments: AbstractSegment[] = [];
  let parseError: string | null = null;

  try {
    segments = parseXmlAbstract(xml);
  } catch (e) {
    parseError = e instanceof Error ? e.message : 'Failed to parse abstract';
  }

  if (parseError) {
    return (
      <div className="text-red-600 bg-red-50 p-4 rounded-lg text-sm">
        Error: {parseError}
      </div>
    );
  }

  return (
    <div>
      <div className="text-xs text-gray-400 mb-4 font-medium uppercase tracking-wide">
        {domainLabel} &middot; Abstract {abstractNumber}
      </div>
      <p className="text-gray-800 leading-relaxed text-[15px]">
        {segments.map((seg, idx) => (
          <React.Fragment key={idx}>
            {showAnnotation ? (
              <AnnotatedSegment segment={seg} showSubtype={showSubtype} />
            ) : (
              <span>{seg.content}</span>
            )}
            {' '}
          </React.Fragment>
        ))}
      </p>
    </div>
  );
};

export default AbstractView;
