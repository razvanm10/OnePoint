import {
    ADD_WORKLOG,
    DELETE_WORKLOG,
    CLEAR_ALL_WORKLOGS,
    EDIT_WORKLOG,
    UPDATE_WORKLOG,
    MARK_COMPLETED,
} from "./actionTypes";

export const addNewWorklog = (worklog) => {
    return {
        type: ADD_WORKLOG,
        payload: {
            description: worklog?.description,
            day: worklog.day,
            start: worklog.start,
            end: worklog.end,
            customerId: worklog.customerId,
            employeeId: worklog.employeeId
        },
    };
};
export const deleteWorklog = (id) => {
    return {
        type: DELETE_WORKLOG,
        id,
    };
};

export const clearAllWorklogs = () => {
    return {
        type: CLEAR_ALL_WORKLOGS,
    };
};

export const editWorklog = (id) => {
    return {
        type: EDIT_WORKLOG,
        payload: {
            id: id,
        },
        isEdit: true,
    };
};

export const updateWorklog = (id, todo) => {
    return {
        type: UPDATE_WORKLOG,
        payload: {
            todoId: id,
            todoTitle: todo?.title,
            todoDescription: todo?.description,
        },
    };
};
