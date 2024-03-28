export const formatSeconds = (seconds: number) => {
	return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padEnd(2, '0')}`;
}
