"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, User, CheckCircle2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import Link from "next/link";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      username: "", // ensure default value is an empty string
      password: "", // ensure default value is an empty string
    },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Check if the form submission was successful
    if (data.username === "test" && data.password === "password") {
      setSuccess(true);
      localStorage.setItem("isLoggedIn", "true");
      toast.success("Logged in successfully!");
      setTimeout(() => setSuccess(false), 3000);
      reset(); // Reset the form after successful submission
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } else {
      toast.error("Invalid username or password");
    }

    setIsSubmitting(false);
  };

  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
        <div className="flex justify-center items-center my-[20vh]">
          <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white w-[70vw]">
            <img
              src={session.user.image}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="font-bold text-xl mb-2">
                <span className="text-black text-sm">username:</span>
                {session.user.name}
              </div>
              <p className="text-gray-700 text-base">
                <span className="text-black font-bold text-sm">email:</span>
                {session.user.email}
              </p>
              <button
                onClick={() => signOut()}
                className="border border-black relative left-36 top-3 rounded-md p-2 bg-green-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center justify-center p-4">
      <ToastContainer />
      <AnimatePresence>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center space-y-4"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="h-12 w-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
            />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-gray-300 font-medium"
            >
              Loading ...
            </motion.span>
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md"
          >
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-700/50">
              <div className="text-center mb-10">
                <motion.h1
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2"
                >
                  Welcome Back
                </motion.h1>
                <p className="text-slate-400">Sign in to continue</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="group relative"
                >
                  <User className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
                        // value={username}
                        // onChange={(e) => setUsername(e.target.value)}
                        // required
                        placeholder="Username"
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-slate-200 placeholder-slate-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.username && (
                    <span className="text-red-400 text-sm">
                      {errors.username.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group relative"
                >
                  <Lock className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        // value={password}
                        // onChange={(e) => setPassword(e.target.value)}
                        // required
                        placeholder="Password"
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-slate-200 placeholder-slate-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.password && (
                    <span className="text-red-400 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center justify-between text-sm"
                >
                  <label className="flex items-center space-x-2 text-slate-400">
                    <input
                      type="checkbox"
                      className="rounded border-slate-600 bg-slate-700/50 focus:ring-blue-400"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </motion.div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-400 hover:to-purple-400 text-white font-medium py-3 rounded-xl transition-all duration-200 relative overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {success ? (
                      <motion.span
                        key="success"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Logged In!</span>
                      </motion.span>
                    ) : isSubmitting ? (
                      <motion.span
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center justify-center space-x-2"
                      >
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Authenticating...</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sign In
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
                <p className="text-white text-sm text-center">
                  Don't have any account?{" "}
                  <Link href={"/signuppage"}>
                    <span className="underline cursor-pointer ">signup</span>
                  </Link>
                </p>
              </form>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800/50 text-slate-400">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 my-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-700 py-2 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.835 0 3.456.705 4.691 1.942l3.099-3.099A9.97 9.97 0 0012.545 2C7.021 2 2.545 6.477 2.545 12s4.476 10 10 10c5.523 0 10-4.477 10-10a9.93 9.93 0 00-1.091-4.51l-8.909 4.749z"
                  />
                </svg>
                <span className="text-slate-300">Google</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="flex items-center justify-center space-x-2 bg-slate-700/50 hover:bg-slate-700 py-2 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.113.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"
                  />
                </svg>
                <span
                  className="text-slate-300"
                  onClick={() => signIn("github")}
                >
                  GitHub
                </span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginPage;
