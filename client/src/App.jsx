import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import SignUp from './Pages/SignUp/SignUp';
import SignIn from './Pages/SignIn/SignIn';
import Header from './Pages/Universal/Header';
import Profile from './Pages/Profile/Profile';
import AfterLoginRoutes from './Pages/ProtectedRoutes/AfterLoginRoutes';
import Error404Page from './Pages/ErrorPage/Error404Page';
import BeforeLoginRoutes from './Pages/ProtectedRoutes/BeforeLoginRoutes';
import CaseDetailPage from './Pages/SingleCase/CaseDetailPage';
import EditProfile from './Pages/Profile/Editprofile';
import Footer from './Pages/Universal/Footer';
import ChatBot from './Pages/component/Chatbot';


export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<AfterLoginRoutes> <Home/> </AfterLoginRoutes>}/>
        <Route exact path="/profile" element={<AfterLoginRoutes> <Profile/> </AfterLoginRoutes> }/>
        <Route exact path="/EditProfile" element={<AfterLoginRoutes> <EditProfile/> </AfterLoginRoutes>}/>
        <Route exact path="/casedetails/:id" element={<AfterLoginRoutes> <CaseDetailPage/> </AfterLoginRoutes> }/>
        <Route exact path="/signin" element={<BeforeLoginRoutes> <SignIn/> </BeforeLoginRoutes>}/>
        <Route exact path="/signup" element={<BeforeLoginRoutes><SignUp/></BeforeLoginRoutes> }/>
        <Route exact path="/chatbot" element={<ChatBot/> }/>
        <Route path="*" element={<Error404Page/>}/>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}
