import React from "react";

const SearchAndSort = ({ searchText, setSearchText, sortOption, setSortOption }) => {
  return (
    <div>
      <div className="d-flex gap-2 justify-content-end align-items-center mb-3">
        <input
          type="text"
          className="form-control"
          style={{ width: "225px" }}
          placeholder="Search by name, email, etc."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button className="btn btn-primary">Search</button>
      </div>

      <div className="d-flex justify-content-end gap-3 mb-3">
        <select
          className="form-select w-auto"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
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
