const pdfParse = require("pdf-parse") 
const {generateInterviewReport,generateResumePdf} = require("../services/ai.service")
const interviewReportModel = require ("../models/interviewReport.model")

/**
 * @description generate new interview report on the basis of user 
 * selfdescription , resume pdf and job description
 */

async function generateInterViewReportContoller (req, res) {
   

    const resumeContent = await (new pdfParse.PDFParse(Uint8Array.from(req.file.buffer))).getText()
    const { selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume:resumeContent.text ,
        selfDescription,
        jobDescription

    })
 
    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume : resumeContent.text ,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })
      
res.status(201).json({
    message:"Interview report generated successfully",
    interviewReport
})
    
}

/**
 * @description get interview report on the basis of interviewId
 */

async function getInterviewReportByIdController (req, res) {
    const {interviewId} = req.params

    const interviewReport = await interviewReportModel.findOne({_id:interviewId, user:req.user.id})

    if(!interviewReport){
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    res.status(200).json({
        message:"Interview report fetched successfully",
        interviewReport
    })
}
  /**
   * @description get all interview reports of the logged in user
   */
async function getAllInterviewReportsController (req, res) {
    const interviewReports = await interviewReportModel.find({user:req.user.id})
    .sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message:"Interview reports fetched successfully",
        interviewReports
    })

}
/**
 * @description generate resume pdf on the basis of user selfdescription,resume and job description
 * @access private
 */

async function generateResumePdfController (req, res) {
    const{  interviewId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewId)
    if (!interviewReport)   {
        return res.status(404).json({
            message:"Interview report not found"
        })
    }
    const{ resume, selfDescription, jobDescription } = interviewReport
    const PdfBuffer = await generateResumePdf({resume, selfDescription, jobDescription})

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewId}.pdf`
       
    })
    res.send(PdfBuffer)
}

    
 




module.exports = { generateInterViewReportContoller,
                   getInterviewReportByIdController,
                   getAllInterviewReportsController,
                   generateResumePdfController
                 }