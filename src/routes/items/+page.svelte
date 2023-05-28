<script>
	import { items } from '$lib/stores/DatabaseStore';
	import { Anchor, Grid, Stack, Title } from '@svelteuidev/core';
	import { format, parseISO } from 'date-fns';
</script>

<slot>
	<Title align="center">Table View</Title>

	<Stack>
		<Grid mt={20} grow>
			<Grid.Col span={2} align="center" />
			<Grid.Col span={2} align="center">Date</Grid.Col>
			<Grid.Col span={2} align="center">Amount</Grid.Col>
			<Grid.Col span={2} align="center">Name</Grid.Col>
			<Grid.Col span={2} align="center">Category</Grid.Col>
		</Grid>
		{#each $items as item}
			<Grid grow>
				<Grid.Col span={2} align="center">
					<Anchor href={`/items/${item.id}`}>View</Anchor>
				</Grid.Col>
				<Grid.Col span={2} align="center">{format(parseISO(item.date), 'PP')}</Grid.Col>
				<Grid.Col span={2} align="center">
					{item.amount.toLocaleString('en-US', {
						style: 'currency',
						currency: 'USD'
					})}
				</Grid.Col>
				<Grid.Col span={2} align="center">{item.name}</Grid.Col>
				<Grid.Col span={2} align="center">{item.category}</Grid.Col>
			</Grid>
		{/each}
	</Stack>
</slot>
