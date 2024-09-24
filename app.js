// ## Data Types
// const obj = { myKey: { thisIs: 'a nested object' } }
// console.log(obj.myKey)

/*********************************************************************/

// ## Functions
// setTimeout(function () { console.log('hello from the future') }, 100)

// const obj = { id: 999, fn: function () { console.log(this.id) } }
// obj.fn() // prints 999

// const obj1 = { id: 999, fn: function () { console.log(this.id) } }
// const obj2 = { id: 2, fn: obj.fn }
// obj2.fn() // prints 2
// obj1.fn() // prints 999


// ### In Browser Environment!!!
// function fn() { console.log(this.id) }
// const obj3 = { id: 999 }
// const obj4 = { id: 2 }
// fn.call(obj4) // prints 2
// fn.call(obj3) // prints 999
// fn.call({id: ':)'}) // prints :)

// const add = (a, b) => a + 1
// const cube = (n) => {
//   return Math.pow(n, 3)
// }
// function fn() {
//   return (offset) => {
//    console.log(this.id + offset)
//   }
// }
// const obj5 = { id: 999 }
// const offsetter = fn.call(obj5)
// offsetter(0) // prints 999 (999 + 0)
// offsetter(1) // prints 1000 (999 + 1)
// offsetter(2) // prints 1001 (999 + 2)

// function normalFunction () { }
// const fatArrowFunction = () => {}
// console.log(typeof normalFunction.prototype) // prints 'object'
// console.log(typeof fatArrowFunction.prototype) // prints 'undefined'

/*********************************************************************/

// ## Prototypal Inheritance (Functional)
// const wolf = {
//   howl: function () { console.log(this.name + ': awoooooooo') }
// }
// const dog = Object.create(wolf, {
//   woof: { value: function() { console.log(this.name + ': woof') } }
// })
// const rufus = Object.create(dog, {
//   name: { value: 'Rufus the dog' }
// })
// rufus.woof() // prints "Rufus the dog: woof"
// rufus.howl() // prints "Rufus the dog: awoooooooo"

// function createDog (name) {
//     return Object.create(dog, {
//         name: {value: name + ' the dog'}
//     })
// }
// const rufus1 = createDog('Rufus')
// rufus1.woof() // prints "Rufus the dog: woof"
// rufus1.howl() // prints "Rufus the dog: awoooooooo"

// console.log(Object.getPrototypeOf(rufus) === dog) // true
// console.log(Object.getPrototypeOf(dog) === wolf) // true
// console.log(Object.getPrototypeOf(rufus1) === dog) // true

/*********************************************************************/

// ## Prototypal Inheritance (Constructor Functions)
// function Wolf (name) {
//     this.name = name
// }
// Wolf.prototype.howl = function () {
//     console.log(this.name + ': awoooooooo')
// }

/////////////////////////////////////////////
/* Option 1 */
// function Dog (name) {
//     Wolf.call(this, name + ' the dog')
// }
// function inherit (proto) {
//     function ChainLink(){}
//     ChainLink.prototype = proto
//     return new ChainLink()
// }
// Dog.prototype = inherit(Wolf.prototype)
// Dog.prototype.woof = function () {
//     console.log(this.name + ': woof')
// }
/////////////////////////////////////////////
/* Option 2 */
// function Dog (name) {
//     Wolf.call(this, name + ' the dog')
// }
// Dog.prototype = Object.create(Wolf.prototype)
// Dog.prototype.woof = function () {
//     console.log(this.name + ': woof')
// }
/////////////////////////////////////////////
/* Option 3 */
// const util = require('util')
// function Dog (name) {
//     Wolf.call(this, name + ' the dog')
// }
// Dog.prototype.woof = function () {
//     console.log(this.name + ': woof')
// }
// util.inherits(Dog, Wolf)
/////////////////////////////////////////////

// const rufus2 = new Dog('Rufus')
// rufus2.woof() // prints "Rufus the dog: woof"
// rufus2.howl() // prints "Rufus the dog: awoooooooo"

// console.log(Object.getPrototypeOf(rufus2) === Dog.prototype) // true
// console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype) // true

/*********************************************************************/

// ## Prototypal Inheritance (Class-Syntax Constructors)
// class Wolf {
//     constructor (name) {
//         this.name = name
//     }
//     howl () { console.log(this.name + ': awoooooooo') }
// }
// class Dog extends Wolf {
//     constructor(name) {
//         super(name + ' the dog')
//     }
//     woof () { console.log(this.name + ': woof') }
// }
// const rufus3 = new Dog('Rufus')
// rufus3.woof() // prints "Rufus the dog: woof"
// rufus3.howl() // prints "Rufus the dog: awoooooooo"

// console.log(Object.getPrototypeOf(rufus3) === Dog.prototype) // true
// console.log(Object.getPrototypeOf(Dog.prototype) === Wolf.prototype) // true

/*********************************************************************/

// ## Closure Scope
// function outerFn () {
//     var foo = true
//     function print() { console.log(foo) }
//     print() // prints true
//     foo = false
//     print() // prints false
// }
// outerFn()

// function outerFn1 () {
//     var foo = true
//     function print(foo) { console.log(foo) }
//     print(1) // prints 1
//     foo = false
//     print(2) // prints 2
// }
// outerFn1()

// function outerFn2 () {
//     var foo = true
// }
// outerFn2()
// // console.log(foo) // will throw a ReferenceError

// function init (type) {
//     var id = 0
//     return (name) => {
//       id += 1
//       return { id: id, type: type, name: name }
//     }
// }
// const createUser = init('user')
// const createBook = init('book')
// const dave = createUser('Dave')
// const annie = createUser('Annie')
// const ncb = createBook('Node Cookbook')
// console.log(dave) // prints {id: 1, type: 'user', name: 'Dave'}
// console.log(annie) // prints {id: 2, type: 'user', name: 'Annie'}
// console.log(ncb) // prints {id: 1, type: 'book', name: 'Node Cookbook'}

// ### 'createKeypair' and 'cryptoSign' are imaginary functions!!!
// function createSigner (secret) {
//     const keypair = createKeypair(secret) // ReferenceError: createKeypair is not defined
//     return function (content) {
//        return {
//           signed: cryptoSign(content, keypair.privateKey), // ReferenceError: cryptoSign is not defined
//           publicKey: keypair.publicKey
//        }
//     }
//   }
//   const sign = createSigner('super secret thing')
//   const signedContent = sign('sign me')
//   const moreSignedContent = sign('sign me as well')

// function wolf (name) {
//     const howl = () => {
//       console.log(name + ': awoooooooo')
//     }
//     return { howl: howl }
// }
// function dog (name) {
//     name = name + ' the dog'
//     const woof = () => { console.log(name + ': woof') }
//     return {
//       ...wolf(name),
//       woof: woof
//     }
// }
// const rufus = dog('Rufus')
// rufus.woof() // prints "Rufus the dog: woof"
// rufus.howl() // prints "Rufus the dog: awoooooooo"

/*********************************************************************/

// ## Excercises - Closure Scope
// 'use strict'
// //////////////////////////////////
// function prefixer (prefix) {
//     return (name) => {
//         return prefix + ' ' + name
//     }
// }
// //////////////////////////////////
// const sayHiTo = prefixer('Hello')
// const sayByeTo = prefixer('Goodbye')
// console.log(sayHiTo('Dave')) // prints'Hello Dave'
// console.log(sayHiTo('Annie')) // prints'Hello Annie'
// console.log(sayByeTo('Dave')) // prints'Goodbye Dave'

/*********************************************************************/

// ## Excercises - Prototypal Inheritance
const assert = require('assert')

// TODO: implement a way to create a prototype chain of leopard -> lynx -> cat
// leopard prototype must have ONLY a hiss method
// lynx prototype must have ONLY a purr method
// cat prototype must have ONLY a meow method
//////////////////////////////////////////////

//////////////////////////////////////////////

const felix = null 
// TODO: replace null with instantiation of a cat
felix.meow() // prints Felix the cat: meow
felix.purr() // prints Felix the cat: prrr
felix.hiss() // prints Felix the cat: hsss

// prototype checks, do not remove
const felixProto = Object.getPrototypeOf(felix)
const felixProtoProto = Object.getPrototypeOf(felixProto)
const felixProtoProtoProto = Object.getPrototypeOf(felixProtoProto)

assert(Object.getOwnPropertyNames(felixProto).length,1)
assert(Object.getOwnPropertyNames(felixProtoProto).length,1)
assert(Object.getOwnPropertyNames(felixProtoProto).length,1)
assert(typeof felixProto.meow,'function')
assert(typeof felixProtoProto.purr,'function')
assert(typeof felixProtoProtoProto.hiss,'function')
console.log('prototypecheckspassed!')