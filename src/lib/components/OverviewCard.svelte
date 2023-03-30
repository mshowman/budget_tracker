<script lang="ts">
	import { Category, type Item } from '$lib/models/Item';
	import { database } from '$lib/stores/DatabaseStore';
	import { toastStore } from '$lib/stores/ToastStore';

	import { Button, Card, Group, Title, Text } from '@svelteuidev/core';
	import { format, parseISO } from 'date-fns';
	import ViewItemModal from './ViewItemModal.svelte';

	export let item: Item;
	let opened = false;
	let timeoutId: number;

	function closeModal() {
		opened = false;
	}

	function viewItem() {
		opened = true;
	}

	function removeItem() {
		let message: string,
			wasSuccessful = false;

		let response = new Promise((res) => {
			res(confirm('Are you sure?'));
		});

		response.then((ok) => {
			if (ok) {
				database
					.removeItem(item.id)
					.then(() => {
						message = `Removed Item -- ${item.name}`;
						wasSuccessful = true;
					})
					.catch((error) => {
						message = `Failed to remove item -- ${error}`;
						wasSuccessful = false;
					})
					.finally(() => {
						toastStore.showToast(wasSuccessful, message);
					});
			}
		});
	}
</script>

<ViewItemModal {item} {opened} close={closeModal} />
<Card
	shadow="md"
	m="sm"
	withBorder
	override={{
		backgroundColor: item.category === Category.BILLS ? 'pink' : 'lightgreen',
		opacity: 0.9
	}}
>
	<Card.Section m="sm" p="sm">
		<Title weight="bold" align="center" order={4}>
			{item.name}
		</Title>
		<Title weight="semibold" align="center" order={5} mt={4}>
			{format(parseISO(item.date), 'P')}
		</Title>
		<Text weight="semibold" align="center">{item.category ?? 'UNSET'}</Text>
	</Card.Section>

	<Group position="center" mt={8} mb={0}>
		<Button variant="gradient" radius="xl" size="xs" compact ripple on:click={() => viewItem()}>
			View Item
		</Button>
		<Button variant="outline" radius="xl" size="xs" compact on:click={() => removeItem()}>
			Remove Item
		</Button>
	</Group>
</Card>
