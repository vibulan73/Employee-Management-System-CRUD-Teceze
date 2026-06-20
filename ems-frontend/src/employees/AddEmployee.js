import React,{useState} from 'react'
import axios from 'axios';
import {Link, useNavigate } from 'react-router-dom';

export default function AddUser() {
  let navigate = useNavigate();
  const [employee, setEmployee] = useState({
    employeename: "",
    designation: "",
    salary: ""
  });

  const onInputChange = (e) => {
    setEmployee({...employee,[e.target.name]: e.target.value});
  }

  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      const employeeData = {
        ...employee,
        salary: employee.salary ? parseInt(employee.salary) : 0
      };
      await axios.post("http://localhost:8080/employee", employeeData);
      navigate("/");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee: " + (error.response?.data?.message || error.message));
    }
   };


  const { employeename, designation, salary } = employee;
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
          <h2 className='text-center m-4'>Add Employee</h2>
          <form onSubmit={(e) => onSubmit(e)}>
          <div className='mb-3'>
            <label htmlFor='Employeename' className='form-label'>Employee Name</label>
            <input
              type={'text'}
              className='form-control'
              placeholder='Enter your employee name'
              name='employeename'
              value={employeename}
              onChange={onInputChange}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Designation' className='form-label'>Designation</label>
            <input
              type={'text'}
              className='form-control'
              placeholder='Enter your designation'
              name='designation' 
              value={designation} 
              onChange={onInputChange}
              />
          </div>
          <div className='mb-3'>
            <label htmlFor='Salary' className='form-label'>Salary</label>
            <input
              type={'number'}
              className='form-control'
              placeholder='Enter your salary'
              name='salary'
              value={salary} 
              onChange={onInputChange}
              />
          </div>
          <button type='submit' className='btn btn-outline-primary'>Submit</button>
              <Link to="/" className='btn btn-outline-danger mx-2'>Cancel</Link>
</form> 
        </div>

      </div>
    </div>
  )
}
