// @ts-nocheck
export function getFilesFromDropEvent({ dataTransfer: { files, items } }) {
	return files.length
		? [...files]
		: items.filter(({ kind }) => kind === 'file').map(({ getAsFile }) => getAsFile());
}

export function getFilesFromInputEvent({ target }) {
	const files = target.files ? [...target.files] : [];
	target.value = '';
	return files;
}

export const getHeightAndWidthFromDataUrl = (dataURL) =>
	new Promise((resolve) => {
		const img = new Image();
		img.onload = () => {
			resolve({
				height: img.height,
				width: img.width
			});
		};
		img.src = dataURL;
	});
