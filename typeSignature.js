/**
 * A utility library for generating and comparing JavaScript object type signatures.
 * @file typeSignature.js
 * @author DJ Stomp
 * @version 1.0.0
 * @copyright 2024 DJ Stomp
 * @license MIT License {@link https://opensource.org/license/mit|https://opensource.org/license/mit}
 * @see {@link https://github.com/djstompzone/js-type-signatures|js-type-signatures} for updates, issues, and more.
 */

class TypeSignature {
    /**
     * Constructs a TypeSignature instance by generating a signature for the provided object.
     * @param {*} obj - The object for which to generate the type signature.
     * @class
     * @classdesc Represents the type signature of an object, allowing for signature comparison.
     */
    constructor(obj) {
        this.signature = this._generateSignature(obj);
    }

    /**
     * Generates the type signature for a given object.
     * @private
     * @param {*} obj - The object to generate the type signature for.
     * @returns {string|object|Array} - The generated type signature.
     */
    _generateSignature(obj) {
        if (Array.isArray(obj)) {
            const elementSignatures = obj.map(item => this._generateSignature(item));
            const firstSignature = JSON.stringify(elementSignatures[0]);
            const uniform = elementSignatures.every(sig => JSON.stringify(sig) === firstSignature);
            return uniform ? [elementSignatures[0]] : elementSignatures;
        } else if (obj !== null && typeof obj === 'object') {
            const signature = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    signature[key] = this._generateSignature(obj[key]);
                }
            }
            return signature;
        } else {
            return typeof obj;
        }
    }

    /**
     * Compares the current TypeSignature instance with another object or TypeSignature.
     * @param {*} obj - The object or TypeSignature to compare against.
     * @returns {boolean} - Returns true if the signatures match, otherwise false.
     */
    compareTo(obj) {
        return (
            obj instanceof this.constructor ? 
            TypeSignature.compare(this.signature, obj.signature) 
            : TypeSignature.compareTemplate(obj, this.signature)
        );
    }

    /**
     * Compares a normal object with a TypeSignature template.
     * @param {*} obj - The object to compare.
     * @param {TypeSignature} templateSignature - The TypeSignature to compare the object against.
     * @returns {boolean} - Returns true if the object's signature matches the template, otherwise false.
     * @static
     */
    static compareTemplate(obj, templateSignature) {
        const objSignature = new TypeSignature(obj).signature;
        return TypeSignature.compare(objSignature, templateSignature.signature);
    }

    /**
     * Recursively compares two type signatures.
     * @param {*} sig1 - The first signature to compare.
     * @param {*} sig2 - The second signature to compare.
     * @returns {boolean} - Returns true if both signatures match, otherwise false.
     * @static
     */
    static compare(sig1, sig2) {
        if (typeof sig1 !== typeof sig2) {
            return false;
        }

        if (typeof sig1 !== 'object' || sig1 === null) {
            return sig1 === sig2;
        }

        if (Array.isArray(sig1)) {
            if (!Array.isArray(sig2) || sig1.length !== sig2.length) {
                return false;
            }
            for (let i = 0; i < sig1.length; i++) {
                if (!TypeSignature.compare(sig1[i], sig2[i])) {
                    return false;
                }
            }
            return true;
        } else {
            const keys1 = Object.keys(sig1);
            const keys2 = Object.keys(sig2);
            if (keys1.length !== keys2.length) {
                return false;
            }
            for (const key of keys1) {
                if (!sig2.hasOwnProperty(key)) {
                    return false;
                }
                if (!TypeSignature.compare(sig1[key], sig2[key])) {
                    return false;
                }
            }
            return true;
        }
    }
}
