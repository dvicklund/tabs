import db from '../_database.js';

export async function get(req, res) {
	console.log('Getting recent tabs...')

	const recentTabs = await db.getRecent().catch((e) => {
		console.log('ERROR getting recent tabs: ')
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

	res.end(JSON.stringify(recentTabs));
}
