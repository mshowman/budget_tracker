export interface Item {
	id: string;
	name: string;
	amount: number;
	date: string;
	category?: Category;
}

export enum Category {
	BILLS = 'BILLS',
	INCOME = 'INCOME',
	UNSET = 'UNSET'
}
