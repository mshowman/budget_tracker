<script>
	import { Center, SvelteUIProvider } from '@svelteuidev/core';
	import { AppShell, Header } from '@svelteuidev/core';
	import NavMenu from '$lib/components/NavMenu.svelte';
</script>

<SvelteUIProvider>
	<AppShell>
		<Header slot="header" height="40px">
			<NavMenu />
		</Header>
		<slot />
	</AppShell>
</SvelteUIProvider>
