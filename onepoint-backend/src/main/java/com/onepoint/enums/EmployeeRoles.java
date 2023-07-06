package com.onepoint.enums;

public enum EmployeeRoles {
    EMPLOYEE(0),
    MANAGER(1),

    HEAD_OF_ADMINISTRATION(2);


    private final int numericValue;

    EmployeeRoles(int numericValue) {
        this.numericValue = numericValue;
    }

    public int getNumericValue() {
        return numericValue;
    }
}
