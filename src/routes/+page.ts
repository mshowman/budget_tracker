import type { Item } from '$lib/models/Item';
import { invoke } from '@tauri-apps/api/tauri';

export async function load({}) {
	await invoke('create_database', {});
	let itemsLoaded: Item[] = await invoke('select_all_items', {});

	console.log(itemsLoaded);

	return {
		items: itemsLoaded
	};
}
