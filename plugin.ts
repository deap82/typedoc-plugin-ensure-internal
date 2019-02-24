import { Component, ConverterComponent } from "typedoc/dist/lib/converter/components";
import { Converter } from "typedoc/dist/lib/converter/converter";
import { Options, OptionsReadMode } from "typedoc/dist/lib/utils/options";
import { Context } from "typedoc/dist/lib/converter/context";
import { Reflection } from "typedoc/dist/lib/models/reflections/abstract";

@Component({ name: 'ensure-internal' })
export class EnsureInternalPlugin extends ConverterComponent {
	initialize() {
		var options: Options = this.application.options;
		var config = options.getRawValues();

		if (config.excludeExternals && config.mode === 0) {
			this.listenTo(this.owner, {
				[Converter.EVENT_BEGIN]: this.onBegin
			});
		} else {
			this.application.logger.warn('typedoc-plugin-ensure-internal does nothing, review your TypeDoc config.');
		}
	}

	private onBegin(context: Context) {
		let currentDirectory = context.program.getCurrentDirectory().replace(/\\/g, '/');
        let parentDirectory = currentDirectory.substring(0, currentDirectory.lastIndexOf('/') + 1);
        currentDirectory += '/';
        let relativePaths = [];
        for (var i = 0; i < context.fileNames.length; i++) {
            if (context.fileNames[i].indexOf(currentDirectory) > -1) {
                relativePaths.push(context.fileNames[i].replace(currentDirectory, ''));
            } else if (context.fileNames[i].indexOf(parentDirectory) > -1) {
                relativePaths.push(context.fileNames[i].replace(parentDirectory, '../'));
            }
        }
        context.fileNames = context.fileNames.concat(relativePaths);
	}
}