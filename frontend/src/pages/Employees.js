import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import EmployeeTable from "../components/employeeListTable/EmployeesListTable";
import SearchAndSort from "../components/searchAndSort/SearchAndSort";
import Pagination from "../components/pagination/Pagination";
import { getEmployees } from "../services/employeeApi";

export default function Employees() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [sortOption, setSortOption] = useState("default");

  const employeeList = async (page) => {
    try {
      const result = await getEmployees(page, limit, token);
      setEmployees(result.data);
      setTotalEmployees(result.pagination.totalCount);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    employeeList(currentPage);
  }, [currentPage]);

  const sortedEmployees = React.useMemo(() => {
    let sorted = [...employees];
    if (sortOption === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortOption === "email") sorted.sort((a, b) => a.email.localeCompare(b.email));
    else if (sortOption === "createdDate") sorted.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    return sorted;
  }, [employees, sortOption]);

  const filteredEmployees = sortedEmployees.filter((employee) => {
    const search = searchText.toLowerCase();
    return ["name", "email", "mobile", "designation", "gender", "courses"].some((key) =>
      employee[key]?.toString().toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil(totalEmployees / limit);

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div>
      <Header />
      <div className="container-fluid py-4 px-3 px-md-5">
        <div className="d-flex flex-column flex-md-row justify-content-end align-items-md-center gap-2 mb-4">
          <h5 className="fw-bold mb-0">Total Employees: {totalEmployees}</h5>
          <button className="btn btn-success" onClick={() => navigate("/create-employee")}>
            + Create Employee
          </button>
        </div>

        <SearchAndSort
          searchText={searchText}
          setSearchText={setSearchText}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <EmployeeTable employees={filteredEmployees} navigate={navigate} />

        <Pagination
          totalEmployees={totalEmployees}
          limit={limit}
          currentPage={currentPage}
          changePage={changePage}
        />
      </div>
    </div >
  );
}
