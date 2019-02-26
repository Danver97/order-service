const repo = require('../infracture/repository/repositoryManager')('testdb');
const orderManager = require('../domain/logic/orderManager')(repo);
