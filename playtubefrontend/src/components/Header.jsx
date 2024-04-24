import { IoSearchSharp } from "react-icons/io5";

function Header() {
  return (
    <>
      <div className="w-full bg-slate-950 max-h-24 min-h-20">
        <img src="../../public/PlaytubeLogo.jpg" alt="Logo" />
        <div>
          <IoSearchSharp/>
          <input type="text" placeholder="Search.." />
        </div>
        <div>
          <button>Log in</button>
          <button>Sign up</button>
        </div>
      </div>
    </>
  );
}
export default Header;
