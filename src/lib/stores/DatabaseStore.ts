import { Category, type Item } from '$lib/models/Item';
import { writable } from 'svelte/store';
import Database from 'tauri-plugin-sql-api';

export class DatabaseStore {
	db?: Database;

	async createDB() {
		this.db = await Database.load('sqlite:budgettracker.db');

		// await this.db?.execute("DROP TABLE IF EXISTS item;");
		await this.createItemsTable();
		// await this.addItem("Test", 1200.435, Category.BILLS);
	}

	async createItemsTable() {await this.db?.execute(
			`CREATE TABLE IF NOT EXISTS item (
				id INTEGER PRIMARY KEY AUTOINCREMENT, 
				name varchar NOT NULL,
				amount real NOT NULL,
				date DATETIME,
				category varchar,
				description varchar
			);`
		);
	}

	async getItemById(id: string): Promise<Item | null> {
		let result: Item[] = (await this.db?.select<Item[]>(`SELECT * from item WHERE id = ${id}`)) ?? [];
		return result.length > 0 ? result[0] : null;
	}

	async getAllItems() {
		let result: Item[] = (await this.db?.select<Item[]>('SELECT * from item')) ?? [];
		items.update((items) => (items = result));
	}

	async addItem(
		nameParam: string,
		amountParam: number,
		categoryParam: Category = Category.UNSET,
		descriptionParam: string = '',
		date?: Date
	) {
		let action = 'INSERT INTO item (name, amount, date, category, description) VALUES ($1, $2, $3, $4, $5)';

		await this.db?.execute(action, [nameParam, amountParam, !!date ? date : Date(), categoryParam, descriptionParam]);
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
