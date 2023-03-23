import type { Item } from '$lib/models/Item';
import { database } from '$lib/stores/DatabaseStore';

export async function load({}) {
	await database.create_db();
	await database.getAllItems();
}
