import React, { useState } from "react";
import RedirectSearch from "./RedirectSearch";
import SearchIcon from "./SearchIcon";

const SearchMenu = props => {
  const [showSearch, setSearch] = useState(false);

  return (
    <React.Fragment>
      {showSearch && (
        <div onBlur={() => setSearch(!showSearch)} style={{ margin: "0 3rem" }}>
          <RedirectSearch />
        </div>
      )}
      {!showSearch && (
        <div
          tabIndex="0"
          role="button"
          style={{ cursor: "pointer" }}
          onFocus={() => setSearch(!showSearch)}
        >
          <SearchIcon />
        </div>
      )}
    </React.Fragment>
  );
};

export default SearchMenu;
