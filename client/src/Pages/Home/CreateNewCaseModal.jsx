import React, { useState, useEffect } from 'react';
import { useCaseContext } from '../Context/CaseContext';

export default function CreateNewCaseModal({ newCaseData, setNewCaseData, handleCreateCase, setShowModal }) {
   
    const [newDate, setNewDate] = useState('');
    const [newDateDescription, setNewDateDescription] = useState('');
    const [showAddDateModal, setShowAddDateModal] = useState(false);
    const { addNewDateToCase } = useCaseContext();
  
  
    const handleAddDate = () => {
        addNewDateToCase(id, { date: newDate, description: newDateDescription });
        setShowAddDateModal(false);
        setNewDate('');
        setNewDateDescription('');
        fetchCase();
      }; 
    
    
    
    
    
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded-md">
                <h2 className="text-xl font-semibold mb-4">Add New Case</h2>
                <div className="mb-4">
                    <label className="block mb-2">Name:</label>
                    <input type="text" value={newCaseData.name} onChange={(e) => setNewCaseData({ ...newCaseData, name: e.target.value })} className="w-full px-3 py-2 border rounded-md" />
                </div>
                <div className="mb-4">
                    <label className="block mb-2">Description:</label>
                    <textarea value={newCaseData.description} onChange={(e) => setNewCaseData({ ...newCaseData, description: e.target.value })} className="w-full px-3 py-2 border rounded-md" rows="4"></textarea>
                </div>
                      {/* Add new date button */}
      {/* <button onClick={() => setShowAddDateModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        Add New Date
      </button> */}

      {/* Add New Date Modal */}
      {showAddDateModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Add New Date</h2>
            {/* Calendar input */}
            <div className="mb-4">
              <label htmlFor="newDate" className="block text-gray-700">Date:</label>
              <input type="date" id="newDate" value={newDate} onChange={e => setNewDate(e.target.value)} className="form-input mt-1 block w-full" />
            </div>
            {/* Description input */}
            <div className="mb-4">
              <label htmlFor="newDateDescription" className="block text-gray-700">Description:</label>
              <textarea id="newDateDescription" value={newDateDescription} onChange={e => setNewDateDescription(e.target.value)} className="form-textarea mt-1 block w-full" rows="3"></textarea>
            </div>
            <div className="text-right">
              <button onClick={handleAddDate} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Add</button>
              <button onClick={() => setShowAddDateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
            </div>
          </div>
        </div>
      )}






                <div className="text-right">
                    <button onClick={handleCreateCase} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Create</button>
                    <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
                </div>
            </div>
        </div>
    );
}
