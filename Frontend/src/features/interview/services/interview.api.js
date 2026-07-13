import axios from "axios";

const  api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials :true
})

/**
 * @description generate new interview report on the basis of user 
 * selfdescription , resume pdf and job description
 */

export const generateInterviewReport = async ({jobDescription, selfDescription, resumeFile}) => {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    formData.append("resume", resumeFile);

   const reponse = await api.post("/api/interview/", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return reponse.data
}


/**
 * @description get interview report on the basis of interviewId
 */

export const getInterviewReportById =async (interviewId) => {
   const response =  await api.get(`/api/interview/report/${interviewId}`)
   return response.data
}
/**
 * @description get all interview reports of the logged in user
 */ 

export const getAllInterviewReports = async () => {
    const response = await api.get("/api/interview/")
    return response.data
}

/**
 * @description generate resume pdf on the basis of user selfdescription , job description and  resume
 */
export const generateResumePdf = async ({interviewId}) => {
    const response = await api.post(`/api/interview/resume/pdf/${interviewId}`,null,{
        responseType:"blob"
    })
    return response.data
}
