import IReadInterceptor = require("./../common/ReadInterceptor");
import IWriteInterceptor = require("./../common/WriteInterceptor");
import IBaseBusiness = require("../../../app/business/interfaces/base/BaseBusiness");
interface BaseInterceptor<T extends IBaseBusiness<Object>> extends IReadInterceptor, IWriteInterceptor{
    
    
} 
export = BaseInterceptor;