"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var model_1 = require("../model");
var abstract_service_1 = require("./abstract.service");
var SubjectService = /** @class */ (function (_super) {
    __extends(SubjectService, _super);
    function SubjectService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SubjectService.prototype._mockValues = function () {
        this.datastore.insert([
            new model_1.Subject("HST002", "Sociedade e Tecnologia"),
            new model_1.Subject("SFT001", "Engenharia de Software I"),
            new model_1.Subject("SFT002", "Engenharia de Software II"),
            new model_1.Subject("SFT003", "Engenharia de Software III"),
            new model_1.Subject("MAT001", "Cálculo")
        ]);
    };
    SubjectService.getInstance = function () {
        if (!SubjectService.instance) {
            SubjectService.instance = new SubjectService();
            SubjectService.instance._mockValues();
        }
        return SubjectService.instance;
    };
    SubjectService.prototype.getInstance = function () {
        return SubjectService.getInstance();
    };
    return SubjectService;
}(abstract_service_1.AbstractService));
exports.SubjectService = SubjectService;
