export interface Item {
	id: string;
	name: string;
	amount: number;
	date: string;
	category?: Category;
	description?: string;
}

export enum Category {
	BILLS = 'BILLS',
	INCOME = 'INCOME',
	UNSET = 'UNSET'
}
