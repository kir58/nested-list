import { Item } from './types';
import { useState } from 'react';

type Props = { data: Item };

const getAllParentsId = (data: Item[]): number[] =>
  data.reduce<number[]>((acc, item) => {
    if (!item.children.length) {
      return acc;
    }
    return [...acc, item.id, ...getAllParentsId(item.children)];
  }, []);

export const useExpands = ({ data }: Props) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const onExpandAll = () => {
    if (expandedIds.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(getAllParentsId(data.children));
    }
  };

  const isEnabled = data.children.some(({ children }) => children.length);

  return {
    onExpandAll,
    expandedIds,
    setExpandedIds,
    isExpanded: !!expandedIds.length,
    isDisabled: !isEnabled,
  };
};
