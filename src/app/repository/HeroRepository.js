var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var HeroSchema = require("./../dataAccess/schemas/HeroSchema");
var RepositoryBase = require("./base/RepositoryBase");
var HeroRepository = (function (_super) {
    __extends(HeroRepository, _super);
    function HeroRepository() {
        _super.call(this, HeroSchema);
    }
    return HeroRepository;
})(RepositoryBase);
Object.seal(HeroRepository);
module.exports = HeroRepository;
//# sourceMappingURL=HeroRepository.js.map