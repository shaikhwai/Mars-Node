"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var OrderSchema = require("./../dataAccess/schemas/OrderSchema");
var RepositoryBase = require("./base/RepositoryBase");
var OrderRepository = (function (_super) {
    __extends(OrderRepository, _super);
    function OrderRepository() {
        _super.call(this, OrderSchema);
    }
    return OrderRepository;
}(RepositoryBase));
Object.seal(OrderRepository);
module.exports = OrderRepository;
//# sourceMappingURL=OrderRepository.js.map