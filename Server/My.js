var registry = {};
My = {
	getService(servicePath){
		return registry[servicePath] || (registry[servicePath] = require(__dirname + servicePath));
	}
};
module.exports.My = My;