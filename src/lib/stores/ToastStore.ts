import { writable } from 'svelte/store';
import { v4 } from 'uuid';

interface ToastStatus {
	id: string;
	wasSuccessful: boolean;
	message: string;
}

class ToastStore {
	trackedToasts: Map<string, number> = new Map();

	showToast(wasSuccessful: boolean, message: string): void {
		let newId = v4();
		let timeoutId = this.startTimer(newId);

		toastStatus.update(
			(status) =>
				(status = [
					...status,
					{
						id: newId,
						wasSuccessful,
						message
					}
				])
		);

		this.trackedToasts.set(newId, timeoutId);
	}

	dismissToast(statusId: string): void {
		let timeoutId = this.trackedToasts.get(statusId);

		if (!!timeoutId) this.clearTimer(timeoutId);

		toastStatus.update((status) => {
			this.trackedToasts.delete(statusId);
			return status.length > 1 ? status.filter((s) => s.id !== statusId) : [];
		});
	}

	private startTimer(statusId: string): number {
		let runningTimeout = setTimeout(() => this.dismissToast(statusId), 3000);

		return runningTimeout;
	}

	private clearTimer(timeoutId: number): void {
		clearTimeout(timeoutId);
	}
}

const toastStatus = writable<ToastStatus[]>([]);
const toastStore = new ToastStore();

export { toastStatus, toastStore };
