import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Introduction from './pages/Introduction';
import ChurchIntro from './pages/ChurchIntro';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AdminAbout from './admin/AdminAbout';
import AdminGallery from './admin/AdminGallery';
import AdminMessages from './admin/AdminMessages';
import AdminEvents from './admin/AdminEvents';
import ProtectedRoute from './components/ProtectedRoute';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public website */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Introduction />} />
            <Route path="home" element={<Home />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="church-intro" element={<ChurchIntro />} />
            <Route path="about" element={<About />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="contact" element={<Contact />} />
          </Route>

          {/* Admin auth */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected admin panel */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="gallery" element={<AdminGallery />} />
            <Route path="messages" element={<AdminMessages />} />
            <Route path="events" element={<AdminEvents />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
