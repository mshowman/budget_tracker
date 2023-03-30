<script lang="ts">
	import AddItemModal from '$lib/components/AddItemModal.svelte';
	import OverviewCard from '$lib/components/OverviewCard.svelte';
	import { items } from '$lib/stores/DatabaseStore';
	import { toastStore } from '$lib/stores/ToastStore';
	import { Button, Container, Grid, Text, Affix } from '@svelteuidev/core';

	let addItemModal = false;

	async function addItem() {
		addItemModal = true;
	}

	function closeModal(outcome: boolean, msg: string) {
		addItemModal = false;
		toastStore.showToast(outcome, msg);
	}
</script>

<AddItemModal opened={addItemModal} close={(outcome, message) => closeModal(outcome, message)} />

<Grid cols={14} justify="center" align="flex-start" mt={12}>
	<Grid.Col span={1}>
		<Container size="sm">
			<Text>Jan</Text>
		</Container>
	</Grid.Col>

	<Grid.Col span={3} override={{ backgroundColor: 'lightgray' }}>
		<Text align="center" size="lg" weight="extrabold">Feb</Text>
		{#each $items as item}
			<OverviewCard {item} />
		{/each}
	</Grid.Col>
	{#each Array(10).fill(0) as _}
		<Grid.Col span={1}>
			<Container size="sm">
				<Text>Col</Text>
			</Container>
		</Grid.Col>
	{/each}
</Grid>
<Affix position={{ bottom: 20, right: 20 }}>
	<Button on:click={addItem}>Add Item</Button>
</Affix>
