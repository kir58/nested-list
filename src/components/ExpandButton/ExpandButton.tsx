import React from 'react';
import { ExpandButtonUI } from './ExpandButton.styles';

export type ExpandButtonProps = {
  onExpand: () => void;
  isExpanded: boolean;
  isHidden?: boolean;
};

export const ExpandButton: React.FC<ExpandButtonProps> = ({
  onExpand,
  isExpanded,
  isHidden,
}: ExpandButtonProps) => {
  return (
    <ExpandButtonUI $isHidden={isHidden} onClick={onExpand} $isExpand={isExpanded}>
      ›
    </ExpandButtonUI>
  );
};
