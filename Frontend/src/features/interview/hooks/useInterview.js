import{getAllInterviewReports,generateInterviewReport, getInterviewReportById,generateResumePdf} from "../services/interview.api"
import {useContext} from "react"
import { InterviewContext } from "../interview.context.jsx"

export const useInterview = () => {
    const  context = useContext(InterviewContext)

    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider")
    }

    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async ({jobDescription, selfDescription, resumeFile}) => {
    setLoading(true)
    let response;

    try {
        response = await generateInterviewReport({jobDescription, selfDescription, resumeFile})

        console.log("API RESPONSE:", response)

        setReport(response.interviewReport)

        return response.interviewReport

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

    const getReportById = async (interviewId) => {
    setLoading(true)
    let response;

    try {
        response = await getInterviewReportById(interviewId)

        setReport(response.interviewReport)

        return response.interviewReport

    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    }
}

    const getReports = async () => {
    setLoading(true)
     let response = null
    try {
          const response = await getAllInterviewReports()
          setReports(response.interviewReports)
    } catch (error) {
        console.log(error)
    }finally {
        setLoading(false)
    }
    return response.interviewReports



  }

  const getResumePdf = async ({interviewId}) => {
    setLoading(true)
    let response;
    try {
        response = await generateResumePdf({interviewId})
        const url = window.URL.createObjectURL(new Blob([response], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute("download", `resume_${interviewId}.pdf`);
        document.body.appendChild(link);
        link.click();
        
    } catch (error) {
        console.log(error)
    } finally {
        setLoading(false)
    } 

  }

  return { loading, report, reports, generateReport, getReportById, getReports,getResumePdf}

}
