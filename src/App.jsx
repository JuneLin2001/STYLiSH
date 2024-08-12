import Header from "./Header";
import Footer from "./Footer";
import ProductPage from "./ProductPage";
import CheckoutPage from "./CheckoutPage";
import { Routes, Route } from "react-router-dom";

const App = () => (
  <>
    <Header />
    <Routes>
      <Route path="/product.html" element={<ProductPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
    <Footer />
  </>
);

export default App;
