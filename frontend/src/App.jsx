import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Introduction from './pages/Introduction';
import ChurchIntro from './pages/ChurchIntro';
import ChurchTheology from './pages/ChurchTheology';
import GopurangalImages from './pages/GopurangalImages';
import Button2Images from './pages/Button2Images';
import Button3Images from './pages/Button3Images';
import Button4Images from './pages/Button4Images';
import Button7Images from './pages/Button7Images';
import AdminLogin from './admin/AdminLogin';
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/AdminDashboard';
import AdminHome from './admin/AdminHome';
import AdminAbout from './admin/AdminAbout';
import AdminIntroduction from './admin/AdminIntroduction';
import AdminChurchIntro from './admin/AdminChurchIntro';
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
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="church-theology" element={<ChurchTheology />} />
            <Route path="introduction" element={<Introduction />} />
            <Route path="church-intro" element={<ChurchIntro />} />
            <Route path="gopurangal-images" element={<GopurangalImages />} />
            <Route path="button2-images" element={<Button2Images />} />
            <Route path="button3-images" element={<Button3Images />} />
            <Route path="button4-images" element={<Button4Images />} />
            <Route path="button7-images" element={<Button7Images />} />
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
            <Route path="introduction" element={<AdminIntroduction />} />
            <Route path="church-intro" element={<AdminChurchIntro />} />
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
