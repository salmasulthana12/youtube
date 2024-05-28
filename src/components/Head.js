import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResults } from "../utils/searchSlice";

const Head = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchCache = useSelector((store)=>store.search)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestions(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestions(json[1])

    dispatch(cacheResults({
      [searchQuery]: json[1]
    }))
  };
  const dispatch = useDispatch();
  const toggleMenuHnadler = () => {
    dispatch(toggleMenu());
  };
  return (
    <div className="grid grid-flow-col p-5 m-2 shadow-lg">
      <div className="flex col-span-2 ">
        <img
          onClick={() => {
            toggleMenuHnadler();
          }}
          className="h-8 cursor-pointer"
          alt="menu"
          src="https://www.iconbolt.com/preview/facebook/zwicon/hamburger-menu.svg"
        />
        <a href="/">
          <img
            className="h-8 mx-2"
            alt="youtube-logo"
            src="https://logodownload.org/wp-content/uploads/2014/10/youtube-logo-9.png"
          />
        </a>
      </div>
      <div className="col-span-8 mx-12">
      <div>
        <input
          className="w-1/2 border border-gray-400 p-2 rounded-l-full"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setShowSuggestions(false)}
        />
        <button className="border border-gray-400 bg-gray-100  px-5 py-2 rounded-r-full">
          🔍
        </button>
      </div>
      {showSuggestions && (
          <div className="fixed bg-white py-2 px-2 w-[37rem] shadow-lg rounded-lg border border-gray-100">
            <ul>
              {suggestions.map((s) => (
                <li key={s} className="py-2 px-3 shadow-sm hover:bg-gray-100">
                  🔍 {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="col-span-2">
        <img
          className="h-7"
          alt="user-icon"
          src="https://pluspng.com/img-png/user-png-icon-download-icons-logos-emojis-users-2240.png"
        />
      </div>
    </div>
  );
};

export default Head;
