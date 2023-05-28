<script lang="ts">
	import type { Item } from '$lib/models/Item';
	import { items } from '$lib/stores/DatabaseStore';
	import { Button, Center, Grid, Text, Tooltip } from '@svelteuidev/core';
	import OverviewCard from './OverviewCard.svelte';
	import { format, parseISO } from 'date-fns';
	import { toastStore } from '$lib/stores/ToastStore';

	export let isCurrentMonth: boolean, label: string;

	$: itemsForThisMonth = $items.filter(
		(item: Item) => format(parseISO(item.date), 'MMM') === label
	);

	function tooltipLabel(item: Item): string {
		return `${item.name}: $${item.amount} - ${format(parseISO(item.date), 'P')}`;
	}
</script>

<Grid.Col
	span={isCurrentMonth ? 3 : 1}
	override={{ backgroundColor: isCurrentMonth ? 'lightgray' : '' }}
>
	<Text
		align="center"
		size={isCurrentMonth ? 'lg' : 'md'}
		weight={isCurrentMonth ? 'extrabold' : 'normal'}>{label}</Text
	>
	{#each itemsForThisMonth as item}
		{#if isCurrentMonth}
			<OverviewCard {item} />
		{:else}
			<Center
				override={{
					margin: 10,
					display: 'flex',
					flexDirection: 'column',
					border: '1px solid black',
					borderRadius: 10,
					padding: 4,
					paddingTop: 8
				}}
			>
				<Tooltip label={tooltipLabel(item)}>
					<Text>{item.name}</Text>
					<div style={'display: flex; flex-direction: row; justify-content: center'}>
						<Button
							variant="subtle"
							override={{ padding: 0 }}
							on:click={() => toastStore.removeItem(item)}>X</Button
						>
						<Button variant="subtle" override={{ padding: 0 }}>E</Button>
					</div>
				</Tooltip>
			</Center>
		{/if}
	{/each}
</Grid.Col>
