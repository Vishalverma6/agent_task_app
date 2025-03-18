const BASE_URL = import.meta.env.VITE_BASE_URL


// Auth Endpoints 
export const authEndpoints ={
    SIGNUP_API :BASE_URL + "/auth/signup",
    LOGIN_API :BASE_URL + "/auth/login",
}

// agent endpoints 
export const agentEndpoints = {
    ADD_AGENT_API : BASE_URL + "/agent/addAgent",
    GET_ALL_AGENT_API: BASE_URL+ "/agent/getAllAgent",
}



// task endpoints 
export const taskEndpoints = {
    UPLOAD_CSV_API:BASE_URL+"/task/uploadCSV",
    GET_TASK_BY_AGENT_API :BASE_URL+"/task/getTaskByAgent",
    GET_ALL_TASK_API:BASE_URL+"/task/getAllTask",
};
