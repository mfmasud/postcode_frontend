import { MapPin } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function Header() {
	return (
		<header className="m-4">
			<div className="flex items-center gap-3 mb-2">
				<MapPin className="h-8 w-8 text-primary" />
				<h1 className="text-3xl font-bold text-balance">
					UK Location Data Explorer
				</h1>
			</div>
			<p className="text-muted-foreground text-pretty">
				Use the search area below to search for a UK postcode and view data for
				that postcode!
			</p>
			<Separator />
		</header>
	);
}
