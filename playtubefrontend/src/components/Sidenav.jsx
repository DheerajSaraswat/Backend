import { RiHome6Line } from "react-icons/ri";

function Sidenav() {
  return (
    <>
      <div className="w-60 max-h-full bg-[#121212f5] flex flex-col gap-96 px-4 border border-white">
        <div className="my-4 text-white text-xl">
          <div className=" border border-white px-2 py-1 flex">
            <RiHome6Line className="text-3xl mr-1"/> Home
          </div>
          <div> Liked Videos</div>
          <div>History</div>
          <div>My Content</div>
          <div>Collections</div>
          <div>Subscribers</div>
        </div>
        <div>
          <div>Support</div>
          <div>Settings</div>
        </div>
      </div>
    </>
  );
}
export default Sidenav;
