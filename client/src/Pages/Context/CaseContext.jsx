import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CaseContext = createContext();

export const useCaseContext = () => useContext(CaseContext);

export const CaseProvider = ({ children }) => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch cases when the component mounts
    const fetchCases = async () => {
      try {
        const response = await axios.get('/api/legal/getallcases');
        setCases(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cases:', error);
      }
    };

    fetchCases();
  }, []);

  const createCase = async (name, description) => {
    try {
      const response = await axios.post('/api/legal/createcase', { name, description });
      setCases([...cases, response.data]);
    } catch (error) {
      console.error('Error creating case:', error);
    }
  };

  const updateCase = async (id, updatedCaseData) => {
    try {
      await axios.put(`/api/legal/updatecase/${id}`, updatedCaseData);
      setCases(cases.map(c => (c._id === id ? { ...c, ...updatedCaseData } : c)));
    } catch (error) {
      console.error('Error updating case:', error);
    }
  };

  const deleteCase = async (id) => {
    try {
      await axios.delete(`/api/legal/deletecase/${id}`);
      setCases(cases.filter(c => c._id !== id));
    } catch (error) {
      console.error('Error deleting case:', error);
    }
  };

  const addNewDateToCase = async (id, newDateData) => {
    try {
      await axios.post(`/api/legal/addNewDate/${id}`, newDateData);
      setCases(cases.map(c => {
        if (c._id === id) {
          return { ...c, dates: [...c.dates, newDateData] };
        }
        return c;
      }));
    } catch (error) {
      console.error('Error adding new date to case:', error);
    }
  };

  return (
    <CaseContext.Provider value={{ cases, loading, createCase, updateCase, deleteCase, addNewDateToCase }}>
      {children}
    </CaseContext.Provider>
  );
};
