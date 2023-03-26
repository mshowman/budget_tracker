<script lang="ts">
	import { Category, type Item } from '$lib/models/Item';
	import { database } from '$lib/stores/DatabaseStore';

	import {
		Button,
		Container,
		Modal,
		NativeSelect,
		NumberInput,
		TextInput,
		Title
	} from '@svelteuidev/core';

	export let opened: boolean, close: () => void;

	let item: Item = defaultItem();

	function defaultItem(): Item {
		return {
			id: 'replace',
			name: '',
			amount: 0,
			category: Category.UNSET,
			date: new Date().toLocaleString()
		};
	}

	async function addItem() {
		let { name, amount, category } = item;
		if (!!name && name.length > 0 && !Number.isNaN(amount) && amount >= 0) {
			await database.addItem(name, amount, category);
			close();
		}
	}

	function onChange(e: CustomEvent<number>) {
		item.amount = e.detail;
	}
</script>

<Modal {opened} centered on:close={close} size="xl">
	<Container mt={12} size="xl">
		<Title>Add New Item</Title>
		<TextInput required label="Name" bind:value={item.name} />
		<NumberInput
			bind:value={item.amount}
			on:change={onChange}
			required
			label="Amount"
			hideControls
			noClampOnBlur
		/>
		<NativeSelect bind:value={item.category} data={Object.values(Category)} label="Category" />
		<Button on:click={addItem} override={{ my: 12 }}>Save Item</Button>
	</Container>
</Modal>
