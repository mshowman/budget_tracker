<script lang="ts">
	import { Category, type Item } from '$lib/models/Item';
	import { database } from '$lib/stores/DatabaseStore';

	import {
		Button,
		Container,
		Group,
		Modal,
		NativeSelect,
		NumberInput,
		TextInput,
		Title
	} from '@svelteuidev/core';

	export let opened: boolean, close: (message: string, outcome: boolean) => void;

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
			item = defaultItem();
			close(`Added new item -- ${name}`, true);
		}
	}

	function onChange(e: CustomEvent<number>) {
		item.amount = e.detail;
	}
</script>

<Modal {opened} centered on:close={close}>
	<Container mt={12} size="xl">
		<Title>Add New Item</Title>
		<TextInput required label="Name" placeholder="What are we tracking?" bind:value={item.name} />
		<Group>
			<NumberInput
				bind:value={item.amount}
				on:change={onChange}
				required
				label="Amount"
				hideControls
				noClampOnBlur
			/>
			<NativeSelect bind:value={item.category} data={Object.values(Category)} label="Category" />
		</Group>
		<TextInput label="Description" placeholder="Any explanation for tracking this?" height={400} />
		<Button on:click={addItem} override={{ my: 12 }}>Save Item</Button>
	</Container>
</Modal>
