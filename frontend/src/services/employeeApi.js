const API_URL = `${process.env.REACT_APP_API_BASE_URL}/api/v1`;

export async function createEmployee(employeeData, token, navigate) {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }

  try {
    const response = await fetch(`${API_URL}/employees`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || "An unexpected error occurred.");
    }

    navigate("/employees");
  } catch (error) {
    throw error;
  }
}

export async function getEmployees(page, limit, token) {
  try {
    const response = await fetch(`${API_URL}/employees?page=${page}&limit=${limit}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

export async function getEmployeeById(id, token) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to fetch employee");
  }

  return result.data;
}

export async function updateEmployee(id, employeeData, token, navigate) {
  const formData = new FormData();
  for (const key in employeeData) {
    formData.append(key, employeeData[key]);
  }

  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: "PUT",
    headers: {
      authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "Failed to update employee");
  }

  navigate("/employees");
}

export async function deleteEmployeeById(id, token) {
  const response = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to delete employee');
  }

  return result;
}