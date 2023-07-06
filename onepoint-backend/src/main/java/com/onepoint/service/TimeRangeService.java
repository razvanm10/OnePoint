package com.onepoint.service;

import com.onepoint.dto.WorklogDTO;
import org.springframework.stereotype.Service;


import java.time.ZonedDateTime;

@Service
public class TimeRangeService {

    public void checkOverlapping(WorklogDTO worklog1, WorklogDTO worklog2) throws IllegalArgumentException {
        if (worklog1.getDay().compareTo(worklog2.getDay()) != 0) {
            return; // No need to check overlapping if the dates are different
        }

        int start1 = worklog1.getStart();
        int stop1 = worklog1.getStop();
        int start2 = worklog2.getStart();
        int stop2 = worklog2.getStop();

        if (isOverlapping(start1, stop1, start2, stop2)) {
            throw new IllegalArgumentException("Worklogs are overlapping.");
        }
    }

    private boolean isSameDate(ZonedDateTime date1, ZonedDateTime date2) {
        return date1.getDayOfMonth() == date2.getDayOfMonth() &&
                date1.getMonthValue() == date2.getMonthValue() &&
                date1.getYear() == date2.getYear();
    }

    private boolean isOverlapping(int start1, int stop1, int start2, int stop2) {
        return start1 < stop2 && stop1 > start2;
    }

}
