// ## Starting in Inspect Mode
function f (n = 99) {
    if (n === 0) throw Error()
    // debugger // ## Adding a Breakpoint in code
    f(n - 1)
}
f()