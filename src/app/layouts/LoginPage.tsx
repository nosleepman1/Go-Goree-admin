import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
import logoImg from "@/imports/WhatsApp_Image_2026-07-12_at_00.36.06.jpeg";
import { useAuthStore } from "@/app/store/authStore";

export default function LoginPage() {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Veuillez remplir tous les champs.");
    setLoading(true);
    try {
      await login(email, password);
      const dest = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/";
      navigate(dest, { replace: true });
    } catch (err) {
      if (err instanceof Error && err.message === "ACCESS_DENIED") {
        setError("Accès réservé aux administrateurs.");
      } else {
        setError("Échec de la connexion. Vérifiez vos identifiants.");
      }
    } finally {
      setLoading(false);
    }
  };

  return <div className='p-6'>Login</div>;
}
