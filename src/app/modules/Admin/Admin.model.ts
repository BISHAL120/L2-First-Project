import { Schema } from "mongoose";
import { TAdmin, TUserName } from "./Admin.interface";
import { userModel } from "../user/user.model";
import { BloodGroup, Gender } from "./Admin.constant";

const userNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is Require'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 Character']
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is Required'],
        trim: true,
        maxlength: [20, 'Name can not be more than 20 character']
    }
});

const adminSchema = new Schema<TAdmin>({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    user: {
        type: String,
        required: [true, 'user name is Required'],
        unique: true,
        ref: userModel,
    },
    designation: {
        type: String,
        required: [true, 'Designation is Required'],
    },
    gender: {
        type: String,
        enum: {
            values: Gender,
            message: '{VALUE} value is not a valid Gender'
        },
        required: true,
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
    },
    contactNo: {
        type: String,
        required: [true, 'Contact Number is Required'],
    },
    bloodGroup: {
        type: String,
        enum{
            values: BloodGroup,
            message: '{Value} is not a valid Blood Group'
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    profileImg: { type: String },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    {
        toJSON: {
            virtuals: true,
        },
    },
);