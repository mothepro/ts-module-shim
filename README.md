# TS Module Shim

> Extends the 'es-module-shim' module to support TypeScript files

This should really only be used for development purposes.

TypeScript compiler is **large (8 Mb)** and **performance expensive**.

## How to Use

```html
<!-- Include the usual es-module-shim. -->
<script type="module" src="//unpkg.com/es-module-shims@0.4.6/dist/es-module-shims.min.js"></script>

<!-- Include typescript and this module -->
<script src="//unpkg.com/typescript@3.7.4/lib/typescript.js"></script>
<script type="module" src="//unpkg.com/@mothepro/ts-module-shim/dist/esm/index.js"></script>

<!-- Then include your typescript file as a shim -->
<script dev-only type="module-shim" src="index.ts"></script>
```

## TODO

+ Properly handle [typescript file extnesions](https://github.com/Zoltu/typescript-transformer-append-js-extension)
  + May need to use the [`transpileOptions` field](https://github.com/microsoft/TypeScript/blob/4fe27222ca2d012dad541b43d791ae12f1cf6985/src/services/transpile.ts)
+ Conditionally load Typescript
  + Import Typescript compiler within this module.
  + Require only one module to be leaded in the HTML
+ Better source map suppoert
+ Support custom tsconfig files
  + Support the `extends` field used in some TSConfigs
+ Add tests
