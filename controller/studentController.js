const studentModel = require("../model/studentModel")
const schoolModel  = require("../model/schoolModel")

// CREATE STUDENT DATABASE AND ASIGNING IT TO A PARTICUL SCHOOL
exports.createStudent = async (req, res) => {
    try {
        const id = req.params.id;  // Extracts the 'id' parameter from the request URL

        // Finds the school document in the schoolModel collection based on the 'id'
        const school = await schoolModel.findById(id);

        // Creates a new student document using the data from the request body
        const createStudent = new studentModel(req.body);

        // Associates the student with the school by assigning the school object to the student's 'school' field
        createStudent.school = school;

        // Saves the newly created student document to the studentModel collection
        await createStudent.save();

        // Pushes the created student into the 'StudentInfo' array of the school document
        school.StudentInfo.push(createStudent);

        // Saves the updated school document (with the new student added) back to the schoolModel collection
        await school.save();

        // Sends a success response with status code 200 and JSON data indicating successful creation of the student
        res.status(200).json({ message: 'New student created successfully.', data: createStudent });

    } catch (err) {
        // Catches any errors that occur during the try block and sends a 500 status code with the error message
        res.status(500).json(err.message);
    }
};

exports.getAllStudent = async(req,res)=>{
    const allStudent = await studentModel.find();
    res.status(200).json({
        message:`Here are the Lists of all Students :${allStudent.length}`,
        data:allStudent,
        Total:allStudent.length
    })
}
// GET ALL STUDENTS IN A PARTICULAR SCHOOL
exports.getAllStudentsBySchoolId = async (req, res) => {
    try {
        const id = req.params.id;  // Extracts the 'id' parameter from the request URL

        // Finds the school document in the schoolModel collection based on the 'id'
        const school = await schoolModel.findById(id);

        if (!school) {
            return res.status(404).json({ message: 'School not found.' });
        }

        // Finds all student documents in the studentModel collection where 'school' field matches the found school
        const students = await studentModel.find({ school: school._id });

        res.status(200).json({message:`these are the students of this school: ${school.schoolName}`,
            data:students,
            Total:students.length
        })
    } catch (err) {
        // Catches any errors that occur during the try block and sends a 500 status code with the error message
        res.status(500).json({ message: err.message });
    }
};

// GET ONE STUDENT IN A PARTICULAR SCHOOL
exports.getStudentBySchoolAndStudentId = async (req, res) => {
    try {
        const schoolId = req.params.schoolId;    // Extracts the 'schoolId' parameter from the request URL
        const studentId = req.params.studentId;  // Extracts the 'studentId' parameter from the request URL

        // Finds the school document in the schoolModel collection based on the 'schoolId'
        const school = await schoolModel.findById(schoolId);

        if (!school) {
            return res.status(404).json({ message: 'School not found.' });
        }

        // Finds the student document in the studentModel collection where 'school' field matches the found school and '_id' matches 'studentId'
        const student = await studentModel.findOne({ _id: studentId, school: school._id });

        if (!student) {
            return res.status(404).json({ message: 'Student not found in this school.' });
        }

        res.status(200).json({ data: student });

    } catch (err) {
        // Catches any errors that occur during the try block and sends a 500 status code with the error message
        res.status(500).json({ message: err.message });
    }
};

// DELETE ONE STUDENT IN A PARTICULAR SCHOOL
exports.DeleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        // Find the student to be deleted
        const student = await studentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({ message: 'Student not found.' });
        }

        // Find the school associated with the student
        const school = await schoolModel.findById(student.school);

        if (school) {
            // Remove the student reference from the school's StudentInfo array
            school.StudentInfo.pull(studentId);
            await school.save();
        }

        // Delete the student
        await studentModel.findByIdAndDelete(studentId);

        res.status(200).json({ message: 'Student deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Get all students in a particular school
exports.getASchoolAndAllStudents = async(req,res) =>{
    try{
        const schoolId = req.params.id
        const aSchool = await schoolModel.findById(schoolId)
        if(!aSchool){
            return res.status(404).json({message:`School with ID: ${schoolId} is not found`})
        }
        
        const allStudents = await studentModel.find(req.body)
        const aSchoolAllStudents = await studentModel.find(aSchool.allStudents)
        if(!aSchoolAllStudents){
            return res.status(404).json({message:`Unable to fetch data from this school: ${aSchool.schoolName}`})
        }
        res.status(200).json({message:`these are the students of this school: ${aSchool.schoolName}`,
        data:aSchoolAllStudents,
        Total:allStudents.length
         })

    }catch(error){
        res.status(500).json(error.message)
    }
}