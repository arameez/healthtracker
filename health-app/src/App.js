import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import LoginPage from './components/login/LoginPage';
import UploadImage from './components/upload/UploadImage';
import Test from './components/upload/Test';
import Header from './components/Header';
import UserRegistration from './components/login/UserRegistration';
import PatientForm from './components/patientform/PatientForm';
import ReportSubmittedView from './components/patientform/ReportSubmittedView';

const MainContent = () => {
  const location = useLocation();
  const isLoginOrRegistrationPage = location.pathname === "/" || location.pathname === "/registration";

  return (
    <div>
      {!isLoginOrRegistrationPage && <Header />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/upload" element={<UploadImage />} />
        <Route path="/show-data" element={<Test />} />
        <Route path="/registration" element={<UserRegistration />} />
        <Route path="/vwSavedReport" element={<ReportSubmittedView />} />            
      </Routes>
    </div>
  );
};

const App = () => {  
  return (    
    <Router>
      <MainContent />
    </Router>
  );
}

export default App;