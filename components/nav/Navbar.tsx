import LinksDropdown from './LinksDropdown';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="bg-muted py-4 sm:px-16 px-4 flex items-center justify-between">
      <div>
        <LinksDropdown />
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
}
