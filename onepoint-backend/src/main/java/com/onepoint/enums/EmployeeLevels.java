package com.onepoint.enums;

public enum EmployeeLevels {

    JUNIOR(0),
    ASSOCIATE(1),
    ADVANCED(2),
    SENIOR(3),
    ARCHITECT(4);

    private final int numericValue;

    EmployeeLevels(int numericValue) {
        this.numericValue = numericValue;
    }

    public int getNumericValue() {
        return numericValue;
    }
}
