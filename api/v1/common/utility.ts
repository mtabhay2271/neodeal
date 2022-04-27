import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import jwt from "jsonwebtoken";
import sharp from "sharp";
import dotenv from "dotenv";
import _ from "lodash";
import TimeConst from "./constants/time.constants";
dotenv.config();
const AWS = require('aws-sdk');

const AWS_S3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: process.env.S3_KEY,
  secretAccessKey: process.env.S3_SECRET,
});


const secret_key = process.env.SECRET_KEY || '';


export class Validation {
  data: any;
  error: any;
}

class Utility {
  validateAndConvert = async (validateData: any, body: any) => {
    const result = new Validation();
    result.data = plainToClass(validateData, body);
    await validate(result.data, { skipMissingProperties: true }).then(
      (errors) => {
        if (errors.length > 0) {
          result.error = errors.map((err) => err.constraints);
          return result;
        }
      }
    );
    return result;
  };

  signJWT = (payload: any, expires_in?: string): string => {
    let jwtToken = jwt.sign(payload, secret_key, {
      expiresIn: expires_in ?? TimeConst.DEFAULT_EXP_TIME,
    });
    return jwtToken;
  };
  generateOTP = (): number => Math.floor(100000 + Math.random() * 900000);

  // UploadToAWSS3 = async (BucketFileKey: any, FileData: any, mimetype: string) => {
  //   try {
  //     if (mimetype === 'image/jpg' || mimetype === 'image/png' || mimetype === 'image/jpeg')
  //       FileData = await sharp(FileData).jpeg({ compression: 'lzw', bitdepth: 4 }).toBuffer();
  //     const params = {
  //       Bucket: process.env.S3_BUCKET,
  //       Key: process.env.S3_KEY,
  //       Body: FileData,
  //       ContentType: mimetype,
  //       Expires: 60 * 60 * 72,
  //     };
  //     let uploadedS3Path = "";
  //     await new Promise((resolve, reject) => {
  //       AWS_S3.upload(params, function (err: any, data: { Location: unknown; }) {
  //         if (err) {
  //           reject(err);
  //         } else {
  //           resolve(data.Location);
  //         }
  //       });
  //     });
  //     uploadedS3Path = await this.GetS3SignedUrl(BucketFileKey)
  //     let uploadedThumbnail
  //     if (uploadedS3Path) {
  //       if (mimetype === 'image/jpg' || mimetype === 'image/png' || mimetype === 'image/jpeg') {
  //         params.Key = "blur_" + params.Key;
  //         params.Body = await sharp(FileData).jpeg({ quality: 2 }).toBuffer();
  //         await new Promise((resolve, reject) => {
  //           AWS_S3.upload(params, function (err: any, data: { Location: unknown; }) {
  //             if (err) {
  //               reject(err);
  //             } else {
  //               resolve(data.Location);
  //             }
  //           });
  //         });
  //         uploadedThumbnail = await this.GetS3SignedUrl(params.Key)
  //       }
  //     }
  //     let imgURLs = {
  //       image: uploadedS3Path ? uploadedS3Path : '',
  //       thumbnail: uploadedThumbnail ? uploadedThumbnail : '',
  //     }
  //     return imgURLs;
  //   } catch (ex) {
  //     return "";
  //   }
  // };
  // GetS3SignedUrl = async(process.env.S3_KEY) =>{
  //   if (process.env.S3_KEY && process.env.S3_KEY.trim() !== "") {
  //     let urlToReturn = "";
  //     try {
  //       const paramsSigned = {
  //         Bucket: process.env.S3_BUCKET,
  //         Key: process.env.S3_KEY,
  //         Expires: 60 * 60 * 72,
  //       };
  //       let signedURL = await new Promise((resolve, reject) => {
  //         AWS_S3.getSignedUrl("getObject", paramsSigned, (err:any, url:any) => {
  //           if (err) {
  //             reject(err);
  //           }
  //           urlToReturn = url;
  //           resolve(urlToReturn);
  //         });
  //       });
  //       return signedURL;
  //     } catch (ex) {
  //       return "";
  //     }
  //   }
  //   else return "";
  // }




};


export default new Utility();

function async(S3_KEY: string | undefined) {
  throw new Error("Function not implemented.");
}
