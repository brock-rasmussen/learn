# JavaScript: Understanding the Weird Parts (Udemy) - notes

- Syntax Parsers: A program that reads your code and determines what it does and if its grammar is valid.
- Lexical Environments: Where something sits physically in the code you write.
- Execution Context: A wrapper to help manage the code that is running.

- Object: A collection of name value pairs.

- Hoisting: During the creation phase of the execution context, memory space is setup for variables and functions. A complete function is saved in memory, while variables are set to undefined.
    - videos 10 - 12 are great at explaining this.
- Single Threaded: One command executed at a time.
- Synchronous: One at a time, and in order. JavaScript is synchronous.
- Asynchronous: More than one at a time.

- Invocation: Running a function.

- Scope: Where a variable is available in your code.

- Dynamic Typing: The parsing engine determines a variable's type while the code is running. The type is not explicitly set by the developer. Opposite of static typing.
- Primitive Type: A type of data that represents a single value - not an object
    1. `undefined`
    1. `null`
    1. `Boolean` - true or false
    1. `Number` - floating point number
    1. `String` - a sequence of characters
    1. `BigInt`
    1. `Symbol` ???
- Structural Types:
    1. `Object`
        - `Array`
        - `Map`
        - `Set`
        - `WeakMap`
        - `WeakSet`
        - `Date`
    1. `Function`

- Operator Precedence: Which operator function gets called first. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
- Associativity: What order operator functions get called in - left-to-right or right-to-left.
- Coersion: Converting a value from one type to another.
- Comparison Operators: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness

`let` and `const` are not "hoisted" and are block-scoped.
`var` is "hoisted" and is function-scoped.