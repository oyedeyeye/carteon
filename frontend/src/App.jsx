import { Routes, Route, Outlet } from "react-router-dom";
import CardDetails from "./pages/CardDetails/CardDetails.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingPage from "./pages/LandingPage/LandingPage.jsx";
import DigitalCard from "./pages/Profile/Digitalprofile.jsx";
import Checkout from "./pages/Order/Order.jsx";
import Success from "./pages/Success/Success.jsx";


function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cards/:slug" element={<CardDetails />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Success />} />
        <Route path="/adaeze" element={<DigitalCard />} />
      </Route>
    </Routes>
  );
}

export default App;