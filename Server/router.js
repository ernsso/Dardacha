function route(handle, pathname, response, postData) {
	console.log("Début du traitement de l'URL " + pathname + ".");
	console.log(pathname);
	console.log(handle[pathname]);
	console.log(typeof handle[pathname] === 'function');
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else if(typeof handle[pathname.split('.').pop()] === 'function') {
		handle[pathname.split('.').pop()](pathname, response);
	} else {
		console.log("Aucun gestionnaire associé à " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end();
	}
}
exports.route = route;