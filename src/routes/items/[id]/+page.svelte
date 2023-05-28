<script lang="ts">
	import type { Item } from '$lib/models/Item';
	import { Container, Title, Text, Anchor, Loader } from '@svelteuidev/core';

	export let item: Item | null;
</script>

<slot>
	{#await item}
		<Loader variant="bars" />
	{:then}
		<Text>{item}</Text>
		<Container mt={12} size="xl">
			<Title>{item?.name}</Title>
			<Text>{item?.date}</Text>
			<Text>{item?.amount}</Text>
			<Text>{item?.description}</Text>
			<Text>{item?.category}</Text>
			<Anchor href="/items">Back to Table View</Anchor>
		</Container>
	{/await}
</slot>
