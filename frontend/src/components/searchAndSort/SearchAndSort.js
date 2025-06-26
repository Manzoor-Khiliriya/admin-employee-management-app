import React from "react";

const SearchAndSort = ({ searchText, setSearchText, sortOption, setSortOption }) => {
  return (
    <div className="row justify-content-between align-items-center mb-4 g-2">
      <div className="col-12 col-md-10">
        <input
          type="text"
          className="form-control"
          placeholder="Search by name, email, etc."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          aria-label="Search"
        />
      </div>
      <div className="col-12 col-md-2">
        <select
          className="form-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          aria-label="Sort employees"
        >
          <option value="default" disabled>Sort by</option>
          <option value="name">Name</option>
          <option value="email">Email</option>
          <option value="createdDate">Created Date</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
