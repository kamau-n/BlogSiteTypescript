// import { Request } from "express";
// import multer from "multer";
// import { type } from "os";
// import { ExtendedRequest } from "../interfaces/filenames";
// // import { new_variables_request } from "../interfaces/filenames";



// const storage = multer.diskStorage({

//   destination: function (req:Request, file, cb) {

//     cb(null, "./uploads/");
//     console.log("i have been accessed")
//   },
//   filename: function (req:Request, file, cb) {
    
//     cb(null, Date.now() + "-" + file.originalname);
    
//     req.file_name= Date.now() + "-" + file.originalname
//   },
// });

// const fileFilter = (req: ExtendedRequest, file: any, cb: any) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//     console.log("the image type is  " + file.mimetype)
//    // console.log(  req.file_name)
//   } else {
//     cb(new Error("Invalid file type, only JPEG and PNG are allowed!"), false);
//   }
// };

// const multerUpload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
 

// });
// //console.log(fileFilter)



// export default multerUpload;
