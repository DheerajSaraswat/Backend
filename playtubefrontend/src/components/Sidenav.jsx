import { RiHome6Line } from "react-icons/ri";
import { BiLike } from "react-icons/bi";
import { MdHistory } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { GoPersonAdd } from "react-icons/go";
import { BiSupport } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";

function Sidenav() {
  return (
    <>
      <div className="w-60 max-h-full bg-[#121212f5] flex flex-col gap-64 px-4 border border-white">
        <div className="my-4 text-white text-md">
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <RiHome6Line className="text-2xl mr-1" /> Home
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <BiLike className="text-2xl mr-1" /> Liked Videos
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <MdHistory className="text-2xl mr-1" /> History
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <HiOutlineVideoCamera className="text-2xl mr-1" /> My Content
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <BsFillCollectionPlayFill className="text-2xl mr-1" /> Collections
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <GoPersonAdd className="text-2xl mr-1" /> Subscribers
          </div>
        </div>
        <div className="text-white my-3">
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <BiSupport className="text-2xl mr-1" /> Support
          </div>
          <div className=" border border-white px-2 py-1 mb-2 flex hover:bg-[#AE7AFF] hover:text-black cursor-pointer">
            <IoSettingsOutline className="text-2xl mr-1" /> Settings
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidenav;
