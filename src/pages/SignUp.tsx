import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserPlus } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-md bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-secondary" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Create an Account
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign up to apply for jobs, request services, and manage your profile.
              </p>
            </div>

            <form
              className="bg-card border border-border rounded-lg p-8 space-y-4"
              onSubmit={(e) => e.preventDefault()}
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">First Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="John"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Last Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Doe"
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="you@email.com"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
                <input
                  type="tel"
                  placeholder="+234..."
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Create a password"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Confirm Password *</label>
                <input
                  type="password"
                  required
                  placeholder="Confirm your password"
                  className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Create Account
              </button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-secondary font-medium hover:underline">
                  Log in
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SignUp;
