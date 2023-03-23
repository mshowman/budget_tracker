<script lang="ts">
	import { Category } from '$lib/models/Item';
	import { database, items } from '$lib/stores/DatabaseStore';
	import { Button, Card, Container, Grid, Group, Text, Title, Affix } from '@svelteuidev/core';
	import { format, parseISO } from 'date-fns';

	async function addItem() {
		await database.addItem('Test', Math.random() * 1000);
	}

	function viewItem(id: string) {
		location.href = `/items/${id}`;
	}

	async function removeItem(id: string) {
		await database.removeItem(id);
	}
</script>

<slot>
	<Grid cols={14} justify="center" align="flex-start" mt={12}>
		<Grid.Col span={1}>
			<Container size="sm">
				<Text>Jan</Text>
			</Container>
		</Grid.Col>

		<Grid.Col span={3} override={{ backgroundColor: 'lightgray' }}>
			<Text align="center" size="lg" weight="extrabold">Feb</Text>
			{#each $items as item}
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
							on:click={() => viewItem(item.id)}
						>
							View Item
						</Button>
						<Button
							variant="outline"
							radius="xl"
							size="xs"
							compact
							on:click={() => removeItem(item.id)}
						>
							Remove Item
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
	</Grid>
</slot>
<Affix position={{ bottom: 20, right: 20 }}>
	<Button on:click={addItem}>Add Item</Button>
</Affix>
