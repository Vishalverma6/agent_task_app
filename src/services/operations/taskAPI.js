import toast from "react-hot-toast";
import { taskEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";

const {
    UPLOAD_CSV_API,
    GET_TASK_BY_AGENT_API,
    GET_ALL_TASK_API,
} = taskEndpoints;

// upload CSV File 
export const uploadCSV = async(data) => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response = await apiConnector("POST",UPLOAD_CSV_API,data)

        console.log("UPLOAD_CSV_API API RESPONSE....",response);
        if(!response.data.success){
            throw new Error (response?.data?.message || "Fail to upload file ")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully uploaded the file ")
    }catch(error){
        console.log("UPLOAD_CSV_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
};

// get the task by agent 
export const getTaskByAgent = async()=> {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response = await apiConnector("GET",GET_TASK_BY_AGENT_API,null
        )
        console.log("GET_TASK_BY_AGENT_API API RESPONSE....",response);
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch task ")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the task of each agent ")
    }catch(error){
        console.log("GET_TASK_BY_AGENT_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
};

// get All Task 
export const getAllTask = async() => {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response = await apiConnector("GET",GET_ALL_TASK_API,null
        )
        console.log("GET_ALL_TASK_API API RESPONSE....",response);
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all Task")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the Task")
    }catch(error){
        console.log("GET_ALL_TASK_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
}