import fs from "fs";
import path from "path";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import Image, { ImageProps } from "next/image";
import rehypeImgSize from "rehype-img-size";

type NewImageProps = Omit<
	ImageProps,
	"src" | "alt" | "width" | "height" | "placeholder"
> & {
	src?: ImageProps["src"] | undefined;
	alt?: ImageProps["alt"] | undefined;
	width?: ImageProps["width"] | string | undefined;
	height?: ImageProps["height"] | string | undefined;
	placeholder?: ImageProps["placeholder"] | string | undefined;
};

const components = {
	img: (props: NewImageProps) => {
		const newAlt: string =
			typeof props.alt === "string" ? props.alt : "no alt provided";
		const newSrc: string = typeof props.src === "string" ? props.src : "nosrc";

		return (
			<Image
				alt={newAlt}
				width={Number(props.width)}
				height={Number(props.height)}
				src={newSrc}
			/>
		);
	},
};

export default async function Home() {
	const mdxSource = fs.readFileSync("content/index.md", "utf8");
	const { code } = await bundleMDX({
		source: mdxSource,
		mdxOptions(options, frontmatter) {
			options.rehypePlugins = [
				...(options.rehypePlugins ?? []),
				[rehypeImgSize, { dir: path.join(process.cwd(), "public") }] as any,
			];
			return options;
		},
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
			<main className="container prose mx-auto my-10 max-w-4xl rounded-md bg-white p-16 shadow-lg">
				<h1 className="hidden">Blue Moon Dog Walking | Maple Ridge, BC</h1>
				<Component components={components} />
			</main>
		</>
	);
}
