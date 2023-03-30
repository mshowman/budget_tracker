<script lang="ts">
	import { toastStatus, toastStore } from '$lib/stores/ToastStore';
	import { Affix, Notification, Text } from '@svelteuidev/core';
	import { CheckCircled, CrossCircled } from 'radix-icons-svelte';
	import { fade } from 'svelte/transition';

	let id: string, wasSuccessful: boolean, message: string;

	$: {
		if ($toastStatus.length > 0) {
			id = $toastStatus.at(0)?.id ?? '';
			wasSuccessful = $toastStatus.at(0)?.wasSuccessful ?? false;
			message = $toastStatus.at(0)?.message ?? '';
		}
	}
</script>

<Affix position={{ top: 20, right: 20 }}>
	<div transition:fade>
		<Notification
			title="Test notification"
			override={{ boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.42), 0 6px 20px 0 rgba(0, 0, 0, 0.49)' }}
			icon={wasSuccessful ? CheckCircled : CrossCircled}
			color={wasSuccessful ? 'blue' : 'red'}
			on:close={() => toastStore.dismissToast(id)}
		>
			<Text size={16}>{message}</Text>
		</Notification>
	</div>
</Affix>
