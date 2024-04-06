import { useMediaQuery } from 'svelte-breakpoints';

export const is_mobile = useMediaQuery('(max-width: 768px)');
