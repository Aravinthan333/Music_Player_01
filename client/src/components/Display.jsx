import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { useContext, useEffect, useRef } from "react";
import { PlayerContext } from "../context/PlayerContext";
// import { albumsData } from "../assets/assets";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);

  const displayRef = useRef();

  const location = useLocation();

  const isAlbum = location.pathname.includes("album");
  // const albumId = isAlbum ? location.pathname.split("/")[2] : "";
  const albumId = isAlbum ? location.pathname.split("/").pop() : "";
  // const bgColor =  albumsData[Number(albumId)].bgColor;
  const bgColor =
    isAlbum && albumsData.length > 0
      ? albumsData.find((x) => x._id == albumId).bgColour
      : "#121212";

  useEffect(() => {
    isAlbum
      ? (displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`)
      : (displayRef.current.style.background = `#121212`);
  });

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      {albumsData.length > 0 ? (
        <Routes>
          <Route path="/" element={<DisplayHome />} />
          <Route
            path="/album/:id"
            element={
              <DisplayAlbum album={albumsData.find((x) => x._id == albumId)} />
            }
          />
        </Routes>
      ) : null}
    </div>
  );
};

export default Display;
