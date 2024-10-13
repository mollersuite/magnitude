/**
 * Raycast has the [canAccess](https://developers.raycast.com/api-reference/environment#environment.canaccess) API,
 * intended for allowing developers to check if they can access some features, like AI which only Pro users can use.
 */

const set = new WeakSet()

/**
 * Mark an API feature as unimplemented.
 * After calling unimplemented, canAccess will return false when called with the same argument.
 */
export function unimplemented<T extends WeakKey>(value: T): T {
	set.add(value)
	return value
}

/**
 * @remarks This is called by extensions!
 */
export function canAccess(api: WeakKey): boolean {
	return set.has(api)
}