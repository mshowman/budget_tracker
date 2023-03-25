<script lang="ts">
	import type { Item } from '$lib/models/Item';
	import { Container, Modal, Title, Text } from '@svelteuidev/core';
	import { format, parseISO, subHours } from 'date-fns';
	import { TriangleRight } from 'radix-icons-svelte';

	export let opened: boolean, close: () => void, item: Item;
</script>

<Modal {opened} centered on:close={close}>
	<Container mt={12} size="xl">
		<Title>Item {item.name}</Title>
		<Text my={15}>There can be whatever here. Can edit info if wanted.</Text>
		<Text my={15}>
			<TriangleRight />
			{item.amount.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			})}
		</Text>
		<Text my={15}>
			<TriangleRight />
			{format(subHours(parseISO(item.date), 4), 'Pp')}
		</Text>
	</Container>
</Modal>
