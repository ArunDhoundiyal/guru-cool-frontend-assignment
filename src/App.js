import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PersonalDetailForm from "./components/PersonalDetailForm";
import AddressForm from "./components/AddressForm";
import ConfirmationForm from "./components/ConfirmationForm";
import "./App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PersonalDetailForm />} />
      <Route path="/address-form" element={<AddressForm />} />
      <Route path="/confirmation-form" element={<ConfirmationForm />} />
    </Routes>
  </Router>
);

export default App;