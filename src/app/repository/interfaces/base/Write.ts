import mongoose = require("mongoose");
interface Write<T> {
    create: (item:T, callback: (error: any, result: any ) => void) => void;
    update:(_id: mongoose.Types.ObjectId, item:T, callback: (error: any, result: any)=> void) => void ;
    delete: (_id: string, callback: (error: any, result: any) => void) => void;
    findOneAndUpdate: (query, newData,option, callback:(error: any, result: any)=> void) =>void;
    insertMany:(items, callback:(err: any, result: any ) => void)=>void;
    
}

export = Write;