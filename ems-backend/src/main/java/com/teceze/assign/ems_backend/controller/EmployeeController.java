package com.teceze.assign.ems_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import com.teceze.assign.ems_backend.repository.EmployeeRepository;

import java.util.List;
import com.teceze.assign.ems_backend.entity.Employee;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import com.teceze.assign.ems_backend.exception.EmployeeNotFoundException;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;




@RestController
// @CrossOrigin("http://localhost:3000")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee")
    Employee newEmployee(@RequestBody Employee newEmployee) {
        return employeeRepository.save(newEmployee);
    }

    @GetMapping("/employees")
    List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    @GetMapping("/employee/{id}")
    Employee getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
        .orElseThrow(() -> new EmployeeNotFoundException(id));
    }

    @PutMapping("/employee/{id}")
    Employee updateEmployee(@RequestBody Employee newEmployee, @PathVariable Long id) {
        
        return employeeRepository.findById(id)
        .map(employee -> {
            employee.setEmployeename(newEmployee.getEmployeename());
            employee.setDesignation(newEmployee.getDesignation());
            employee.setSalary(newEmployee.getSalary());
            return employeeRepository.save(employee);
        }).orElseThrow(() -> new EmployeeNotFoundException(id));
    }
    
    @DeleteMapping("/employee/{id}")
    String deleteEmployee(@PathVariable Long id) {
        if(!employeeRepository.existsById(id)) {
            throw new EmployeeNotFoundException(id);
        }
        employeeRepository.deleteById(id);
        return "Employee with id " + id + " has been deleted successfully.";
    }

}
