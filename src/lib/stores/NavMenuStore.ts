import { writable } from 'svelte/store';

export const showNavMenu = writable(false);

export function toggleNavMenu() {
	showNavMenu.update((n: boolean) => {
		return !n;
	});
}

export function setNavMenu(val: boolean) {
	showNavMenu.set(val);
}
