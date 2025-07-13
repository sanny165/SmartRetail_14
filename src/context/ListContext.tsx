import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ListItem {
  id: string;
  name: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  expiryAlert?: Date;
  completed?: boolean;
}

export interface ShoppingList {
  id: string;
  name: string;
  items: ListItem[];
  createdAt: Date;
  isActive?: boolean;
}

interface ListContextType {
  lists: ShoppingList[];
  currentList: ShoppingList | null;
  createList: (name: string) => void;
  addItemToList: (listId: string, item: Omit<ListItem, 'id'>) => void;
  removeItemFromList: (listId: string, itemId: string) => void;
  setActiveList: (listId: string) => void;
  getAISuggestions: (input: string) => string[];
  toggleItemCompleted: (listId: string, itemId: string) => void;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lists, setLists] = useState<ShoppingList[]>([
    {
      id: '1',
      name: 'Weekly Groceries',
      items: [
        { id: '1', name: 'Milk', category: 'Dairy', priority: 'high' },
        { id: '2', name: 'Bread', category: 'Bakery', priority: 'medium' },
        { id: '3', name: 'Apples', category: 'Fruits', priority: 'low' },
      ],
      createdAt: new Date('2025-01-01'),
    },
    {
      id: '2',
      name: 'Previous Shopping',
      items: [
        { id: '4', name: 'Rice', category: 'Grains', priority: 'high' },
        { id: '5', name: 'Chicken', category: 'Meat', priority: 'high' },
        { id: '6', name: 'Tomatoes', category: 'Vegetables', priority: 'medium' },
      ],
      createdAt: new Date('2024-12-25'),
    },
  ]);
  const [currentList, setCurrentList] = useState<ShoppingList | null>(null);

  const createList = (name: string) => {
    const newList: ShoppingList = {
      id: Date.now().toString(),
      name,
      items: [],
      createdAt: new Date(),
      isActive: true,
    };
    setLists(prev => [newList, ...prev]);
    setCurrentList(newList);
  };

  const addItemToList = (listId: string, item: Omit<ListItem, 'id'>) => {
    const newItem: ListItem = {
      ...item,
      id: Date.now().toString(),
    };
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, items: [...list.items, newItem] }
          : list
      )
    );
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? { ...list, items: list.items.filter(item => item.id !== itemId) }
          : list
      )
    );
  };

  const setActiveList = (listId: string) => {
    const list = lists.find(l => l.id === listId);
    setCurrentList(list || null);
  };

  const getAISuggestions = (input: string): string[] => {
    // AI suggestions based on previous lists
    const allItems = lists.flatMap(list => list.items.map(item => item.name));
    const uniqueItems = [...new Set(allItems)];
    return uniqueItems.filter(item =>
      item.toLowerCase().includes(input.toLowerCase())
    ).slice(0, 5);
  };

  const toggleItemCompleted = (listId: string, itemId: string) => {
    setLists(prev =>
      prev.map(list =>
        list.id === listId
          ? {
              ...list,
              items: list.items.map(item =>
                item.id === itemId
                  ? { ...item, completed: !item.completed }
                  : item
              )
            }
          : list
      )
    );
  };

  return (
    <ListContext.Provider value={{
      lists,
      currentList,
      createList,
      addItemToList,
      removeItemFromList,
      setActiveList,
      getAISuggestions,
      toggleItemCompleted,
    }}>
      {children}
    </ListContext.Provider>
  );
};

export const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within ListProvider');
  }
  return context;
};