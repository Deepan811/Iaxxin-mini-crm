import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AppLayout from "../components/layout/AppLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import LeadsList from "../pages/leads/LeadsList";
import CompanyList from "../pages/companies/CompanyList";
import CompanyDetail from "../pages/companies/CompanyDetail";

import Tasks from "../pages/tasks/Tasks";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/leads"
        element={
          <ProtectedRoute>
            <AppLayout>
              <LeadsList />
            </AppLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/companies"
        element={
          <ProtectedRoute>
            <AppLayout>
              <CompanyList />
            </AppLayout>
          </ProtectedRoute>
        }
      />
        <Route
            path="/companies/:id"
            element={
                <ProtectedRoute>
                <AppLayout>
                    <CompanyDetail />
                </AppLayout>
                </ProtectedRoute>
            }
            />


      <Route
        path="/tasks"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Tasks />
            </AppLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
