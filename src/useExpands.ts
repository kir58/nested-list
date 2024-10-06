import { Item } from './types';
import { useState } from 'react';

type Props = { data: Item };

const getAllParentsId = (data: Item): number[] =>
  data.children.reduce<number[]>((acc, item) => {
    if (!item.children.length) {
      return acc;
    }
    return [...acc, item.id, ...getAllParentsId(item)];
  }, [data.id]);

export const useExpands = ({ data }: Props) => {
  const [expandedIds, setExpandedIds] = useState<number[]>([]);

  const onExpandAll = () => {
    if (expandedIds.length) {
      setExpandedIds([]);
    } else {
      setExpandedIds(getAllParentsId(data));
    }
  };


  const isDisabled = !data.children.length

  return {
    onExpandAll,
    expandedIds,
    setExpandedIds,
    isExpanded: !!expandedIds.length,
    isDisabled,
  };
};
