const Footer = () => {
  return (
    <footer className="mt-20 border-t border-slate-700/70 py-8 text-sm text-slate-500">
      <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
        <p>&copy; {new Date().getFullYear()} Elias Firisa</p>
        <p>Updated October 2026</p>
      </div>
    </footer>
  );
};

export default Footer;
