import { Category, type Item } from '$lib/models/Item';
import { writable } from 'svelte/store';
import Database from 'tauri-plugin-sql-api';

export const items = writable<Item[]>([]);

export class DatabaseStore {
	db?: Database;

	async create_db() {
		this.db = await Database.load('sqlite:budgettracker.db');

		await this.createItemsTable();
	}

	async createItemsTable() {
		await this.db?.execute(
			`CREATE TABLE IF NOT EXISTS item (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				name varchar NOT NULL,
				amount real NOT NULL,
				date DATETIME DEFAULT (datetime('now','localtime')),
				category varchar
			);`
		);
	}

	async getAllItems() {
		let result: Item[] = (await this.db?.select<Item[]>('SELECT * from item')) ?? [];
		items.update((items) => (items = result));
	}

	async addItem(nameParam: string, amountParam: number, categoryParam: Category = Category.UNSET) {
		let action = 'INSERT INTO item (name, amount, category) VALUES ($1, $2, $3)';

		await this.db?.execute(action, [nameParam, amountParam, categoryParam]);
		await this.getAllItems();
	}

	async removeItem(id: string) {
		let action = 'DELETE FROM item WHERE id = $1';

		await this.db?.execute(action, [id]);
		await this.getAllItems();
	}
}

export let database = new DatabaseStore();
