import waves from 'nice-waves';
import { writable } from 'svelte/store';

function waves_store() {
	const { subscribe, set } = writable(waves({
		fills: ['rgba(99, 102,241, .4)', '#5c4fb9aa', '#b856dfaa', '#362762aa'],
		flowRate: 2,
		swayRate: 0.07,
		wavelength: 12,
		complexity: 7,
		curviness: 1,
		offset: 0.44,
		randomFlowRate: 0,
		randomHeight: 0.44,
		swayVelocity: 0.87,
		randomSwayRate: 0.88
	}));

	return {
		subscribe,
		set,
	};
}

export const waves_store_instance = waves_store();
