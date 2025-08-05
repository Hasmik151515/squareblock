import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase"; // Փոխիր ուղին քո ֆայլերի կառուցվածքին
import { doc, setDoc } from "firebase/firestore";

interface RegisterProps {
  onLogin: (email: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleRegister = async () => {
    if (!email.includes("@")) {
      setError("Խնդրում ենք մուտքագրել ճիշտ Email");
      return;
    }
    if (password.length < 6) {
      setError("Գաղտնաբառը շատ կարճ է");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Պահպանում ենք օգտվողի տվյալները Firestore-ում
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      setError("");
      onLogin(user.email || "");
      navigate("/");
    } catch (err: any) {
      console.log("Register error:", err);
      setError("Գրանցման սխալ: " + err.message);
    }
  };

  return (
    <div>
      <p className="relative left-[700px] top-[50px] font-bold">Register</p>

      <input
        type="text"
        placeholder="Email or phone number"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="relative top-[100px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="relative top-[120px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />

      {error && (
        <p className="relative top-[140px] left-[480px] text-red-500">{error}</p>
      )}

      <button
        onClick={handleRegister}
        className="w-[480px] h-[55px] rounded-[20px] bg-orange-400 relative top-[180px] left-[470px] text-white"
      >
        Register
      </button>

      <p className="relative top-[250px] left-[620px]">
        Already registered?{" "}
        <Link to="/login" className="absolute left-[180px] text-orange-400">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
