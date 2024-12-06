import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteForReg from './components/ProtectedRouteForReg';
import LandingPage from './components/LandingPage/LandingPage';
import ApplicantDashboard from './components/ApplicantDashboard/ApplicantDashboard';
import VerifyEmail from './components/LandingPage/HomeSection/VerifyEmail';
import UserSearch from './components/RegistrarAndAdmin/Registrar/UserSearch';
import RegistrarLandingPage from './components/RegistrarAndAdmin/LandingPage';
import PendingRegistrarAccounts from './components/RegistrarAndAdmin/AdminAccount/ReviewPendingRegistrarAccounts';
import ScheduleSearch from './components/RegistrarAndAdmin/Registrar/RegistrarScheduleSearch';
import CreateExaminationDetails from './components/RegistrarAndAdmin/AdminAccount/CreateExaminationDetails';
import RegistrarExamScheduling from './components/RegistrarAndAdmin/Registrar/RegistrarExamScheduling';
import ExaminationManagement from './components/RegistrarAndAdmin/Registrar/RegistrarManageExamination';
import RegistrarAndAdminDasboard from './components/RegistrarAndAdmin/Dashboard';
import ApplicantsPerDept  from './components/DataAnalytics/ApplicantsPerDept';
import ApplicantsPerStrand  from './components/DataAnalytics/ApplicantsPerStrand';
import DistrictsCount  from './components/DataAnalytics/DistrictsCount';
import NumberOfTotalApplicants  from './components/DataAnalytics/NumberOfTotalApplicants';
import PublicOrPrivate  from './components/DataAnalytics/PublicOrPrivate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" 
          element={
            <ProtectedRoute>
              <ApplicantDashboard />
            </ProtectedRoute>
          }
        />
        
        <Route path="/api/verify-email/:token" element={<VerifyEmail />} />

        <Route path="/registrar-landing-page" element={<RegistrarLandingPage />} />
        <Route path="/registrar-admin-dashboard" 
          element={
            <ProtectedRouteForReg>
              <RegistrarAndAdminDasboard />
            </ProtectedRouteForReg>
          } 
        />

        {/* <Route path="/user-search" element={<UserSearch />} />
        <Route path="/review-pending-registrar-accounts" element={<PendingRegistrarAccounts />} />
        <Route path="/schedule-search" element={<ScheduleSearch />} />
        <Route path="/create-examination-details" element={<CreateExaminationDetails />} />
        <Route path="/give-examination-schedule" element={<RegistrarExamScheduling />} />
        <Route path="/examination-management" element={<ExaminationManagement />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
