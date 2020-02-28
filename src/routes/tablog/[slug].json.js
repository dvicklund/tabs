import db from '../_database.js'

export async function get(req, res, next) {
	// the `slug` parameter is available because
	// this file is called [slug].json.js
	const { slug } = req.params;

	const tab = await db.get(slug)

	if (tab !== null) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(tab[0]));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
