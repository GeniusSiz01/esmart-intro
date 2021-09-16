// import mongoose, { Schema, Document } from 'mongoose';

// export interface WasteCollectorAccountSchema {
//     firstName: string,
//     lastName: string,
//     location: string,
//     cellNumber: string,
//     email: string,
//     idNumber: number,
//     gender: string,
//     age: number,
//     password: string,
//     verification: boolean
// }

// interface userModel extends WasteCollectorAccountSchema, Document { }

// const AccountSchema: Schema = new Schema({
//     "firstName": { "type": String, "required": true, "unique": false },
//     "lastName": { "type": String, "required": true, "unique": false },
//     "username": { "type": String, "required": true, "unique": true },
//     "location": { "type": String, "required": true, "unique": false },
//     "cellNumber": { "type": String, "required": true, "unique": true },
//     "email": { "type": String, "required": true, "unique": true },
//     "idNumber": { "type": Number, "required": true, "unique": true },
//     "gender": { "type": String, "required": true, "unique": true },
//     "age": { "type": Number, "required": true, "unique": true },
//     "password": { "type": String, "required": true, "bcrypt": true },
//     "verification": { "type": Boolean, "required": true },
// });

// export interface WasteDonorAccountSchema {
//     firstName: string,
//     lastName: string,
//     residentialAddress: string,
//     cellNumber: string,
//     email: string,
//     idNumber: number,
//     gender: string,
//     age: number,
//     password: string,
//     verification: boolean
// }


// export default mongoose.model<userModel>('Accounts', AccountSchema);