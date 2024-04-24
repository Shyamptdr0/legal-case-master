import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCaseContext } from '../Context/CaseContext';

const CaseDetailPage = () => {
  const { id } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newDateDescription, setNewDateDescription] = useState('');
  const [showAddDateModal, setShowAddDateModal] = useState(false);
  const [showUpdateCaseModal, setShowUpdateCaseModal] = useState(false);
  const [updatedCaseName, setUpdatedCaseName] = useState('');
  const [updatedCaseDescription, setUpdatedCaseDescription] = useState('');

  const { addNewDateToCase, updateCase } = useCaseContext();

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const response = await axios.get(`/api/legal/getcase/${id}`);
        response.data.dates.sort((a, b) => new Date(b.date) - new Date(a.date));
        setCaseData(response.data);
      } catch (error) {
        console.error('Error fetching case:', error);
      }
    };

    fetchCase();
  }, [id]);

  const handleAddDate = async () => {
    try {
      await addNewDateToCase(id, { date: newDate, description: newDateDescription });
      // Update case data after adding a new date
      const updatedCase = await axios.get(`/api/legal/getcase/${id}`);
      updatedCase.data.dates.sort((a, b) => new Date(b.date) - new Date(a.date));
      setCaseData(updatedCase.data);
      setShowAddDateModal(false);
      setNewDate('');
      setNewDateDescription('');
    } catch (error) {
      console.error('Error adding date to case:', error);
    }
  };

  const handleUpdateCase = async () => {
    try {
      await updateCase(id, { name: updatedCaseName, description: updatedCaseDescription });
      // Update case data after updating the case
      const updatedCase = await axios.get(`/api/legal/getcase/${id}`);
      updatedCase.data.dates.sort((a, b) => new Date(b.date) - new Date(a.date));
      setCaseData(updatedCase.data);
      setShowUpdateCaseModal(false);
      setUpdatedCaseName('');
      setUpdatedCaseDescription('');
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Case details */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-4">Case Details</h1>
        {caseData && (
          <div>
            <p><strong>Name:</strong> {caseData.name}</p>
            <p><strong>Description:</strong> {caseData.description}</p>
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Dates</h2>
              {caseData.dates.map((date, index) => (
                <div key={index}>
                  <p><strong>Date:</strong> {new Date(date.date).toLocaleDateString()}</p>
                  <p><strong>Description:</strong> {date.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add new date button */}
      <button onClick={() => setShowAddDateModal(true)} className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        Add New Date
      </button>

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
              <button onClick={handleAddDate} className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Add</button>
              <button onClick={() => setShowAddDateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Case Modal */}
      {showUpdateCaseModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Update Case</h2>
            <div className="mb-4">
              <label htmlFor="updatedCaseName" className="block text-gray-700">Name:</label>
              <input type="text" id="updatedCaseName" value={updatedCaseName} onChange={e => setUpdatedCaseName(e.target.value)} className="form-input mt-1 block w-full" />
            </div>
            <div className="mb-4">
              <label htmlFor="updatedCaseDescription" className="block text-gray-700">Description:</label>
              <textarea id="updatedCaseDescription" value={updatedCaseDescription} onChange={e => setUpdatedCaseDescription(e.target.value)} className="form-textarea mt-1 block w-full" rows="3"></textarea>
            </div>
            <div className="text-right">
              <button onClick={handleUpdateCase} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
              <button onClick={() => setShowUpdateCaseModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Update Case button */}
      <button onClick={() => setShowUpdateCaseModal(true)} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
        Update Case
      </button>
    </div>
  );
};

export default CaseDetailPage;


















// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { useCaseContext } from '../Context/CaseContext';

// const CaseDetailPage = () => {
//   const { id } = useParams();
//   const [caseData, setCaseData] = useState(null);
//   const [newDate, setNewDate] = useState('');
//   const [newDateDescription, setNewDateDescription] = useState('');
//   const [showAddDateModal, setShowAddDateModal] = useState(false);
//   const [showUpdateCaseModal, setShowUpdateCaseModal] = useState(false);
//   const [updatedCaseName, setUpdatedCaseName] = useState('');
//   const [updatedCaseDescription, setUpdatedCaseDescription] = useState('');

//   const { addNewDateToCase, updateCase } = useCaseContext();

//   useEffect(() => {
//     const fetchCase = async () => {
//       try {
//         const response = await axios.get(`/api/legal/getcase/${id}`);
//         response.data.dates.sort((a, b) => new Date(b.date) - new Date(a.date));
//         setCaseData(response.data);
//       } catch (error) {
//         console.error('Error fetching case:', error);
//       }
//     };

//     fetchCase();
//   }, [id]);

//   const handleAddDate = () => {
//     addNewDateToCase(id, { date: newDate, description: newDateDescription });
//     setShowAddDateModal(false);
//     setNewDate('');
//     setNewDateDescription('');
//     fetchCase();
//   };

//   const handleUpdateCase = () => {
//     updateCase(id, { name: updatedCaseName, description: updatedCaseDescription });
//     setShowUpdateCaseModal(false);
//     setUpdatedCaseName('');
//     setUpdatedCaseDescription('');
//     fetchCase();
    
//   };

//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Case details */}
//       <div className="mb-8">
//         <h1 className="text-2xl font-semibold mb-4">Case Details</h1>
//         {caseData && (
//           <div>
//             <p><strong>Name:</strong> {caseData.name}</p>
//             <p><strong>Description:</strong> {caseData.description}</p>
//             <div className="mt-4">
//               <h2 className="text-lg font-semibold mb-2">Dates</h2>
//               {caseData.dates.map((date, index) => (
//                 <div key={index}>
//                   <p><strong>Date:</strong> {new Date(date.date).toLocaleDateString()}</p>
//                   <p><strong>Description:</strong> {date.description}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Add new date button */}
//       <button onClick={() => setShowAddDateModal(true)} className="px-4 py-2 m-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
//         Add New Date
//       </button>

//       {/* Add New Date Modal */}
//       {showAddDateModal && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-md">
//             <h2 className="text-xl font-semibold mb-4">Add New Date</h2>
//             {/* Calendar input */}
//             <div className="mb-4">
//               <label htmlFor="newDate" className="block text-gray-700">Date:</label>
//               <input type="date" id="newDate" value={newDate} onChange={e => setNewDate(e.target.value)} className="form-input mt-1 block w-full" />
//             </div>
//             {/* Description input */}
//             <div className="mb-4">
//               <label htmlFor="newDateDescription" className="block text-gray-700">Description:</label>
//               <textarea id="newDateDescription" value={newDateDescription} onChange={e => setNewDateDescription(e.target.value)} className="form-textarea mt-1 block w-full" rows="3"></textarea>
//             </div>
//             <div className="text-right">
//               <button onClick={handleAddDate} className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Add</button>
//               <button onClick={() => setShowAddDateModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Update Case Modal */}
//       {showUpdateCaseModal && (
//         <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
//           <div className="bg-white p-6 rounded-md">
//             <h2 className="text-xl font-semibold mb-4">Update Case</h2>
//             <div className="mb-4">
//               <label htmlFor="updatedCaseName" className="block text-gray-700">Name:</label>
//               <input type="text" id="updatedCaseName" value={updatedCaseName} onChange={e => setUpdatedCaseName(e.target.value)} className="form-input mt-1 block w-full" />
//             </div>
//             <div className="mb-4">
//               <label htmlFor="updatedCaseDescription" className="block text-gray-700">Description:</label>
//               <textarea id="updatedCaseDescription" value={updatedCaseDescription} onChange={e => setUpdatedCaseDescription(e.target.value)} className="form-textarea mt-1 block w-full" rows="3"></textarea>
//             </div>
//             <div className="text-right">
//               <button onClick={handleUpdateCase} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">Update</button>
//               <button onClick={() => setShowUpdateCaseModal(false)} className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md ml-2 hover:bg-gray-400 focus:outline-none">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Update Case button */}
//       <button onClick={() => setShowUpdateCaseModal(true)} className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
//         Update Case
//       </button>
//     </div>
//   );
// };

// export default CaseDetailPage;
