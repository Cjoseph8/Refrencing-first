const schoolModel=require("../model/schoolModel")

exports.createSchool= async(req,res)=>{
    try{
       const createSchool= await schoolModel.create(req.body)
       res.status(200)
       res.json({
        message:`School ${createSchool.schoolName} has been created`,
        data:createSchool
       }) 

    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.getASchool=async(req,res)=>{
    try{
        const oneSchool= await schoolModel.findById(req.params.id).populate('StudentInfo')
        res.status(200).json({message:'Kindly find the school with the above id below',data:oneSchool})
    }catch(err){
        res.status(500).json(err.message)
    }
}

exports.getAllSchool =async(req,res)=>{
    try{
        const allSchool = await schoolModel.find()
        res.status(200).json({
            message: `List of all schools are :${allSchool.length}`,
            data:allSchool,
            Total:allSchool.length
        })

    }catch(err){
        res.status(500).json(err.message)
    }
};

