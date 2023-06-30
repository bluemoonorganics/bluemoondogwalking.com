import fs from "fs";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";

export default async function Home() {
	const mdxSource = fs.readFileSync("content/index.md", "utf8");
	const { code, frontmatter } = await bundleMDX({
		source: mdxSource,
	});

	const Component = getMDXComponent(code);

	return (
		<>
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
				<pattern
					id="pattern"
					x="0"
					y="0"
					width="210"
					height="210"
					patternUnits="userSpaceOnUse"
				>
					<text
						className="emoji-pattern"
						x="0"
						y="100"
						width="80"
						font-size="80"
					>
						🐶
					</text>
					<text
						className="emoji-pattern"
						x="100"
						y="200"
						width="80"
						font-size="80"
					>
						🦮
					</text>
				</pattern>
				<rect fill="url(#pattern)" x="0" y="0" width="100%" height="100%" />
			</svg>
			<main className="container mx-auto my-40 max-w-4xl prose bg-white rounded-md shadow-lg p-16">
				{/* <h1 className="text-5xl font-extrabold my-8">Blue Moon Dog Walking</h1> */}
				<Component />
			</main>
		</>
	);
}
