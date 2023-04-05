<script lang="ts">
	import AddItemModal from '$lib/components/AddItemModal.svelte';
	import OverviewCard from '$lib/components/OverviewCard.svelte';
	import { items } from '$lib/stores/DatabaseStore';
	import { toastStore } from '$lib/stores/ToastStore';
	import { Button, Container, Grid, Text, Affix } from '@svelteuidev/core';
	import { addMonths, eachMonthOfInterval, format, startOfMonth, subMonths } from 'date-fns';

	let addItemModal = false;

	function addItem() {
		addItemModal = true;
	}

	function closeModal(outcome: boolean, msg: string) {
		addItemModal = false;

		if (outcome && msg != 'FALSE') toastStore.showToast(outcome, msg);
	}

	const months = eachMonthOfInterval({
		start: startOfMonth(subMonths(new Date(), 1)),
		end: startOfMonth(addMonths(new Date(), 10))
	}).map((month) => format(month, 'MMM'));
</script>

<AddItemModal opened={addItemModal} close={(outcome, message) => closeModal(outcome, message)} />

<Grid cols={14} justify="center" align="flex-start" mt={12}>
	<Grid.Col span={1}>
		<Container size="sm">
			<Text>{months[0]}</Text>
		</Container>
	</Grid.Col>

	<Grid.Col span={3} override={{ backgroundColor: 'lightgray' }}>
		<Text align="center" size="lg" weight="extrabold">{months[1]}</Text>
		{#each $items as item}
			<OverviewCard {item} />
		{/each}
	</Grid.Col>
	{#each Array(10).fill(0) as _, index}
		<Grid.Col span={1}>
			<Container size="sm">
				<Text>{months[index + 2]}</Text>
			</Container>
		</Grid.Col>
	{/each}
</Grid>
<Affix position={{ bottom: 20, right: 20 }}>
	<Button on:click={addItem}>Add Item</Button>
</Affix>
