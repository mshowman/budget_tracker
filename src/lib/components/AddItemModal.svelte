<script lang="ts">
	import { Category } from '$lib/models/Item';

	import { Container, Modal, NativeSelect, NumberInput, TextInput, Title } from '@svelteuidev/core';

	export let opened: boolean, close: () => void;
</script>

<Modal {opened} centered on:close={close}>
	<Container mt={12} size="xl">
		<Title>Add New Item</Title>
		<TextInput required label="Name" />
		<NumberInput
			required
			label="Amount"
			min={0}
			precision={2}
			hideControls
			step={0.01}
			formatter={(value) => {
				let num = new Number(value);
				return num.toLocaleString('en-US', {
					style: 'currency',
					currency: 'USD'
				});
			}}
		/>
		<NativeSelect data={Object.values(Category)} label="Category" />
	</Container>
</Modal>
