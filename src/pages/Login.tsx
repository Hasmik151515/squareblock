import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

interface LoginProps {
  onLogin: (userEmail: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    if (!email.includes("@")) {
      setError("Խնդրում ենք մուտքագրել ճիշտ Email");
      return;
    }
    if (password.length < 6) {
      setError("Գաղտնաբառը շատ կարճ է");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Փակել սխալը, պահել տվյալները
      setError("");
      localStorage.setItem("userEmail", email);
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
  };

  return (
    <div>
      <p className="relative left-[700px] top-[50px] font-bold">Sign in</p>

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
        className="absolute top-[280px] left-[470px] p-5 border rounded-[10px] h-[43px] w-[480px]"
      />

      {error && (
        <p className="relative top-[140px] left-[480px] text-red-500">{error}</p>
      )}

      <p className=" absolute left-[475px] top-[340px]">Forgot password</p>

      <button
        onClick={handleLogin}
        className="w-[470px] h-[55px] rounded-[30px] bg-orange-400 relative top-[270px] left-[0px] text-white"
      >
        Sign in
      </button>

      <p className="relative left-[700px] top-[280px] text-gray-400">Or</p>

      <button
        className="w-[470px] h-[55px] rounded-[30px] border border-orange-400 relative top-[290px] left-[480px] flex justify-center items-center gap-3"
      >
        <img
          className="h-[30px] w-[30px]"
          src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
          alt="Google Logo"
        />
        Sign in with Google
      </button>

      <p className="relative top-[330px] left-[620px]">
        Not registered yet{" "}
        <Link to="/register" className="absolute left-[132px] text-orange-400">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
