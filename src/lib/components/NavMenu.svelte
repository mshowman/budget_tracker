<script>
	import { Anchor, Burger, Menu } from '@svelteuidev/core';
	import { Home, Pencil1 } from 'radix-icons-svelte';
	import { showNavMenu, toggleNavMenu, setNavMenu } from '$lib/stores/NavMenuStore';
</script>

<Menu
	transition="fly"
	transitionOptions={{ x: -100 }}
	slot="navbar"
	on:focusout={() => setNavMenu(false)}
>
	<Burger slot="control" opened={$showNavMenu} on:click={toggleNavMenu} my={4} />
	<Menu.Item icon={Home}>
		<Anchor href="/">Home Page</Anchor>
	</Menu.Item>
	<Menu.Item icon={Pencil1}>
		<Anchor href="/items">Table View</Anchor>
	</Menu.Item>
</Menu>
