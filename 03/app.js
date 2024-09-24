// ## Preloading CommonJS Modules
// console.log('app.js: this is the main file')

// ## Stack Trace Limit
function f (n = 99) {
    if (n === 0) throw Error()
    f(n - 1)
}
f()