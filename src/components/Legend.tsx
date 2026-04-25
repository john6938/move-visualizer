import React from 'react';
import { MOVE_DISPLAY_NAMES } from '../config/moves';
import { MOVE_COLORS } from '../config/moveColors';

const Legend: React.FC = () => (
  <div className="flex flex-wrap gap-3 px-6 py-3 bg-gray-50 border-b border-gray-200 items-center">
    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">Legend:</span>
    {Object.keys(MOVE_DISPLAY_NAMES).map(move => {
      const colors = MOVE_COLORS[move];
      return (
        <span key={move} className="flex items-center gap-1.5">
          <span className={`inline-block w-3 h-3 rounded-sm ${colors.bg} border border-gray-300`} />
          <span className={`text-xs font-medium px-2 py-0.5 rounded ${colors.badge}`}>
            {MOVE_DISPLAY_NAMES[move]}
          </span>
        </span>
      );
    })}
  </div>
);

export default Legend;
