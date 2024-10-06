import React from 'react';
import { Button, List } from '../../styles';
import { AddButton, ListItemContainer, ListItemSection } from './ListItem.styles';
import { Item } from '../../types';
import { ExpandButton } from '../ExpandButton/ExpandButton';

type ListItemProps = {
  item: Item;
  onAddItem: (parentId: number) => void;
  onDeleteItem: (id: number) => void;
  onSetExpanded: React.Dispatch<React.SetStateAction<number[]>>;
  isRoot: boolean;
  expandedIds: number[];
};

const ListItem: React.FC<ListItemProps> = ({
  item,
  onAddItem,
  onDeleteItem,
  onSetExpanded,
  isRoot,
  expandedIds,
}) => {
  const isExpanded = expandedIds.includes(item.id);

  const handleAdd = (id: number) => {
    onAddItem(id);
    onSetExpanded((prev) => [...prev, id]);
  };

  const handleExpand = () => {
    if (isExpanded) {
      onSetExpanded((prev) => prev.filter((id) => id !== item.id));
    } else {
      onSetExpanded((prev) => [...prev, item.id]);
    }
  };

  return (
    <ListItemContainer>
      <ListItemSection>
        <ExpandButton
          isHidden={!item.children.length}
          onExpand={handleExpand}
          isExpanded={isExpanded}
        />
        {item.name}
        <AddButton onClick={() => handleAdd(item.id)}>✚</AddButton>
        {!isRoot && <Button onClick={() => onDeleteItem(item.id)}>🗑</Button>}
      </ListItemSection>
      {isExpanded && item.children.length > 0 && (
        <List>
          {item.children.map((child) => (
            <ListItem
              key={child.id}
              item={child}
              onAddItem={onAddItem}
              onDeleteItem={onDeleteItem}
              expandedIds={expandedIds}
              onSetExpanded={onSetExpanded}
              isRoot={false}
            />
          ))}
        </List>
      )}
    </ListItemContainer>
  );
};

export default ListItem;
