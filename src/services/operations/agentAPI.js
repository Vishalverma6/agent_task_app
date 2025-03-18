import toast from "react-hot-toast";
import { agentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";


const {
    ADD_AGENT_API,
    GET_ALL_AGENT_API,
} = agentEndpoints;



// add agent 
export const addAgent = async(data) => {
    let result =null;
    const toastId = toast.loading("Loading");
    try{
        const response  = await apiConnector("POST",ADD_AGENT_API,data);

        console.log("ADD_AGENT_API API RESPONSE....",response)
        if(!response?.data?.success){
            throw new Error("Could not Add the agent")
        }
        toast.success(response?.data?.message || "Agent added Succesfully")
        result=response?.data?.data;
    }catch(error){
        console.log("ADD_AGENT_API API ERROR...",error);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result;
};

// get All Agent 
export const getAllAgent = async()=> {
    const toastId = toast.loading("Loading...")
    let result = [];
    try{
        const response = await apiConnector("GET",GET_ALL_AGENT_API,null
        )
        console.log("GET_ALL_AGENT_API API RESPONSE....",response);
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all Agent")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the Agent List")
    }catch(error){
        console.log("GET_ALL_AGENT_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result;
}