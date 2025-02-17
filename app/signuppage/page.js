"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Lock, User, Mail, CheckCircle2 } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
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

    if (data.password === data.confirmPassword) {
      setSuccess(true);
      toast.success("Account created successfully!");
      reset();
      setTimeout(() => {
        router.push("/loginpage");
      }, 2000);
    } else {
      toast.error("Passwords do not match");
    }

    setIsSubmitting(false);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 flex items-center
     justify-center "
    >
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
                  Create Account
                </motion.h1>
                <p className="text-slate-400">Join our community</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  className="group relative"
                >
                  <Mail className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="email"
                    control={control}
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="email"
                        placeholder="Email"
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-slate-200 placeholder-slate-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </motion.div>

                <motion.div
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="group relative"
                >
                  <User className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="username"
                    control={control}
                    rules={{
                      required: "Username is required",
                      minLength: {
                        value: 4,
                        message: "Username must be at least 4 characters",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="text"
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
                  transition={{ delay: 0.2 }}
                  className="group relative"
                >
                  <Lock className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
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
                  initial={{ x: -20 }}
                  animate={{ x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="group relative"
                >
                  <Lock className="h-5 w-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 group-focus-within:text-blue-400" />
                  <Controller
                    name="confirmPassword"
                    control={control}
                    rules={{
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="password"
                        placeholder="Confirm Password"
                        className="w-full pl-10 pr-4 py-3 bg-slate-700/50 rounded-xl border border-slate-600 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 text-slate-200 placeholder-slate-400 transition-all duration-200"
                      />
                    )}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-400 text-sm">
                      {errors.confirmPassword.message}
                    </span>
                  )}
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
                        <span>Account Created!</span>
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
                        <span>Creating Account...</span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="default"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      >
                        Sign Up
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>
              <div className="mt-6 text-center">
                <p className="text-slate-400">
                  Already have an account?{" "}
                  <a
                    href="/loginpage"
                    className="text-blue-400 hover:text-blue-300 transition-colors underline underline-offset-2"
                  >
                    Login here
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
