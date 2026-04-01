import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Frontend only — will connect to Lovable Cloud later
    alert("Login functionality requires backend setup. Please set up Lovable Cloud.");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20 bg-muted min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="bg-card border border-border rounded-lg p-8">
              <div className="text-center mb-8">
                <LogIn className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground text-sm">Sign in to your account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label>Email Address</Label>
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="text-right">
                  <button type="button" className="text-secondary text-sm hover:underline">
                    Forgot password?
                  </button>
                </div>

                <Button type="submit" variant="secondary" className="w-full">
                  Sign In
                </Button>
              </form>

              <p className="text-center text-muted-foreground text-sm mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-secondary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Login;
