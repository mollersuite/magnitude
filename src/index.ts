import type { AI } from "@raycast/api"
import { $ } from "bun"
import { platform } from "node:process"
import type { PathLike } from "node:fs"
import { pathToFileURL } from "node:url"
import getLocalStorage from "./LocalStorage"
import * as Application from "./Application"
import { Toast, showToast } from "./Toast"
import * as WindowManagement from "./WindowManagement"
import { canAccess, unimplemented } from "./unimplemented"

// Show file in the file explorer
async function showInFinder(path: PathLike) {
	if (platform === "darwin") {
		await $`open -R ${path}`
	} else if (platform === "win32") {
		await $`start explorer ${path}`
	} else if (platform === "linux") {
		// https://askubuntu.com/a/1424380
		// TODO: Use a real DBus client
		await $`dbus-send --print-reply --dest=org.freedesktop.FileManager1 /org/freedesktop/FileManager1 org.freedesktop.FileManager1.ShowItems array:string:"${pathToFileURL(
			path.toString()
		)}" string:""`
	} else {
		throw new Error("Unsupported platform")
	}
}

function ask(
	question: string,
	options?: AI.AskOptions
): Promise<string> & {
	on(event: "data", listener: (chunk: string) => void): void
} {
	return Object.assign(Promise.resolve("Magnitude does not yet support LLMs"), {
		on(event: "data", listener: (chunk: string) => void) {
			listener("Magnitude does not yet support LLMs")
		},
	})
}

enum Model {
	OpenAI_GPT4 = "openai-gpt-4",
	"OpenAI_GPT4-turbo" = "openai-gpt-4-turbo",
	OpenAI_GPT4o = "openai-gpt-4o",
	"OpenAI_GPT4o-mini" = "openai-gpt-4o-mini",
	Anthropic_Claude_Haiku = "anthropic-claude-haiku",
	Anthropic_Claude_Opus = "anthropic-claude-opus",
	Anthropic_Claude_Sonnet = "anthropic-claude-sonnet",
	MixtraL_8x7B = "mixtral-8x7b",
	"Mistral_Nemo" = "mistral-nemo",
	"Mistral_Large2" = "mistral-large-2",
	Llama3_70B = "llama3-70b",
	"Llama3.1_70B" = "llama3.1-70b",
	"Llama3.1_8B" = "llama3.1-8b",
	"Llama3.1_405B" = "llama3.1-405b",
	"Perplexity_Llama3.1_Sonar_Huge" = "perplexity-llama-3.1-sonar-huge-128k-online",
	"Perplexity_Llama3.1_Sonar_Large" = "perplexity-llama-3.1-sonar-large-128k-online",
	"Perplexity_Llama3.1_Sonar_Small" = "perplexity-llama-3.1-sonar-small-128k-online",
	/** @deprecated Use `AI.Model["OpenAI_GPT4o-mini"]` instead */
	"OpenAI_GPT3.5-turbo-instruct" = "openai-gpt-3.5-turbo-instruct",
	/** @deprecated Use `AI.Model.Llama3_70B` instead */
	Llama2_70B = "llama2-70b",
	/** @deprecated Use `AI.Model.Perplexity_Llama3_Sonar_Large` instead */
	Perplexity_Sonar_Medium_Online = "perplexity-sonar-medium-online",
	/** @deprecated Use `AI.Model.Perplexity_Llama3_Sonar_Small` instead */
	Perplexity_Sonar_Small_Online = "perplexity-sonar-small-online",
	/** @deprecated Use `AI.Model.Llama3_70B` instead */
	Codellama_70B_instruct = "codellama-70b-instruct",
	/** @deprecated Use `AI.Model["Perplexity_Llama3.1_Sonar_Large"]` instead */
	Perplexity_Llama3_Sonar_Large = "perplexity-llama-3-sonar-large-online",
	/** @deprecated Use `AI.Model["Perplexity_Llama3.1_Sonar_Small"]` instead */
	Perplexity_Llama3_Sonar_Small = "perplexity-llama-3-sonar-small-online",
	/** @deprecated Use `AI.Model["OpenAI_GPT4o-mini"]` instead */
	"OpenAI_GPT3.5-turbo" = "openai-gpt-3.5-turbo",
}

export default (extensionName: string): typeof import("@raycast/api") => ({
	Toast,
	showToast,
	showInFinder,
	LocalStorage: getLocalStorage(extensionName),
	AI: unimplemented({
		ask,
		Model,
	}),
	environment: {
		extensionName,
		canAccess,
	},
	...WindowManagement,
	...Application,

	// Are you fucking kidding me
	BrowserExtension: unimplemented({
		getContent: () => Promise.reject("Not yet implemented"),
		getTabs: () => Promise.reject("Not yet implemented")
	}),
	// We're not reporting extension errors to their authors yet
	captureException (exception) {
		console.error(exception)
		return
	},
})
