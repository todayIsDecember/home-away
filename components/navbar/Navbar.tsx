import NavSearch from './NavSearch';
import DarkMode from './DarkMode';
import LinksDropdown from './LinksDropdown';
import Logo from './Logo';

function Navbar({className}: {className: string}) {
	return (
		<nav className={`bg-none ${className}`}>
			<div className="container navbarGrid gap-4 py-8">
				<Logo className="logo" />
				<NavSearch className="searchBar" />
				<div className="flex items-center justify-between gap-4 content">
					<DarkMode />
					<LinksDropdown />
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
