import Button from "../components/Button";
import { GoSearch } from "react-icons/go";

const Navbar = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl font-bold ">Daftar Playlist Saya</h1>
        <Button type="button" onClick={() => {}}>
          + Tambah Playlist
        </Button>
      </div>

      {/* Search input with icon */}
      <div className="relative w-1/3">
        {/* Icon */}
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <GoSearch className="text-gray-500 text-xl align-middle" />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Cari playlist..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
      </div>
    </div>
  );
};

export default Navbar;
