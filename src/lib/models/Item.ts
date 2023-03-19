export interface Item {
	name: string;
	amount: number;
	date: string;
	category?: Category;
}

export enum Category {
	BILLS = 'BILLS',
	INCOME = 'INCOME'
}
