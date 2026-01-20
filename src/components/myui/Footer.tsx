import Link from "next/link";

export default function Footer() {
	return (
		<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
			<p>
				UK Location Data Explorer |{" "}
				<Link href="/status" className="hover:underline">
					Status
				</Link>{" "}
				|{" "}
				<a
					href="https://github.com/mfmasud/postcode_frontend"
					className="hover:underline"
					target="_blank"
					rel="noopener noreferrer"
				>
					Source
				</a>
			</p>
		</footer>
	);
}
