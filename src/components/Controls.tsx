import React from 'react';
import type { DomainConfig } from '../types';

interface ControlsProps {
  domains: DomainConfig[];
  currentDomain: string;
  abstractIndex: number;
  totalAbstracts: number;
  showAnnotation: boolean;
  showSubtype: boolean;
  onDomainChange: (key: string) => void;
  onPrev: () => void;
  onNext: () => void;
  onIndexChange: (idx: number) => void;
  onToggleAnnotation: () => void;
  onToggleSubtype: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  domains,
  currentDomain,
  abstractIndex,
  totalAbstracts,
  showAnnotation,
  showSubtype,
  onDomainChange,
  onPrev,
  onNext,
  onIndexChange,
  onToggleAnnotation,
  onToggleSubtype,
}) => {
  const handleIndexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val) && val >= 1 && val <= totalAbstracts) {
      onIndexChange(val - 1);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-3 flex flex-wrap gap-4 items-center">

      {/* Domain selector */}
      <div className="flex items-center gap-2">
        <label className="text-sm font-medium text-gray-600" htmlFor="domain-select">
          Domain:
        </label>
        <select
          id="domain-select"
          value={currentDomain}
          onChange={e => onDomainChange(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          {domains.map(d => (
            <option key={d.key} value={d.key}>{d.label}</option>
          ))}
        </select>
      </div>

      {/* Abstract navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
          aria-label="Previous abstract"
        >
          &#8592;
        </button>
        <span className="text-sm text-gray-600 flex items-center gap-1">
          Abstract
          <input
            type="number"
            min={1}
            max={totalAbstracts}
            value={abstractIndex + 1}
            onChange={handleIndexInput}
            onFocus={e => e.target.select()}
            className="w-14 text-center text-sm border border-gray-300 rounded px-1 py-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          of {totalAbstracts}
        </span>
        <button
          onClick={onNext}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 active:bg-gray-100 transition-colors"
          aria-label="Next abstract"
        >
          &#8594;
        </button>
      </div>

      {/* Annotation toggle */}
      <button
        onClick={onToggleAnnotation}
        className={`px-4 py-1.5 text-sm rounded-md border transition-colors ${
          showAnnotation
            ? 'bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
        }`}
      >
        {showAnnotation ? 'Hide Annotations' : 'Show Annotations'}
      </button>

      {/* Subtype detail toggle — only shown when annotations are on */}
      {showAnnotation && (
        <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5" role="group" aria-label="Annotation detail">
          <button
            onClick={() => { if (showSubtype) onToggleSubtype(); }}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              !showSubtype
                ? 'bg-white shadow-sm text-gray-800 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Move only
          </button>
          <button
            onClick={() => { if (!showSubtype) onToggleSubtype(); }}
            className={`px-3 py-1 text-xs rounded-md transition-colors ${
              showSubtype
                ? 'bg-white shadow-sm text-gray-800 font-medium'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Move + Subtype
          </button>
        </div>
      )}

    </div>
  );
};

export default Controls;
