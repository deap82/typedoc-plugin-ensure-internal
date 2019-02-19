"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const components_1 = require("typedoc/dist/lib/converter/components");
const converter_1 = require("typedoc/dist/lib/converter/converter");
let EnsureInternalPlugin = class EnsureInternalPlugin extends components_1.ConverterComponent {
    initialize() {
        var options = this.application.options;
        var config = options.getRawValues();
        if (config.excludeExternals && config.mode === 0) {
            this.listenTo(this.owner, {
                [converter_1.Converter.EVENT_BEGIN]: this.onBegin
            });
        }
        else {
            this.application.logger.warn('typedoc-plugin-ensure-internal does nothing, review your TypeDoc config.');
        }
    }
    onBegin(context) {
        let currentDirectory = context.program.getCurrentDirectory().replace(/\\/g, '/') + '/';
        let relativePaths = [];
        for (var i = 0; i < context.fileNames.length; i++) {
            if (context.fileNames[i].indexOf(currentDirectory) > -1) {
                relativePaths.push(context.fileNames[i].replace(currentDirectory, ''));
            }
        }
        context.fileNames = context.fileNames.concat(relativePaths);
    }
};
EnsureInternalPlugin = __decorate([
    components_1.Component({ name: 'ensure-internal' })
], EnsureInternalPlugin);
exports.EnsureInternalPlugin = EnsureInternalPlugin;
