import { database } from '$lib/stores/DatabaseStore';

export async function load({}) {
	await database.createDB();
	await database.getAllItems();
}
