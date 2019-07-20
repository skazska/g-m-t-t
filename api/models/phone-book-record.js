/**
 * module phone-book-record represents combination of crud and model
 * any additional functionality, related to model could be also implemented here, like calculated fields, schema check
 * etc.
 */

class PBRCrud {

    /**
     * @param user
     */
    constructor (storage) {
        this._store = storage;
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
        return this._store.list(options || {});
    }

    /**
     * returns record by name
     * @param {string} user
     * @param {string} name
     * @return {*}
     */
    get (name) {
        return this._store.get({name: name});
    }

    /**
     * creates record if not exists
     * @param {string} user
     * @param {object} rec
     * @return {Promise<IDBValidKey | void>}
     */
    async create (rec) {
        // check if record exists
        // expect that get will throw 'not found
        let existing;
        try {
            // get can throw 'not found'
            existing = await this._store.get({name: rec.name});

            // if not thrown, then it could exist already
            if (existing) throw new Error('record exists');
        } catch (e) {
            // if get thrown 'not found' - put item
            if (e.message === 'not found') {
                return this._store.put({name: rec.name}, rec);
            }

            // rethrow error other than 'not found'
            throw e;
        }
    }

    /**
     * updates record if exists
     * @param {string} user
     * @param {object} rec
     * @return {Promise<IDBValidKey | void>}
     */
    async update (name, rec) {
        // check if record exists
        await this._store.get({name: name});
        if (!rec.name) rec.name = name;
        return this._store.put({name: name}, rec);
    }

    /**
     * deletes record by name
     * @param name
     * @return {*}
     */
    delete (name) {
        return this._store.delete({name: name});
    }
}

module.exports = PBRCrud;
