/**
 * storage module represents abstract storage ie storage Interface
 */


/**
 * represents Storage
 * should implement static method get(id:any)=>MemoryStorage
 * should implement methods:
 * list, get, put, delete
 * actually think of it as interface for any storage implementation
 */
class Storage {

    constructor (options) {
        this._options = options;
    }

    /**
     * list records
     * @param {object} filter
     * @param {string[]} projection
     * @param {number} position
     * @param {number} limit
     * @return {Promise<*[]>}
     */
    list (filter = {}, projection, position, limit) {
        throw new Error('not implemented');
    }

    /**
     * returns record by name
     * @param {object} condition
     * @return {*}
     */
    get (condition) {
        throw new Error('not implemented');
    }

    /**
     * puts or replaces item with condition
     * @param {object} condition
     * @param {object} newItem
     */
    put (condition, newItem) {
        throw new Error('not implemented');
    }

    /**
     * removes item by condition
     * @param {object} condition
     */
    delete (condition) {
        throw new Error('not implemented');
    }

    /**
     * returns Storage instance by options
     * @param {object} options
     * @return {Promise<Storage>}
     */
    static get (options) {
        throw new Error('not implemented');
    }
}

module.exports = Storage;
