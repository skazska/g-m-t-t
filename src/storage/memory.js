/**
 * Memory storage module represents simple (in-memory) storage
 * Demo only
 * Can't be used for production, without strong limitations
 */

/**
 * storage array
 * @type {MemoryStorage[]}
 */
const storage = [];

/**
 * represents Storage
 * should implement static method get(id:any)=>MemoryStorage
 * should implement methods:
 * list, get, put, delete
 * actually think of it as interface for any storage implementation
 */
export class MemoryStorage {

    constructor () {
        this._data = [];
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
        // filter out
        let result = this._data.filter(item => {
            return Object.keys(filter).every(key => {
                return filter[key] === item[key];
            })
        });
        // position and limit
        if ((position || position === 0) && limit) {
            result = result.slice(position, position + limit);
        }
        // project
        if (projection && projection.length) {
           result = result.map(item => {
               const result = {};
               return Object.keys(projection).forEach(key => {
                   result[key] = item[key];
               })
           });
        }
        return Promise.resolve(result);
    }

    /**
     * returns record by name
     * @param {object} condition
     * @return {*}
     */
    get (condition) {
        // find item and return it's clone
        return Object.assign(this._data.find(item => {
            return Object.keys(condition).every(key => {
                return condition[key] === item[key];
            })
        }));
    }

    /**
     * puts or replaces item with condition
     * @param {object} condition
     * @param {object} newItem
     */
    put (condition, newItem) {
        // remove item by condition
        this.delete(condition);

        // insert new
        this._data.push(newItem);
    }

    /**
     * removes item by condition
     * @param {object} condition
     */
    delete (condition) {
        let index = this._data.findIndex(item => {
            return Object.keys(condition).every(key => {
                return condition[key] === item[key];
            })
        });
        if (index || index === 0) {
            delete this._data[index];
            return Promise.resolve(true);
        } else {
            throw new Error('not found');
        }
    }

    /**
     * returns MemoryStorage instance by options
     * @param {object} options
     * @return {Promise<MemoryStorage>}
     */
    static get (options) {
        const id = options.user;
        if (!storage[id]) storage[id] = new MemoryStorage();

        return Promise.resolve(storage[id]);
    }
}

