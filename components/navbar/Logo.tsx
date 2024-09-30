import { Button } from '../ui/button';
import Link from 'next/link';

function Logo({ className = '' }) {
	return (
		<Button size="default" variant="outline" asChild className={className}>
			<Link href="/">
				<p className="captitalize tracking-widest">Home Away</p>
			</Link>
		</Button>
	);
}

export default Logo;
