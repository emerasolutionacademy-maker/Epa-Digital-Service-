import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PlatformPage } from './pages/PlatformPage';
import { OrderPage } from './pages/OrderPage';
import { AboutContactPage } from './pages/AboutContactPage';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/facebook"
                element={<PlatformPage key="facebook" platform="facebook" />}
              />
              <Route
                path="/tiktok"
                element={<PlatformPage key="tiktok" platform="tiktok" />}
              />
              <Route
                path="/youtube"
                element={<PlatformPage key="youtube" platform="youtube" />}
              />
              <Route path="/commander" element={<OrderPage />} />
              <Route path="/a-propos" element={<AboutContactPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </LanguageProvider>
    </MotionConfig>
  );
}
