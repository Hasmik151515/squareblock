import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"; 

interface LoginProps {
  onLogin: (email: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

 const handleLogin = async () => {
  if (!email.includes("@")) {
    setError("Խնդրում ենք մուտքագրել ճիշտ Email");
  } else if (password.length < 6) {
    setError("Գաղտնաբառը շատ կարճ է");
  } else {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      onLogin(email);
      navigate("/");
    } catch (err: any) {
      const errorCode = err.code;

      if (errorCode === "auth/user-not-found") {
        setError("Օգտատերը չի գտնվել։");
      } else if (errorCode === "auth/wrong-password") {
        setError("Գաղտնաբառը սխալ է։");
      } else if (errorCode === "auth/invalid-email") {
        setError("Էլ․հասցեն սխալ է։");
      } else {
        setError("Մուտքը ձախողվեց։ Փորձեք կրկին։");
      }
    }
  }
};


  return (
    <div>
      <p className="relative left-[700px] top-[50px] font-bold">Sign in</p>

      <div>
        <input
          type="text"
          placeholder="Email or phone number"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="relative top-[100px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="relative top-[120px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
        />
      </div>

      {error && (
        <p className="relative top-[140px] left-[480px] text-red-500">{error}</p>
      )}

      <p className="relative top-[150px] left-[480px] text-[13px] font-medium">
        Forgot password
      </p>

      <button
        onClick={handleLogin}
        className="w-[480px] h-[55px] rounded-[20px] bg-orange-400 relative top-[180px] left-[470px] text-white"
      >
        Sign in
      </button>

      <p className="relative left-[700px] top-[200px] text-gray-400">Or</p>

      <button className="flex gap-[5px] justify-center items-center w-[480px] h-[55px] rounded-[20px] border border-orange-400 relative top-[220px] left-[470px] text-black">
        <img
          className="h-[20px] w-[20px]"
          src="https://amaranoc.am/_next/image?url=%2Fimages%2Fgoogle-logo.png&w=32&q=75"
          alt="Google logo"
        />
        Sign in with google
      </button>

      <p className="relative top-[250px] left-[620px]">
        Not registered yet{" "}
        <Link to="/register" className="absolute left-[132px] text-orange-400">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
