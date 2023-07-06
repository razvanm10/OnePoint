package com.onepoint.enums;

public enum WorklogActivity {


    INTERNAL_MEETING(0),

    CUSTOMER_DEVELOPMENT(1),

    CUSTOMER_QA(2),

    EMPLOYEES_CONTROLLING(3);

    private final int numericValue;

    WorklogActivity(int numericValue) {
        this.numericValue = numericValue;
    }

    public int getNumericValue() {
        return numericValue;
    }

}
