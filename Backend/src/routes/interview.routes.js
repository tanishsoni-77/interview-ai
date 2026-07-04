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


module.exports = interviewRouter