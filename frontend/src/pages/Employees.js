import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import EmployeeTable from "../components/employeeListTable/EmployeesListTable";
import SearchAndSort from "../components/searchAndSort/SearchAndSort";
import Pagination from "../components/pagination/Pagination";
import { API_URL } from "../utils/config";

export default function Employees() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const token = localStorage.getItem("token");

  const employeeList = async (page) => {
    try {
      const response = await fetch(
        `${API_URL}/employees?page=${page}&limit=${limit}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch employees");
      }

      const result = await response.json();
      setEmployees(result.data);
      setTotalEmployees(result.pagination.totalCount);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    let sorted = [...employees];

    if (sortOption === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "email") {
      sorted.sort((a, b) => a.email.localeCompare(b.email));
    } else if (sortOption === "createdDate") {
      sorted.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));
    }

    setSortedEmployees(sorted);
  }, [employees, sortOption]);

  useEffect(() => {
    employeeList(currentPage);
  }, [currentPage]);

  const filteredEmployees = sortedEmployees.filter((employee) => {
    const searchTextLower = searchText.toLowerCase();
    return ["name", "email", "mobile", "designation", "gender", "courses"].some((key) => {
      return employee[key]?.toString().toLowerCase().includes(searchTextLower);
    });
  });

 

  const totalPages = Math.ceil(totalEmployees / limit);
  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <Header />
      <div className="container-fluid p-4">
        <div className="d-flex gap-2 justify-content-end align-items-center mb-3">
          <h5 className="fw-bold">Total Employees: {totalEmployees}</h5>
          <button className="btn btn-success" onClick={() => navigate("/create-employee")}>Create Employee</button>
        </div>

        <SearchAndSort 
          searchText={searchText}
          setSearchText={setSearchText}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />

        <EmployeeTable 
          employees={filteredEmployees}
          navigate={navigate}
        />

        <Pagination 
          totalEmployees={totalEmployees}
          limit={limit}
          currentPage={currentPage}
          changePage={changePage}
        />
      </div>
    </div>
  );
}
