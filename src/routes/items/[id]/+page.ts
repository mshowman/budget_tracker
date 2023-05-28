import { database } from '$lib/stores/DatabaseStore.js';

export function load({ params }) {


	return {item: database.getItemById(params.id)};
}
