import Header from "./Header.jsx"
import Sidenav from "./Sidenav.jsx"
import Login from "./Login.jsx"
function Layout() {
  return (
    <div className="h-full w-full">
      <Header className="h-1/4" />
      <div className="h-3/4">
        <Sidenav className="h-full"/>
      </div>
    </div>
  );
}
export default Layout