// Register.tsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  onLogin: (email: string, uid: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.includes("@")) {
      setError("Խնդրում ենք մուտքագրել ճիշտ Email");
      return;
    }
    if (password.length < 6) {
      setError("Գաղտնաբառը շատ կարճ է");
      return;
    }
    if (password !== confirmPassword) {
      setError("Գաղտնաբառերը չեն համընկնում");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      setError("");
      localStorage.setItem("userEmail", email);
      onLogin(email, userCredential.user.uid);
      navigate("/");
    } catch (err: any) {
      const errorCode = err.code;
      if (errorCode === "auth/email-already-in-use") {
        setError("Այս էլ․ հասցեն արդեն գրանցված է։");
      } else if (errorCode === "auth/invalid-email") {
        setError("Էլ․ հասցեն սխալ է։");
      } else {
        setError("Գրանցումը ձախողվեց։ Փորձեք կրկին։");
      }
    }
  };

  return (
    <div>
      <p className="relative left-[700px] top-[50px] font-bold">Register</p>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="relative top-[100px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="absolute top-[280px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="absolute top-[340px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />
      {error && (
        <p className="relative top-[140px] left-[480px] text-red-500">{error}</p>
      )}
      <button
        onClick={handleRegister}
        className="w-[470px] h-[55px] rounded-[30px] bg-orange-400 relative top-[390px] left-[0px] text-white"
      >
        Register
      </button>
      <p className="relative top-[430px] left-[620px]">
        Have an account?{" "}
        <a href="/login" className="absolute left-[132px] text-orange-400">
          Sign In
        </a>
      </p>
    </div>
  );
};

export default Register;
