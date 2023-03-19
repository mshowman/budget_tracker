<script lang="ts">
	import { Category } from '$lib/models/Item';
	import {
		Button,
		Card,
		Center,
		Container,
		Grid,
		Group,
		Loader,
		Text,
		Title,
		Affix
	} from '@svelteuidev/core';
	import { invoke } from '@tauri-apps/api/tauri';
	import { format, parseISO } from 'date-fns';

	export let data;

	async function addRandomItem() {
		let result = await invoke('add_item', {
			name: 'Test',
			amount: Math.random() * 100,
			category: 'INCOME'
		});

		console.log('Result of adding item: ', result);

		data.items = await invoke('select_all_items', {});
	}
</script>

<slot>
	<Grid cols={14} justify="center" align="flex-start" mt={12}>
		{#await data}
			<Center>
				<Loader variant="bars" />
			</Center>
		{:then}
			<Grid.Col span={1}>
				<Container size="sm">
					<Text>Jan</Text>
				</Container>
			</Grid.Col>

			<Grid.Col span={3} override={{ backgroundColor: 'lightgray' }}>
				<Text align="center" size="lg" weight="extrabold">Feb</Text>
				{#each data.items as item, index}
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
								{item.category ?? 'UNSET'}
							</Title>
							<Title weight="semibold" align="center" order={5} mt={4}>
								{format(parseISO(item.date), 'Pp')}
							</Title>
						</Card.Section>

						<Group position="apart">
							<Text weight="semibold">{item.name}</Text>
							<Text>
								{item.amount.toLocaleString('en-US', {
									style: 'currency',
									currency: 'USD'
								})}
							</Text>
						</Group>

						<Group position="center" mt={8} mb={0}>
							<Button
								variant="gradient"
								radius="xl"
								size="xs"
								compact
								ripple
								on:click={() => `/items/${item.id}`}
							>
								View Item
							</Button>
						</Group>
					</Card>
				{/each}
			</Grid.Col>
			{#each Array(10).fill(0) as _}
				<Grid.Col span={1}>
					<Container size="sm">
						<Text>Col</Text>
					</Container>
				</Grid.Col>
			{/each}
		{/await}
	</Grid>
</slot>
<Affix position={{ bottom: 20, right: 20 }}>
	<Button on:click={addRandomItem}>Add Item</Button>
</Affix>
