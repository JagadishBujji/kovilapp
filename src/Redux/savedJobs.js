import { createSlice } from "@reduxjs/toolkit";

const initialState={
    savedJobs:[]
}

const savedJobsSlice=createSlice({
    name:"savedJobs",
    initialState,
    reducers:{
        addSavedJobs:(state,{payload})=>{
            // const newData=[...state.savedJobs,payload]
            // state.savedJobs=newData
                const isExist=state.savedJobs.filter((sj)=>{
                    return sj.id===payload.id
                })
                console.log(isExist.length);
                            
                
                // console.log(state.savedJobs);
                if(isExist.length===0)
                {
                    state.savedJobs=[...state.savedJobs,payload]
                        alert("job saved")
                }
                else{
                    alert("job already saved")
                }

        }
    }
})

export const {addSavedJobs}=savedJobsSlice.actions;
export default savedJobsSlice.reducer