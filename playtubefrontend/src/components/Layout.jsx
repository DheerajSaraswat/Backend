import Header from "./Header.jsx"
import Sidenav from "./Sidenav.jsx"
import Login from "./Login.jsx"
function Layout() {
  return (
    <div>
      <Header />
      <div>
        <Sidenav />
        {/* <Login /> */}
      </div>
    </div>
  );
}
export default Layout