import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Home() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        loadEmployees();
    }, []);

    const loadEmployees = async () => {
        try {
            const result = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/employees`);
            console.log("Employees loaded:", result.data);
            setEmployees(result.data);
        } catch (error) {
            console.error("Error loading employees:", error);
        }
    }

    const deleteEmployee=async(id)=>{
        await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/employee/${id}`);
        loadEmployees();
    }

    

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Employee Name</th>
                            <th scope="col">Designation</th>
                            <th scope="col">Salary</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees.map((employee, index) => (
                                <tr key={employee.employeeid}>
                            <th scope="row">{index+1}</th>
                            <td>{employee.employeename}</td>
                            <td>{employee.designation}</td>
                            <td>{employee.salary}</td>
                            <td>
                                <Link className="btn btn-outline-primary mx-2"
                                to={`/edituser/${employee.employeeid}`}>Edit</Link>
                                <button className="btn btn-danger mx-2"
                                onClick={() => deleteEmployee(employee.employeeid)}
                                >Delete</button>
                            </td>
                        </tr>
                            ))
                        }
                        
                        
                    </tbody>
                </table>
            </div>

        </div>
    )
}
