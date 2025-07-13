import React, { useState } from 'react';
import { Plus, Clock, AlertTriangle, Check, X } from 'lucide-react';
import { useList } from '../context/ListContext';

const Lists = () => {
  const { lists, currentList, createList, addItemToList, removeItemFromList, setActiveList, getAISuggestions } = useList();
  const [newListName, setNewListName] = useState('');
  const [newItem, setNewItem] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedPriority, setSelectedPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [showNewListForm, setShowNewListForm] = useState(false);

  const handleItemInput = (value: string) => {
    setNewItem(value);
    if (value.length > 0) {
      setSuggestions(getAISuggestions(value));
    } else {
      setSuggestions([]);
    }
  };

  const addItem = () => {
    if (newItem.trim() && currentList) {
      addItemToList(currentList.id, {
        name: newItem.trim(),
        category: 'General',
        priority: selectedPriority,
      });
      setNewItem('');
      setSuggestions([]);
    }
  };

  const createNewList = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName('');
      setShowNewListForm(false);
    }
  };

  const addFromPreviousList = (itemName: string) => {
    if (currentList) {
      addItemToList(currentList.id, {
        name: itemName,
        category: 'General',
        priority: 'medium',
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Lists</h1>
        <button
          onClick={() => setShowNewListForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New List</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Previous Lists */}
        <div className="lg:col-span-1">
          <h2 className="text-xl font-semibold mb-4">Previous Lists</h2>
          <div className="space-y-4">
            {lists.map((list) => (
              <div
                key={list.id}
                className={`bg-white rounded-lg shadow-md p-4 cursor-pointer transition-all duration-200 ${
                  currentList?.id === list.id ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
                }`}
                onClick={() => setActiveList(list.id)}
              >
                <h3 className="font-semibold text-lg">{list.name}</h3>
                <p className="text-gray-600 text-sm">{list.items.length} items</p>
                <p className="text-gray-500 text-xs">{list.createdAt.toLocaleDateString()}</p>
                <div className="mt-2 space-y-1">
                  {list.items.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700">{item.name}</span>
                      {currentList && currentList.id !== list.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addFromPreviousList(item.name);
                          }}
                          className="text-blue-600 hover:text-blue-800 text-xs"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  ))}
                  {list.items.length > 3 && (
                    <p className="text-xs text-gray-500">+{list.items.length - 3} more items</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Current List */}
        <div className="lg:col-span-2">
          {currentList ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">{currentList.name}</h2>
              
              {/* Add New Item */}
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-semibold mb-4">Add New Item</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter item name..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={newItem}
                      onChange={(e) => handleItemInput(e.target.value)}
                    />
                    {suggestions.length > 0 && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                            onClick={() => {
                              setNewItem(suggestion);
                              setSuggestions([]);
                            }}
                          >
                            {suggestion}
                            <span className="text-xs text-blue-600 ml-2">AI Suggestion</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="flex gap-4">
                    <select
                      value={selectedPriority}
                      onChange={(e) => setSelectedPriority(e.target.value as 'high' | 'medium' | 'low')}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="high">High Priority</option>
                      <option value="medium">Medium Priority</option>
                      <option value="low">Low Priority</option>
                    </select>
                    <button
                      onClick={addItem}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Add Item
                    </button>
                  </div>
                </div>
              </div>

              {/* Current List Items */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="font-semibold mb-4">Current List Items</h3>
                {currentList.items.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No items in this list yet. Add some items above!</p>
                ) : (
                  <div className="space-y-3">
                    {currentList.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="font-medium">{item.name}</span>
                          <div className="flex items-center space-x-2">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                item.priority === 'high' ? 'bg-red-100 text-red-800' :
                                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-green-100 text-green-800'
                              }`}
                            >
                              {item.priority}
                            </span>
                            {item.expiryAlert && (
                              <div className="flex items-center text-orange-600">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                <Clock className="w-4 h-4" />
                              </div>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItemFromList(currentList.id, item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">Select a list from the left or create a new one</p>
              <button
                onClick={() => setShowNewListForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Create New List
              </button>
            </div>
          )}
        </div>
      </div>

      {/* New List Modal */}
      {showNewListForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Create New List</h3>
            <input
              type="text"
              placeholder="List name..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
            />
            <div className="flex space-x-4">
              <button
                onClick={createNewList}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex-1"
              >
                Create
              </button>
              <button
                onClick={() => {
                  setShowNewListForm(false);
                  setNewListName('');
                }}
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lists;