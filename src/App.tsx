import React, { useState } from 'react';
import { Button, Container, List } from './styles';
import ListItem from './components/ListItem/ListItem';
import { ROOT } from './constants';
import { Item } from './types';
import { useExpands } from './useExpands';

const App: React.FC = () => {
  const [data, setData] = useState<Item>(ROOT);

  const handleAddItem = (parentId: number) => {
    const date =  Date.now();
    const newItem: Item = {
      id: date,
      name: `Child ${date}`,
      children: [],
    };

    const addRecursively = (item: Item): Item => {
      if (item.id === parentId) {
        return { ...item, children: [...item.children, newItem] };
      }
      return {
        ...item,
        children: item.children.map((child) => addRecursively(child)),
      };
    };

    setData(addRecursively);
  };

  const handleDeleteItem = (id: number) => {
    const deleteRecursively = (item: Item): Item | null => {
      if (item.id === id) {
        return null;
      }
      const filteredChildren = item.children
        .map(child => deleteRecursively(child))
        .filter(child => child !== null) as Item[];
      return { ...item, children: filteredChildren };
    };

    const updatedData = deleteRecursively(data);
    if (updatedData) {
      setData(updatedData);
    }
  };

  const { isDisabled, onExpandAll, isExpanded, setExpandedIds, expandedIds } = useExpands({ data });

  return (
    <Container>
      <h1>App Nested List</h1>
      <Button disabled={isDisabled} onClick={onExpandAll}>{isExpanded ? 'Collapse All' : 'Expand All'}</Button>
      <List>
          <ListItem
            expandedIds={expandedIds}
            onSetExpanded={setExpandedIds}
            item={data}
            onAddItem={handleAddItem}
            onDeleteItem={handleDeleteItem}
            isRoot
          />
      </List>
    </Container>
  );
};

export default App;
