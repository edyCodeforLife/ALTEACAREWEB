const modRewrite = require('connect-modrewrite');
const express = require('express');
const path = require('path');
const port = 8888;
const expressStaticGzip = require('express-static-gzip');

let app = express();
app.use(
	modRewrite([
		// express route has been taken care of, and won't enter here.
		'^/(.*).js$ - [L]',
		'^/assets/(.*)$ - [L]', // keep
		'^/(.*).css$ - [L]', ,
		'^/.*$ /index.html', // for whatever else, use index.html
		//'^((?!api).)*$ /index.html'         // for non-api routes, use index.html
	])
);

app.use(expressStaticGzip(path.join(__dirname, 'build'), {
	enableBrotli: true,
	orderPreference: ['br', 'gz'],
	setHeaders: function (res, path) {
		res.setHeader("Cache-Control", "public, max-age=31536000");
	}
}));
app.listen({ port, host: '0.0.0.0' }, err => {
	if (err) throw err;
	console.log(`> Ready on http://0.0.0.0:${port}`);
});
