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
		Title,
		Loader,
		Center
	} from '@svelteuidev/core';

	import { Month, isSameMonth } from '@svelteuidev/dates';
	import { addMonths, format, subMonths } from 'date-fns';

	export let opened: boolean, close: (outcome: boolean, message: string) => void;

	let item: Item = defaultItem();
	let value = new Date();
	let month: Date = value;
	let formattedDate = format(value, 'PP');
	let monthSwitched = false;

	function defaultItem(): Item {
		return {
			id: 'replace',
			name: '',
			amount: 0,
			category: Category.UNSET,
			date: new Date().toLocaleString(),
			description: ''
		};
	}

	async function addItem() {
		let { name, amount, category, description } = item;
		if (!!name && name.length > 0 && !Number.isNaN(amount) && amount >= 0) {
			await database.addItem(name, amount, category, description);
			item = defaultItem();
			close(true, `Added new item -- ${name}`);
		}
	}

	function onClose() {
		item = defaultItem();
		close(false, 'FALSE');
	}

	function onChange(e: CustomEvent<number>) {
		item.amount = e.detail;
	}

	function goBackMonth() {
		value = subMonths(value, 1);
	}

	function goForwardMonth() {
		value = addMonths(value, 1);
	}

	$: {
		if (!isSameMonth(month, value)) {
			monthSwitched = true;

			setTimeout(() => {
				month = value;
				monthSwitched = false;
			}, 100);
		}
		formattedDate = format(value, 'PP');
	}
</script>

<Modal {opened} centered on:close={onClose}>
	<Container mt={12} size="xl">
		<Title>Add New Item</Title>
		<TextInput required label="Name" placeholder="What are we tracking?" bind:value={item.name} />
		<Group grow>
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
		<TextInput
			label="Description"
			placeholder="Any explanation for tracking this?"
			bind:value={item.description}
		/>
		<TextInput label="Date" bind:value={formattedDate} disabled override={{ opacity: 1.0 }} />

		<Group override={{ my: 12 }} grow>
			{#if monthSwitched}
				<div
					style="height: 250px; width: 214px; display: flex; justify-content: center; align-items: center"
				>
					<Loader variant="dots" />
				</div>
			{:else}
				<Center>
					<Month bind:value {month} onChange={(val) => (value = val)} firstDayOfWeek="sunday" />
				</Center>
			{/if}
		</Group>
		<Group grow>
			<Button on:click={goBackMonth}>Back</Button>
			<Button on:click={goForwardMonth}>Forward</Button>
		</Group>
		<Group grow>
			<Button on:click={addItem} override={{ my: 12 }}>Save Item</Button>
		</Group>
	</Container>
</Modal>
