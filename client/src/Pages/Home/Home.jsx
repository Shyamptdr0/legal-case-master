import React, { useState } from 'react';
import { useCaseContext } from '../Context/CaseContext';
import CreateNewCaseModal from './CreateNewCaseModal';
import { Link } from 'react-router-dom';

const Tooltip = ({ children, title }) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white py-2 px-4 rounded-md z-50">
        {title}
      </div>
    </div>
  );
};

const Home = () => {
  const { cases, deleteCase, createCase } = useCaseContext();
  const [showModal, setShowModal] = useState(false);
  const [newCaseData, setNewCaseData] = useState({ name: '', description: '', date: '', time: '' }); // Add date and time to initial state

  const handleCreateCase = () => {
    createCase(newCaseData.name, newCaseData.description, newCaseData.date, newCaseData.time); // Pass date and time to createCase function
    setShowModal(false);
    // Reset form fields after creating a case
    setNewCaseData({ name: '', description: '', date: '', time: '' });
  };

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the formatting as per your requirements
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowModal(true)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none">
          Add new Case
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {cases.map((caseItem) => {
          // Find the latest date from the dates array
          const lastDate = caseItem?.dates.length && caseItem?.dates?.reduce((prev, current) => (new Date(prev?.date) > new Date(current?.date)) ? prev : current);

          return (
            <div key={caseItem._id} className="bg-white rounded-lg shadow-md p-4">
              <Link  to={`/casedetails/${caseItem._id}`}>
                <div className="text-xl font-semibold mb-2">{caseItem.name}</div>
                <p className="text-gray-600 mb-2">{caseItem?.description}</p>
                {/* Display formatted date */}
                <p className="text-gray-600 mb-2">Date: {lastDate && formatDate(lastDate.date)}</p>
                <p className="text-gray-600 mb-2">Last Updated: {lastDate?.description}</p>
              </Link>
              <button onClick={() => deleteCase(caseItem._id)} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none">
                Delete
              </button>
            </div>
          );
        })}
      </div>

      {showModal && (<CreateNewCaseModal newCaseData={newCaseData} setNewCaseData={setNewCaseData} handleCreateCase={handleCreateCase} setShowModal={setShowModal} />)}

      {/* Styling and positioning the button */}
      <div className="fixed bottom-4 right-4 z-50">
      <Tooltip title="Your personal law assistant">
        <a
          href="https://lawyer-chatbot.onrender.com/"
          // target="_blank"
          rel="noopener noreferrer"
          className="block bg-blue-500 p-2 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <span role="img" aria-label="Bot" className="text-white text-lg">
            🤖
          </span>
        </a>
      </Tooltip>
    </div>
    </div>
  );
};

export default Home;
