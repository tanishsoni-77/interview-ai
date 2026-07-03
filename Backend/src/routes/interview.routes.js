const express = require("express")
const interviewRouter = express.Router()
const authMiddleware = require ("../middlewares/auth.middleware")
const interviewContoller = require("../controllers/interview.controller")
/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user 
 * selfdescription , resume pdf and job description
 * @access private
 */

interviewRouter.post("/",authMiddleware.authUser,interviewContoller.generateInterViewReportContoller)


module.exports = interviewRouter