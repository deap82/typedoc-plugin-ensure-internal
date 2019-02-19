var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "typedoc/dist/lib/converter/components", "typedoc/dist/lib/converter/converter"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var components_1 = require("typedoc/dist/lib/converter/components");
    var converter_1 = require("typedoc/dist/lib/converter/converter");
    var EnsureInternalPlugin = /** @class */ (function (_super) {
        __extends(EnsureInternalPlugin, _super);
        function EnsureInternalPlugin() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EnsureInternalPlugin.prototype.initialize = function () {
            var _a;
            var options = this.application.options;
            var config = options.getRawValues();
            if (config.excludeExternals && config.mode === 0) {
                this.listenTo(this.owner, (_a = {},
                    _a[converter_1.Converter.EVENT_BEGIN] = this.onBegin,
                    _a));
            }
            else {
                this.application.logger.warn('typedoc-plugin-ensure-internal does nothing, review your TypeDoc config.');
            }
        };
        EnsureInternalPlugin.prototype.onBegin = function (context) {
            var currentDirectory = context.program.getCurrentDirectory().replace(/\\/g, '/') + '/';
            var relativePaths = [];
            for (var i = 0; i < context.fileNames.length; i++) {
                if (context.fileNames[i].indexOf(currentDirectory) > -1) {
                    relativePaths.push(context.fileNames[i].replace(currentDirectory, ''));
                }
            }
            context.fileNames = context.fileNames.concat(relativePaths);
        };
        EnsureInternalPlugin = __decorate([
            components_1.Component({ name: 'ensure-internal' })
        ], EnsureInternalPlugin);
        return EnsureInternalPlugin;
    }(components_1.ConverterComponent));
    exports.EnsureInternalPlugin = EnsureInternalPlugin;
});
