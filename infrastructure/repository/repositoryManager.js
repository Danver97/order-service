const dbs = require('@danver97/event-sourcing/eventStore');
const repoImpl = require('./repo');

function exportFunc(db) {
    if (!db)
        return repoImpl(dbs[process.env.EVENT_STORE]);
    return repoImpl(dbs[db]);
}

module.exports = exportFunc;
