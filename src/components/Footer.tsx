const Footer = () => {
  return (
    <footer className="border-t border-border py-10 bg-card">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-heading text-sm font-bold tracking-tight">
          <span className="text-primary">OBRUSE</span>{" "}
          <span className="text-foreground">APEX</span>
        </p>
        <p className="text-muted-foreground text-xs">
          © {new Date().getFullYear()} Obruse Apex Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
