import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/Auth/RequireAuth";
import UserAuth from "./components/Auth/UserAuth";
import Appointment from "./components/Page/Appointment/Appointment";
import AllUsers from "./components/Page/Dashboard/AllUsers";
import Dashboard from "./components/Page/Dashboard/Dashboard";
import MyAppointment from "./components/Page/Dashboard/MyAppointment";
import Contact from "./components/Page/Home/Contact/Contact";
import Home from "./components/Page/Home/Home";
import Login from "./components/Page/Login/Login";
import Register from "./components/Page/Register/Register";
import Services from "./components/Page/Services/Services";
import Testimonial from "./components/Page/Testimonial/Testimonial";
import Footer from "./components/Shared/Footer";
import Header from "./components/Shared/Header/Header";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RequireAdmin from "./components/Auth/RequireAdmin";
import AddDoctor from "./components/Page/Dashboard/AddDoctor";
import ManageDoctor from "./components/Page/Dashboard/ManageDoctor";
import Payment from "./components/Page/Dashboard/Payment";
import Error from './components/Shared/Error/Error';
function App() {
  return (
    <div className="">

      <Header />
      <Routes>

        <Route path="/" element={<><Home /><Testimonial /><Contact /> <Footer /> </>}></Route>
        <Route path="/home" element={<><Home /><Testimonial /> <Contact /> <Footer /></>}></Route>

        <Route path="/appointment" element={<>
          <RequireAuth>
            <Appointment />
          </RequireAuth>
        </>}>
        </Route>

        <Route path="/dashboard" element={<>
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        </>}>
          <Route index element={<MyAppointment />}></Route>
          <Route path="payment/:id" element={<Payment />}></Route>
          <Route path="users" element={<RequireAdmin><AllUsers /></RequireAdmin>}></Route>
          <Route path="addDoctor" element={<RequireAdmin><AddDoctor /></RequireAdmin>}></Route>
          <Route path="manageDoctor" element={<RequireAdmin><ManageDoctor /></RequireAdmin>}></Route>
        </Route>

        <Route path="/about" element={<><Services /></>}></Route>
        <Route path="/reviews" element={<><Testimonial /></>}></Route>
        <Route path="/contact" element={<><Contact /></>}></Route>
        <Route path="/login" element={<>
          <UserAuth>
            <Login />
          </UserAuth>
        </>}></Route>
        <Route path="/register" element={<>
          <UserAuth>
            <Register />
          </UserAuth>
        </>}></Route>

        <Route path="*" element={<Error />}></Route>

      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
