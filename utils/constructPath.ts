export const getRelativePaths = (urlArray: string) => {
	const parts = urlArray.split('/');
	const relativePathIndex = parts.indexOf('temp-home-away') + 1;
	return parts.slice(relativePathIndex).join('/');
};