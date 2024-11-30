import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogIn from "./pages/Login";
import UserDashboard from "./pages/user/UserDashboard";
import UserRoute from "./component/userRoute";
import Layout from './pages/global/Layout';
import UserJobsHistory from "./pages/user/UserJobsHistory";
import UserInfoDashboard from './pages/user/UserInfoDashboard';
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./component/AdminRoute";
import SingleJob from "./pages/SingleJob";
import DashUsers from "./pages/admin/DashUsers";
import DashJobs from "./pages/admin/DashJobs";
import AllJobs from "./pages/user/Alljobs";
import Register from "./pages/Register";
import EditUserProfileForm from "./pages/user/EditUserProfileForm";
import AppliedJobDetail from './pages/AppliedJobDetail'
import DashCreateJob from './pages/admin/DashCreateJob'
import DashEditJob from './pages/admin/DashEditJob';
// import AdminJobDetail from "./pages/admin/AdminJobDetail";
import DashCategory from "./pages/admin/DashCategory";
import DashEditCategory from './pages/admin/DashEditCategory';
import DashCreateCategory from "./pages/admin/DashCreateCategory";
import DashUserProfile from "./pages/admin/DashUserProfile";
import UploadResume from "./component/UploadResume";

import { createTheme } from '@mui/material/styles';
import { themeColors } from './theme'
import { useSelector } from 'react-redux';
import { useMemo } from 'react';

//HOC
const UserDashboardHOC = Layout(UserDashboard);
const UserJobsHistoryHOC = Layout(UserJobsHistory);
const UserInfoDashboardHOC = Layout(UserInfoDashboard);
const AdminDashboardHOC = Layout(AdminDashboard);
const DashUsersHOC = Layout(DashUsers);
const DashJobsHOC = Layout(DashJobs);
const AllJobsHOC = Layout(AllJobs);
const EditProfileHOC = Layout(EditUserProfileForm);
const AppliedJobDetailHOC = Layout(AppliedJobDetail);
const DashCreateJobHOC = Layout(DashCreateJob);
const DashAdminEditJobHOC = Layout(DashEditJob);
// const AdminJobDetailHOC = Layout(AdminJobDetail);
const DashCategoryHOC= Layout(DashCategory);
const DashEditCategoryHOC= Layout(DashEditCategory);
const DashCreateCategoryHOC= Layout(DashCreateCategory);
const DashUserProfileHOC= Layout(DashUserProfile);

const App = () => {
  const { mode } = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeColors(mode)), [mode]);
  return (
    <>
      <ToastContainer />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/location/:location" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path='/register' element={<Register />} />
            <Route path='/job/:id' element={<SingleJob />} />
            <Route path='/job/:id/appliedJobDetail' element={<UserRoute><AppliedJobDetailHOC /></UserRoute>} />
            <Route path='/admin/dashboard' element={<AdminRoute><AdminDashboardHOC /></AdminRoute>} />
            <Route path='/admin/users' element={<AdminRoute><DashUsersHOC /></AdminRoute>} />
            <Route path='/admin/jobs' element={<AdminRoute><DashJobsHOC /></AdminRoute>}/>
            <Route path='/admin/job/create' element={<AdminRoute><DashCreateJobHOC /></AdminRoute>}/>
            <Route path='/admin/edit/job/:id' element={<AdminRoute><DashAdminEditJobHOC /></AdminRoute>} />
            <Route path='/admin/category' element={<AdminRoute><DashCategoryHOC /></AdminRoute>}/>
            <Route path='/admin/edit/category/:id' element={<AdminRoute><DashEditCategoryHOC /></AdminRoute>}/>
            <Route path='/admin/category/create' element={<AdminRoute><DashCreateCategoryHOC /></AdminRoute>} />
            <Route path='/admin/user/profile/:id' element={<AdminRoute><DashUserProfileHOC></DashUserProfileHOC></AdminRoute>}/>
            <Route path="/user/dashboard" element={<UserRoute><UserDashboardHOC /></UserRoute>} />
            <Route path="/user/jobs" element={<UserRoute><UserJobsHistoryHOC /></UserRoute>} />
            <Route path='/user/info' element={<UserRoute>< UserInfoDashboardHOC /></UserRoute>} />
            <Route path='/user/edit/:id' element={<UserRoute>< EditProfileHOC /></UserRoute>} />
            <Route path="/alljobs" element={<UserRoute><AllJobsHOC /></UserRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
