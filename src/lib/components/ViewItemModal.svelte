<script lang="ts">
	import type { Item } from '$lib/models/Item';
	import { Container, Modal, Title, Text } from '@svelteuidev/core';
	import { format, parseISO } from 'date-fns';
	import { TriangleRight } from 'radix-icons-svelte';

	export let opened: boolean, close: () => void, item: Item;
</script>

<Modal {opened} centered on:close={close}>
	<Container mt={12} size="xl">
		<Title>{item.name}</Title>
		<Text weight="semibold" align="left">{item.description}</Text>
		<Text my={15}>
			<TriangleRight />
			{item.amount.toLocaleString('en-US', {
				style: 'currency',
				currency: 'USD'
			})}
		</Text>
		<Text my={15}>
			<TriangleRight />
			{format(parseISO(item.date), 'Pp')}
		</Text>
	</Container>
</Modal>
