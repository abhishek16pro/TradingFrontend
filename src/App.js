import { Routes, Route, BrowserRouter, Outlet } from "react-router-dom"
import Login from './component/Login/Login'
import Navbar from './component/Navbar/Navbar'
import UserSetting from './component/UserSetting/UserSettings'
import Dashboard from './component/Dashboard/Dashboard'
import Strategy from './component/Strategy/Strategy'
import Multiplier from './component/Multiplier/Multiplier'

const SidebarLayout = () => (
  <>
    <Navbar />
    <div className="routeContainer">
      <Outlet />
    </div>
  </>
)

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SidebarLayout />}>
          <Route
            path="/home/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/home/usersettings"
            element={<UserSetting />}
          />
          <Route
            path="/home/strategy"
            element={<Strategy />}
          />
          <Route
            path="/home/multiplier"
            element={<Multiplier />}
          />
        </Route>
        <Route exact path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
