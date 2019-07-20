/**
 * module phone-book-record represents combination of crud and model
 * any additional functionality, related to model could be also implemented here, like calculated fields, schema check
 * etc.
 */

import { MemoryStorage as Store } from '../storage/memory';

export default class PBRCrud {

    /**
     * @param {string} user
     */
    constructor (user) {
        this._user = user;
    }
    
    /**
     * list records
     * @param {Object} [options]
     * @param {object} [options.filter]
     * @param {string[]} [options.projection]
     * @param {number} [options.position]
     * @param {number} [options.limit]
     * @return {Promise<*[]>}
     */
    list (options) {
        return Store.get({user: this._user}).list(options || {});
    }

    /**
     * returns record by name
     * @param {string} user
     * @param {string} name
     * @return {*}
     */
    get (name) {
        return Store.get({user: this._user}).get({name: name});
    }

    /**
     * creates record if not exists
     * @param {string} user
     * @param {object} rec
     * @return {Promise<IDBValidKey | void>}
     */
    async create (rec) {
        const store = Store.get({user: this._user});
        // check if record exists
        let existing = store.get({name: rec.name});
        if (existing) throw new Error('record exists!');
        return await store.put(rec);
    }

    /**
     * updates record if exists
     * @param {string} user
     * @param {object} rec
     * @return {Promise<IDBValidKey | void>}
     */
    async update (name, rec) {
        const store = Store.get({user: this._user});
        // check if record exists
        let existing = store.get({name: name});
        if (!existing) throw new Error('record not found');
        if (!rec.name) rec.name = name;
        return await store.put(rec);
    }

    delete (name) {
        return Store.get({user: this._user}).delete({name: name});
    }
}

