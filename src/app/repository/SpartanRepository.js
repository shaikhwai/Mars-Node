var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SpartanSchema = require("./../dataAccess/schemas/SpartanSchema");
var RepositoryBase = require("./base/RepositoryBase");
var SpartanRepository = (function (_super) {
    __extends(SpartanRepository, _super);
    function SpartanRepository() {
        _super.call(this, SpartanSchema);
    }
    return SpartanRepository;
})(RepositoryBase);
Object.seal(SpartanRepository);
module.exports = SpartanRepository;
//# sourceMappingURL=SpartanRepository.js.map