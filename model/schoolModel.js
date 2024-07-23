const mongoose= require('mongoose')

const schoolSchema= new mongoose.Schema({
    schoolName:String,

    schoolAddress:String,

    schoolEmail: String,

    StudentInfo:[{type:mongoose.Schema.Types.ObjectId,
        ref:"student",
}]

})

const schoolModel=mongoose.model("school",schoolSchema)

module.exports =schoolModel