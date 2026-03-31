import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-14 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <img src={logo} alt="OBRUS Apex Services" className="h-12 w-auto mb-4 rounded" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Integrated Solutions. Peak Performance. Trusted services across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Projects", to: "/projects" },
                { label: "Careers", to: "/careers" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Services</h4>
            <div className="flex flex-col gap-2">
              {["Manpower", "Cleaning", "HSE", "Maintenance"].map((s) => (
                <Link
                  key={s}
                  to="/services"
                  className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors"
                >
                  {s}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <Phone size={14} /> +234 800 000 0000
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <Mail size={14} /> info@obrusapex.com
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <MapPin size={14} /> Lagos, Nigeria
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} OBRUS Apex Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
