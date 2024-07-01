"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { toast } from "sonner";

interface FormData {
  email: string;
  password: string;
}

const LogInForm = () => {
  const router = useRouter();

  const methods = useForm<FormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = methods;

  const onSubmit = async (values: FormData) => {

    const loadingToast = toast.loading("Loading...", {
      description: "Logging in...",
      duration: Infinity,
    });

 
    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    toast.dismiss(loadingToast);

    if (!res) {
      toast.error("Error", {
        description: "Please try again later.",
      });
      return;
    }

    if (!res.ok) {
      toast.error("Error", { description: "Incorrect email or password" });

      setError("email", { message: "Incorrect email or password" });
      setError("password", { message: "Incorrect email or password" });

      return;
    }

    toast.success("Success", { description: "Welcome to Sea Salon!" });

    router.replace("/");

    router.refresh();
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <div className="flex flex-col gap-4">
          {/* Email */}
          <FormField
            control={control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    className="border-gray-300 bg-white font-medium text-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Email"
                    {...field}
                  />
                </FormControl>
                {errors.email && (
                  <FormMessage className="text-red-500">{errors.email.message}</FormMessage>
                )}
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-gray-700">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="border-gray-300 bg-white font-medium text-gray-800 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Password"
                    {...field}
                  />
                </FormControl>
                {errors.password && (
                  <FormMessage className="text-red-500">{errors.password.message}</FormMessage>
                )}
              </FormItem>
            )}
          />
        </div>

        {/* Submit */}
        <button
          disabled={isSubmitting}
          className="flex w-full items-center justify-center rounded bg-blue-600 py-3 text-lg font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
        >
          Log In
        </button>
      </form>
    </FormProvider>
  );
};

export default LogInForm;
