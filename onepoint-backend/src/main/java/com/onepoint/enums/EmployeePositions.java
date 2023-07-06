package com.onepoint.enums;

public enum EmployeePositions {

    BackendDeveloper(0),
    FrontendDeveloper(1),
    ScrumMaster(2),
    ProductOwner(3),
    Tester(4),
    FullstackDeveloper(5),
    Manager(6);

    private final int numericValue;

    EmployeePositions(int numericValue) {
        this.numericValue = numericValue;
    }

    public int getNumericValue() {
        return numericValue;
    }
}
