import { IoSearchSharp } from "react-icons/io5";

function Header() {
  return (
    <>
      <div className="w-full bg-[#121212f5] flex justify-between items-center">
        <img
          src="https://cdn.discordapp.com/attachments/1123563843407335519/1233430241884766258/PlatTubeLogo-removebg-preview.png?ex=662d10ed&is=662bbf6d&hm=d314c26df583098c89aea2b8ebab5fa2983033aba1ff27a625ff70347057455b&"
          alt="Logo"
          className="w-24 h-24"
        />
        <div className="text-white w-96 bg-[#121212fb] flex h-9 px-1 py-2 border">
          <IoSearchSharp className="h-full w-6 mx-2" />
          <input
            type="text"
            placeholder="Search.."
            className="outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-4 mr-5">
          <button className="text-white text-xl">Log in</button>
          <button className="bg-[#AE7AFF] text-black text-xl px-6 py-2 active:scale-90 duration-75">
            Sign up
          </button>
        </div>
      </div>
    </>
  );
}
export default Header;
