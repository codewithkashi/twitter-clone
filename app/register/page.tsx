"use client";
import { useState } from "react";
import { BiLogoTwitter } from "react-icons/bi";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/user/register", {
        name,
        username,
        email,
        password,
      });
      response.data.success
        ? (toast.success(response.data.message), router.push("/login"))
        : toast.error(response.data.message);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login__container">
      <div className="login__container-wrapper ">
        <div className="login__container-content">
          <BiLogoTwitter color="white" size={36} className="mt-10" />
          <div className="flex items-center justify-between p-10 rounded-t">
            <h3 className="login__container-heading">Create an Account</h3>
          </div>
          <div className="relative p-6 flex-auto">
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="login__container-input"
                required
                placeholder="Name"
              />
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                type="text"
                className="login__container-input"
                required
                placeholder="Username"
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="login__container-input"
                required
                placeholder="Email"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="login__container-input"
                required
                placeholder="Password"
              />
              <div className="flex flex-col gap-2 p-10">
                <button className="login__container-button" disabled={loading}>
                  Sign Up
                </button>
              </div>
            </form>
          </div>

          <div className="text-neutral-500 text-center mb-10 ">
            <p className="">
              Already have an account?{" "}
              <Link href={"/login"} className="login__container-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
