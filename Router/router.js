const router =require("express").Router()

const {createSchool, getASchool,getAllSchool} =require("../controller/schoolController")
const {createStudent, DeleteStudent,getAllStudentsBySchoolId,getStudentBySchoolAndStudentId} = require("../controller/studentController")

//router for schools
router.post("/createSchool", createSchool)
router.get("/getone/:id",getASchool)
router.get("/getAllSchool",getAllSchool)

//router for students
router.post("/createStudent/:id",createStudent)
router.get("/getAllStudentsBySchoolId/:id",getAllStudentsBySchoolId)
router.get("/getStudentBySchoolAndStudentId/:id",getStudentBySchoolAndStudentId)
router.delete("/deleteStudent/:id",DeleteStudent)

module.exports= router