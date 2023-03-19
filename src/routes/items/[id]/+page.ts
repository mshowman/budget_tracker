export function load({ params }) {
	if (params.id === '2') {
		return {
			itemId: Number(params.id),
			secretMessage: "Maria is so freakin' hot!"
		};
	}

	return {
		itemId: Number(params.id)
	};
}
