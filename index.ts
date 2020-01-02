/** UMD export for 'es-module-shim' module. */
declare var importShim: {
  fetch(url: string): Promise<Response>
}

/** UMD export for TypeScript */
declare var ts: {
  fileExtensionIs(path: string, extension: string): boolean
  transpile(source: string, compilerOptions: object, file: string): string
}

// Override the fetch call to automattically compile typescript.
importShim.fetch = async urlString => {
  const url = new URL(urlString)
  const response = await fetch(url.toString())
  if (response.ok && ts.fileExtensionIs(url.pathname, 'ts')) {
    const source = await response.text()
    const result = ts.transpile(source, {
      module: "es2015",
      target: "es2019",
      esModuleInterop: true,
      resolveJsonModule: true,
      moduleResolution: "node",
      inlineSourceMap: true,
      inlineSources: true,

      // Inclime compiler options
      suppressOutputPathCheck: true,
      allowNonTsExtensions: true,
      // Source maps file structure fix.
      mapRoot: '../../',
    }, url.pathname)
      .replace(/["'](\.\.?\/)(.*?)\.js['"]/g, '"$1$2.ts"')
    return new Response(new Blob([result], { type: 'application/javascript' }))
  }
  return response
}
