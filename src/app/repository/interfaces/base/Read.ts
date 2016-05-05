interface Read<T> {
    retrieve: (field, callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void;
    findAndPopulate: (field, populateField, callback:(err: any, result: any)=>void)=>void;
} 

export = Read;
