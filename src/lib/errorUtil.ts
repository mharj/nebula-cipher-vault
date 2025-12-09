export function buildError(err: unknown): Error {
	if (err instanceof Error) {
		return err;
	}
	return new Error(String(err));
}
