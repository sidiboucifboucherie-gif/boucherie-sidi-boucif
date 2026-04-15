import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import PageSeo from './components/seo/PageSeo';
import Home from './pages/Home';
import ProductsPage from './pages/ProductsPage';
import StoryPage from './pages/StoryPage';
import DeliveryPage from './pages/DeliveryPage';
import RecipePage from './pages/RecipePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import BoutiqueHubPage from './pages/BoutiqueHubPage';
import ServiceHubPage from './pages/ServiceHubPage';
import ArtisanButcheryPage from './pages/ArtisanButcheryPage';
import BlogHubPage from './pages/BlogHubPage';
import BoeufHalalPage from './pages/BoeufHalalPage';
import VolailleHalalPage from './pages/VolailleHalalPage';
import AgneauHalalPage from './pages/AgneauHalalPage';
import ColisViandeHalalPage from './pages/ColisViandeHalalPage';
import CharcuterieMerguezPage from './pages/CharcuterieMerguezPage';
import TriperieAbatsPage from './pages/TriperieAbatsPage';
import LivraisonVilleneuvePage from './pages/LivraisonVilleneuvePage';
import LivraisonMaraussanLignanPage from './pages/LivraisonMaraussanLignanPage';
import BlogCertificationsPage from './pages/BlogCertificationsPage';
import BlogBarbecuePage from './pages/BlogBarbecuePage';
import BlogTriperiePage from './pages/BlogTriperiePage';
import BlogColisPage from './pages/BlogColisPage';
import LegalPage from './pages/LegalPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import ClientDashboardPage from './pages/ClientDashboardPage';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminMessages from './pages/admin/AdminMessages';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCategories from './pages/admin/AdminCategories';
import CheckoutPage from './pages/CheckoutPage';
import ContactPage from './pages/ContactPage';
import PaymentResultPage from './pages/PaymentResultPage';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import CartDrawer from './components/CartDrawer';
import { pageMeta } from './data/seoMeta';

// ScrollToTop component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main Layout Component for Public Routes
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen font-sans text-dark-900 bg-white flex flex-col">
      <Navigation />
      <CartDrawer />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <Routes>
            {/* Admin Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="categories" element={<AdminCategories />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            {/* Public Routes */}
            <Route path="/" element={<MainLayout><><PageSeo title={pageMeta.home.title} description={pageMeta.home.description} path={pageMeta.home.path} structuredData={pageMeta.home.structuredData} /><Home /></></MainLayout>} />
            <Route path="/products" element={<MainLayout><><PageSeo title={pageMeta.products.title} description={pageMeta.products.description} path={pageMeta.products.path} structuredData={pageMeta.products.structuredData} /><ProductsPage /></></MainLayout>} />
            <Route path="/boutique" element={<MainLayout><BoutiqueHubPage /></MainLayout>} />
            <Route path="/boutique/boeuf-halal" element={<MainLayout><BoeufHalalPage /></MainLayout>} />
            <Route path="/boutique/volaille-halal" element={<MainLayout><VolailleHalalPage /></MainLayout>} />
            <Route path="/boutique/agneau-halal" element={<MainLayout><AgneauHalalPage /></MainLayout>} />
            <Route path="/boutique/colis-viande-halal" element={<MainLayout><ColisViandeHalalPage /></MainLayout>} />
            <Route path="/boutique/charcuterie-merguez" element={<MainLayout><CharcuterieMerguezPage /></MainLayout>} />
            <Route path="/boutique/triperie-abats" element={<MainLayout><TriperieAbatsPage /></MainLayout>} />
            <Route path="/about" element={<MainLayout><><PageSeo title={pageMeta.about.title} description={pageMeta.about.description} path={pageMeta.about.path} structuredData={pageMeta.about.structuredData} /><StoryPage /></></MainLayout>} />
            <Route path="/delivery" element={<MainLayout><><PageSeo title={pageMeta.delivery.title} description={pageMeta.delivery.description} path={pageMeta.delivery.path} structuredData={pageMeta.delivery.structuredData} /><DeliveryPage /></></MainLayout>} />
            <Route path="/services-livraison-drive" element={<MainLayout><ServiceHubPage /></MainLayout>} />
            <Route path="/livraison-villeneuve-les-beziers" element={<MainLayout><LivraisonVilleneuvePage /></MainLayout>} />
            <Route path="/livraison-maraussan-lignan" element={<MainLayout><LivraisonMaraussanLignanPage /></MainLayout>} />
            <Route path="/notre-boucherie-artisanale" element={<MainLayout><ArtisanButcheryPage /></MainLayout>} />
            <Route path="/blog" element={<MainLayout><BlogHubPage /></MainLayout>} />
            <Route path="/blog/certifications-viande-halal" element={<MainLayout><BlogCertificationsPage /></MainLayout>} />
            <Route path="/blog/choisir-viande-barbecue" element={<MainLayout><BlogBarbecuePage /></MainLayout>} />
            <Route path="/blog/cuisiner-triperie-abats" element={<MainLayout><BlogTriperiePage /></MainLayout>} />
            <Route path="/blog/pourquoi-choisir-un-colis-de-viande-halal" element={<MainLayout><BlogColisPage /></MainLayout>} />
            <Route path="/recipes" element={<MainLayout><RecipePage /></MainLayout>} />
            <Route path="/recipes/:id" element={<MainLayout><RecipeDetailPage /></MainLayout>} />
            <Route path="/contact" element={<MainLayout><><PageSeo title={pageMeta.contact.title} description={pageMeta.contact.description} path={pageMeta.contact.path} structuredData={pageMeta.contact.structuredData} /><ContactPage /></></MainLayout>} />
            <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
            <Route path="/payment/:status" element={<MainLayout><PaymentResultPage /></MainLayout>} />
            <Route path="/legal" element={<MainLayout><LegalPage /></MainLayout>} />
            <Route path="/privacy" element={<MainLayout><PrivacyPage /></MainLayout>} />
            <Route path="/terms" element={<MainLayout><TermsPage /></MainLayout>} />
            <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
            <Route path="/register" element={<MainLayout><RegisterPage /></MainLayout>} />
            <Route path="/dashboard" element={<MainLayout><ClientDashboardPage /></MainLayout>} />
            <Route path="/orders" element={<MainLayout><OrderHistoryPage /></MainLayout>} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
