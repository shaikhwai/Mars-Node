/**
 * Created by waqar on 13/4/16.
 */
/**
 * Created by waqar on 23/3/16.
 */

import BaseBusiness = require("./base/BaseBusiness");
//mport IOrderModel = require("./../../model/interfaces/OrderModel");

interface EmailProvider  {
    openInbox(callback):void
}
export = EmailProvider;