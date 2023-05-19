import {
    ADD_WORKLOG,
    DELETE_WORKLOG,
    CLEAR_ALL_WORKLOGS,
    EDIT_WORKLOG,

} from "../actions/actionTypes";

const initialState = {
    worklogs: [
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        },
        {
            id: 12,
            day: "2023-05-14T23:31:07+03:00",
            start: 800,
            stop: 1030,
            description: "test",
            employeeId: 11,
            customerName: "Customer Test"
        }

    ],
    isEdit: false,
    editTodoId: "",
};

const worklogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_WORKLOG:
            const { day, start, stop, description, employeeId, customerName } = action.payload;
            return {
                ...state,
                worklogs: [
                    ...state.worklogs,
                    {
                        day: day,
                        start: start,
                        stop: stop,
                        description: description,
                        employeeId: employeeId,
                        customerName: customerName
                    },
                ],
                isEdit: action.isEdit,
            };
        case DELETE_WORKLOG:
            const newTodoList = state.worklogs.filter((item) => item.id !== action.id);
            return {
                ...state,
                todos: newTodoList,
            };

        case EDIT_WORKLOG:
            const editTodo = action.payload;
            let newEditTodo = state?.worklogs?.find((item) => item?.id === editTodo?.id);
            return {
                ...state,
                isEdit: action.isEdit,
                editTodo: newEditTodo,
            };


        case CLEAR_ALL_WORKLOGS:
            return {
                ...state,
                worklogs: [],
            };

        default:
            return state;
    }
};
export default worklogsReducer;