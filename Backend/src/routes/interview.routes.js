const express = require("express")
const interviewRouter = express.Router()
const authMiddleware = require ("../middlewares/auth.middleware")
const interviewContoller = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user 
 * selfdescription , resume pdf and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser, upload.single("resume") 
,interviewContoller.generateInterViewReportContoller)


/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report on the basis of interviewId
 * @access private
 */
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewContoller.getInterviewReportByIdController)

/**
 * @route GET /api/interview/
 * @description get all interview reports of the logged in user
 * @access private
 */
interviewRouter.get("/",authMiddleware.authUser,interviewContoller.getAllInterviewReportsController)


module.exports = interviewRouter