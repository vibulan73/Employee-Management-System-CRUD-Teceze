package com.teceze.assign.ems_backend.exception;

public class EmployeeNotFoundException extends RuntimeException {
    public EmployeeNotFoundException(Long id) {
        super("Could not find employee with id " + id);
    }
}
