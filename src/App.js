import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./View/ProtectedRoute";

const MainLineIPO = lazy(() => import("./View/MainLineIPO"));
const SmeIpo = lazy(() => import("./View/SmeIpo"));
const News = lazy(() => import("./View/News"));
const NewsAdd = lazy(() => import("./View/NewsAdd"));
const NewsEdit = lazy(() => import("./View/NewsEdit"));
const Offers = lazy(() => import("./View/Offers"));
const Banners = lazy(() => import("./View/Banners"));
const VersionControl =lazy(()=>import("./View/VersionControl"))
const Popupcards = lazy(() => import("./View/Popupcards"));
const Faqs = lazy(() => import("./View/Faqs"));
const IpoAllotmentTips = lazy(() => import("./View/IpoAllotmentTips"));
const PrivacyPolicy = lazy(() => import("./View/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./View/TermsAndConditions"));
const ContactUs = lazy(() => import("./View/ContactUs"));
const Users = lazy(() => import("./View/Users"));
const PremiumUsers = lazy(() => import("./View/Premiumuser"));

const Notifications = lazy(() => import("./View/Notifications"));
const AddIpo = lazy(() => import("./View/AddIpo"));
const IpoEdit = lazy(() => import("./View/IpoEdit"));
const IpoDetail = lazy(() => import("./View/IpoDetail"));
const SignIn = lazy(() => import("./View/SignIn"));
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SignIn />} />

        <Route
          path="mainline_ipo"
          element={<ProtectedRoute Component={MainLineIPO} />}
        />
        <Route
          path="mainline_ipo/add_ipo"
          element={<ProtectedRoute Component={AddIpo} />}
        />
        <Route
          path="mainline_ipo/ipo_detail"
          element={<ProtectedRoute Component={IpoDetail} />}
        />
        <Route
          path="mainline_ipo/ipo_edit"
          element={<ProtectedRoute Component={IpoEdit} />}
        />
        <Route path="sme_ipo" element={<ProtectedRoute Component={SmeIpo} />} />
        <Route
          path="sme_ipo/add_ipo"
          element={<ProtectedRoute Component={AddIpo} />}
        />
        <Route
          path="sme_ipo/ipo_detail"
          element={<ProtectedRoute Component={IpoDetail} />}
        />
        <Route
          path="sme_ipo/ipo_edit"
          element={<ProtectedRoute Component={IpoEdit} />}
        />
        <Route path="news" element={<ProtectedRoute Component={News} />} />
        <Route
          path="news/news_add"
          element={<ProtectedRoute Component={NewsAdd} />}
        />
        <Route
          path="news/news_edit/:newsId"
          element={<ProtectedRoute Component={NewsEdit} />}
        />
        <Route path="offers" element={<ProtectedRoute Component={Offers} />} />
        <Route path="banners" element={<ProtectedRoute Component={Banners} />} />
        <Route path="VersionControl" element={<ProtectedRoute Component={VersionControl} />} />

        
        <Route path="popupcards" element={<ProtectedRoute Component={Popupcards} />} />
        <Route path="faqs" element={<ProtectedRoute Component={Faqs} />} />
        <Route
          path="ipo_allotment_tips"
          element={<ProtectedRoute Component={IpoAllotmentTips} />}
        />
        <Route
          path="privacy_policy"
          element={<ProtectedRoute Component={PrivacyPolicy} />}
        />
        <Route
          path="terms_conditions"
          element={<ProtectedRoute Component={TermsAndConditions} />}
        />
        <Route
          path="contact_us"
          element={<ProtectedRoute Component={ContactUs} />}
        />
        <Route path="user" element={<ProtectedRoute Component={Users} />} />
        <Route path="premium-user" element={<ProtectedRoute Component={PremiumUsers} />} />

        <Route
          path="notifications"
          element={<ProtectedRoute Component={Notifications} />}
        />
      </Routes>
    </>
  );
};

export default App;
