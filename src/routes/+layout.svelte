<script>
	import { SvelteUIProvider } from '@svelteuidev/core';
	import { AppShell, Header } from '@svelteuidev/core';
	import NavMenu from '$lib/components/NavMenu.svelte';
	import { toastStatus } from '$lib/stores/ToastStore';
	import Toast from '$lib/components/Toast.svelte';
</script>

<SvelteUIProvider>
	<AppShell>
		<Header slot="header" height="40px">
			<NavMenu />
		</Header>

		{#if $toastStatus.length > 0}
			<Toast />
		{/if}
		<slot />
	</AppShell>
</SvelteUIProvider>
