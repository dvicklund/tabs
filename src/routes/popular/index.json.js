import db from '../_database.js';

export async function get(req, res) {
	console.log('Getting popular tabs...')

	const popularTabs = await db.getPopular().catch((e) => {
		console.log('ERROR getting popular tabs: ')
		console.log(e)
	})

	// const recentTabs = await db.checkHealth().catch((e) => {console.log("ERROR: "); console.log(e)})

	// console.log(recentTabs)

	res.writeHead(200, {
		'Content-Type': 'application/json'
	});

	res.on('error', (err) => {
		console.error(err)
	})

	res.end(JSON.stringify(popularTabs));
}
