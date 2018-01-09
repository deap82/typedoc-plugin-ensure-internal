# typedoc-plugin-ensure-internal

Plugin to workaround TypeDoc issue https://github.com/TypeStrong/typedoc/issues/673

Ensures all files within the typescript program directory are considered internal.
This plugin currently only has any effect when typedoc option `mode` is `'file'` and `excludeExternals` is `true`.

Not published on npm.

```
npm install https://github.com/deap82/typedoc-plugin-ensure-internal --save-dev
```
