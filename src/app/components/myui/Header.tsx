import Image from "next/image";

export default function Header() {
	return (
		<header className="">
			<Image
				className="dark:invert"
				src="/next.svg"
				alt="Next.js logo"
				width={180}
				height={38}
				priority
			/>
		</header>
	);
}
