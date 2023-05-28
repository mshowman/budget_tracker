<script lang="ts">
	import AddItemModal from '$lib/components/AddItemModal.svelte';
	import MonthColumn from '$lib/components/MonthColumn.svelte';
	import { toastStore } from '$lib/stores/ToastStore';
	import { Button, Grid, Affix } from '@svelteuidev/core';
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
		end: startOfMonth(addMonths(new Date(), 5))
	}).map((month) => format(month, 'MMM'));
</script>

<AddItemModal opened={addItemModal} close={(outcome, message) => closeModal(outcome, message)} />

<Grid cols={9} justify="center" align="flex-start" mt={12}>
	{#each months as month, index}
		<MonthColumn isCurrentMonth={index === 1} label={month} />
	{/each}
</Grid>
<Affix position={{ bottom: 20, right: 20 }}>
	<Button on:click={addItem}>Add Item</Button>
</Affix>
