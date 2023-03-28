<script lang="ts">
	import { Affix, Notification, Text } from '@svelteuidev/core';
	import { CheckCircled, CrossCircled } from 'radix-icons-svelte';
	import { fade } from 'svelte/transition';

	export let loading: boolean, wasSuccessful: boolean, message: string, handleClose: () => void;

	setTimeout(() => handleClose(), 5000);
</script>

<Affix position={{ top: 20, right: 20 }}>
	<div transition:fade>
		<Notification
			title="Test notification"
			{loading}
			override={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.42), 0 6px 20px 0 rgba(0, 0, 0, 0.49)' }}
			icon={wasSuccessful ? CheckCircled : CrossCircled}
			color={wasSuccessful ? 'blue' : 'red'}
			on:close={handleClose}
		>
			<Text size={16}>{message}</Text>
		</Notification>
	</div>
</Affix>
