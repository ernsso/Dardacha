function route(handle, pathname, response, postData) {
	console.log("D�but du traitement de l'URL " + pathname + ".");
	if (typeof handle[pathname] === 'function') {
		handle[pathname](response, postData);
	} else if(typeof handle[pathname.split('.').pop()] === 'function') {
		handle[pathname.split('.').pop()](pathname, response);
	} else {
		console.log("Aucun gestionnaire associ� � " + pathname);
		response.writeHead(404, {"Content-Type": "text/plain"});
		response.end();
	}
}
exports.route = route;