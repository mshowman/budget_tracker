import { Category, type Item } from '$lib/models/Item';
import { writable } from 'svelte/store';
import Database from 'tauri-plugin-sql-api';

export class DatabaseStore {
	db?: Database;

	async createDB() {
		this.db = await Database.load('sqlite:budgettracker.db');

		await this.createItemsTable();
		// await this.addItem("Test", 1200.435, Category.BILLS);
	}

	async createItemsTable() {
		await this.db?.execute(
			`CREATE TABLE IF NOT EXISTS item (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				name varchar NOT NULL,
				amount real NOT NULL,
				date DATETIME DEFAULT (datetime('now','localtime')),
				category varchar,
				description varchar
			);`
		);
	}

	async getAllItems() {
		let result: Item[] = (await this.db?.select<Item[]>('SELECT * from item')) ?? [];
		items.update((items) => (items = result));
	}

	async addItem(
		nameParam: string,
		amountParam: number,
		categoryParam: Category = Category.UNSET,
		descriptionParam: string = ''
	) {
		let action = 'INSERT INTO item (name, amount, category, description) VALUES ($1, $2, $3, $4)';

		await this.db?.execute(action, [nameParam, amountParam, categoryParam, descriptionParam]);
		await this.getAllItems();
	}

	async removeItem(id: string) {
		let action = 'DELETE FROM item WHERE id = $1';

		await this.db?.execute(action, [id]);
		await this.getAllItems();
	}
}

export let database = new DatabaseStore();
export const items = writable<Item[]>([]);
