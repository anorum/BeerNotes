import React, { useState } from "react";
import RedirectSearch from "./RedirectSearch";
import SearchIcon from "./SearchIcon";

const SearchMenu = props => {
  const [showSearch, setSearch] = useState(false);

  const toggleSearch = () => {
    setSearch(!showSearch)
  }

  return (
    <React.Fragment>
      {showSearch && (
        <div onBlur={toggleSearch} style={{minWidth: "250px",gridArea: "search" }}>
          <RedirectSearch />
        </div>
      )}
      {!showSearch && (
          <SearchIcon
          tabIndex="0"
          role="button"
          onFocus={toggleSearch}
          />
      )}
    </React.Fragment>
  );
};

export default SearchMenu;
