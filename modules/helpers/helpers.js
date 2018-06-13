const db = {
    /**
     * Inserts one document into the datastore
     * @function
     * @return {Promise}
     * @param {Nedb} datastore datastore to operate on
     * @param {Object} data data to be inserted
     */
    insert: (datastore, data) => {
        return new Promise((resolve, reject) => {
            datastore.insert(data, (err, doc) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(doc);
                return;
            });
        });
    },
    /**
     * Selects documents from a datastore based on the query
     * @function
     * @return {Promise}
     * @param {Nedb} datastore
     * @param {Object} query
     */
    select: (datastore, query) => {
        return new Promise((resolve, reject) => {
            datastore.find(query, (err, docs) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(docs);
                return;
            });
        });
    },
};

module.exports = {
    db,
};
