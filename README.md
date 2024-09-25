# js-type-signatures

A utility library for generating and comparing JavaScript object type signatures. This library helps you determine if two objects share the same structure by comparing their type signatures. It's useful for validating object shapes, especially when working with dynamic or complex data structures.

<img src="https://github.com/user-attachments/assets/80014690-139e-46f1-96c5-12893b2b4a04" height="25">
<img src="https://github.com/user-attachments/assets/b1162d12-fa35-4746-918d-0d3ec0aa0d4a" height="25">
<img src="https://github.com/user-attachments/assets/9e1525c7-b7e0-4798-9126-5e5a8ec13d26" height="25">


## Features

- Generate type signatures for JavaScript objects, arrays, and primitives.
- Compare objects based on their type signatures.
- Handle arrays with uniform or mixed structures.
- Compare objects directly or against pre-generated type signature templates.

## Installation

To use `js-type-signatures`, simply clone the repository or download the source files:

```bash
git clone https://github.com/djstompzone/js-type-signatures.git
```

Alternatively, you can copy the `TypeSignature` class from the source code and integrate it into your project.

## Usage

### Generating Type Signatures

You can create a `TypeSignature` instance for any object, which generates a type signature that can be compared later.

```js
const frodo = {
    name: "Frodo Baggins",
    age: 50,
    hobbies: ["evading Nazgûl", "resisting temptation", "destroying the One Ring"]
};

const typeSig = new TypeSignature(frodo);
console.log(typeSig.signature);
// Output: { name: 'string', age: 'number', hobbies: ['string'] }
```

### Comparing Type Signatures

You can compare two objects to check if their structures match by comparing their signatures.

```js
const frodo = {
    name: "Frodo Baggins",
    age: 50,
    hobbies: ["evading Nazgûl", "resisting temptation"]
};

const sam = {
    name: "Samwise Gamgee",
    age: 38,
    hobbies: ["cooking coneys", "defending Frodo", "carrying the weight of friendship"]
};

const typeSig1 = new TypeSignature(frodo);
const typeSig2 = new TypeSignature(sam);

console.log(TypeSignature.compare(typeSig1, typeSig2)); 
// Output: true (Both are Hobbits with similar hobbies)
// Note: Arrays are compared by their type, not their length, as long as their structures match.
```

### Comparing Objects Against a Template

You can also generate a type signature template and use it to validate other objects.

```js
const hobbitTemplate = {
    name: "string",
    age: "number",
    hobbies: "string"
};

const templateSig = new TypeSignature(hobbitTemplate);

const pippin = {
    name: "Peregrin Took",
    age: 29,
    hobbies: "mischief"
};

console.log(TypeSignature.compareTemplate(pippin, templateSig)); 
// Output: true (Pippin follows the Hobbit template)
```

### Using `compareTo` for Simpler Comparisons

The `compareTo` method allows you to compare a normal object or a `TypeSignature` instance with an existing `TypeSignature` instance.

```js
const frodo = { name: "Frodo Baggins", age: 50 };

const hobbitTemplate = new TypeSignature({ name: "string", age: "number" });

console.log(hobbitTemplate.compareTo(frodo)); 
// Output: true (Frodo matches the Hobbit signature)

const aragorn = new TypeSignature({ name: "Aragorn", age: 87 });

console.log(hobbitTemplate.compareTo(aragorn)); 
// Output: false (Aragorn is no Hobbit...)
```

## License

`js-type-signatures` is licensed under the [MIT License](https://opensource.org/license/mit).

## Author

- **DJ Stomp** ([DJStompZone](https://github.com/djstompzone))

## Contributing

If you encounter any issues, have suggestions, or want to contribute to this project, feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/djstompzone/js-type-signatures).

