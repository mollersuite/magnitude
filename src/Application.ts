import type {
	getApplications as raycastGetApplications,
	getFrontmostApplication as raycastGetFrontmostApplication,
	getDefaultApplication as raycastGetDefaultApplication,
	open as raycastOpen,
} from "@raycast/api"
import { $ } from "bun"


export const getApplications: typeof raycastGetApplications = async (path) => {
	throw "Not yet implemented"
	return []
}

export const getFrontmostApplication: typeof raycastGetFrontmostApplication = async () => {
	throw "Wayland does not allow clients to access window information."
}

export const getDefaultApplication: typeof raycastGetDefaultApplication = async (path) => {
	throw "Not yet implemented"
	return {
		name: "blazingly fast",
		localizedName: "blazingly fast", // Why the fuck is there even a difference? Why not always send localizedName? Raycast API is a mess
		path: "", // "The absolute path to the application bundle, e.g. /Applications/Raycast.app" What the fuck is this on Linux?
		bundleId: "", // OK, this seems obvious, .desktop files should have these
	}
}

// "Note that you can use the application name, app identifier, or absolute path to the app." :tired:
export const open: typeof raycastOpen = async (path, app) => {
	if (!app && process.platform === "linux") {
		await $`xdg-open ${path}`
	}
	throw "Not yet implemented"
}