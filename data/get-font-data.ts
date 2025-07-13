import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { Data, Effect } from "effect"
import { FileSystem, Path } from "@effect/platform"
import { NodeFileSystem } from "@effect/platform-node"

class LoadFontDataError extends Data.TaggedError("LoadFontDataError") <{ message: string, cause?: unknown }> {}

export const getFontData = Effect.gen(function* () {
	const [geistSemiBold, geistBold] = yield* Effect.all(
		[
			Effect.tryPromise({
				try: () => readFile(join(process.cwd(), "assets/Geist-SemiBold.otf")),
				catch: error =>
					new LoadFontDataError({ message: "Failed to load `Geist-SemiBold` font", cause: error }),
			}),
			Effect.tryPromise({
				try: () => readFile(join(process.cwd(), "assets/Geist-Bold.otf")),
				catch: error =>
					new LoadFontDataError({ message: "Failed to load `Geist-Bold` font", cause: error }),
			}),
		],
		{ concurrency: "unbounded" },
	)

	return { geistSemiBold, geistBold }
}).pipe(
	Effect.withLogSpan("get_font_data"),
	Effect.tapError(Effect.logError),
	Effect.catchAll(() => Effect.succeed(null)),
)

export const getFontDataEffectFS = Effect.gen(function* () {
  const fs = yield* FileSystem.FileSystem
  const path = yield* Path.Path
  const [geistSemiBold, geistBold] = yield* Effect.all([
    fs.readFile(path.join(process.cwd(), "assets/Geist-SemiBold.otf")),
    fs.readFile(path.join(process.cwd(), "assets/Geist-Bold.otf")),
  ], { concurrency: "unbounded" })

  return { geistSemiBold: Buffer.from(geistSemiBold.buffer), geistBold: Buffer.from(geistBold.buffer) }
}).pipe(
  Effect.withLogSpan("get_font_data_effect_fs"),
  Effect.tapError(Effect.logError),
  Effect.catchAll(() => Effect.succeed(null)),
  Effect.provide(NodeFileSystem.layer),
  Effect.provide(Path.layer),
)