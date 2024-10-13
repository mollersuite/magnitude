import type { WindowManagement } from "@raycast/api"

export const getDesktops: typeof WindowManagement.getDesktops = async () => {
	throw "Wayland does not allow clients to access window information."
}

export const getWindowsOnActiveDesktop: typeof WindowManagement.getWindowsOnActiveDesktop =
	async () => {
		throw "Wayland does not allow clients to access window information."
	}

export const setWindowBounds: typeof WindowManagement.setWindowBounds = async (
	options
) => {
	throw "Wayland does not allow clients to access window information."
}
