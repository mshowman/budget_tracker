<script lang="ts">
	import { Container, Title, Text, Anchor, Alert } from '@svelteuidev/core';
	import { ExclamationTriangle } from 'radix-icons-svelte';

	export let data;
</script>

<slot>
	<Container mt={12} size="xl">
		<Title>Item {data.itemId + 1}</Title>
		<Text my={15}>Specific information to this item would be presented here</Text>
		{#if data.secretMessage}
			<Alert
				icon={ExclamationTriangle}
				title="Shhh! This is a secret!"
				color="grape"
				variant="filled"
				m={16}
			>
				{data.secretMessage}
			</Alert>
		{/if}
		<Anchor href="/">Back to Dashboard</Anchor>
	</Container>
</slot>
