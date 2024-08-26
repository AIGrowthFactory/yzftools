import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/context/Auth";
import { doSignInWithEmailAndPassword } from "@/utils/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Navigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  email: z
    .string()
    .email({ message: "Geçerli bir e-posta adresi giriniz." })
    .min(5, { message: "E-posta adresi en az 5 karakter olmalıdır." })
    .max(100, { message: "E-posta adresi en fazla 100 karakter olabilir." }),
  password: z
    .string()
    .min(8, { message: "Şifre en az 8 karakter olmalıdır." })
    .max(100, { message: "Şifre en fazla 100 karakter olabilir." }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { userLoggedIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      await doSignInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      console.error("Giriş yaparken hata oluştu:", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/app"} replace={true} />}
      <div className="h-screen w-screen bg-[#FDFDFD] flex items-center justify-center">
        <div className="rounded-none p-8 w-full max-w-md lg:rounded-xl">
          <div className="flex flex-col justify-center items-center">
            <img
              src="./images/logo.png"
              alt="Logo"
              className="w-40 h-32 object-contain"
            />
            <p className="font-semibold text-2xl">Giriş Yap</p>
            <p className="text-sm text-[#666666]"></p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta adresi</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        className="border-[#7BB3E7] focus:ring-[#7BB3E7] focus:border-[#7BB3E7]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şifre</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        disabled={loading}
                        className="border-[#7BB3E7] focus:ring-[#7BB3E7] focus:border-[#7BB3E7]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  size="default"
                  className="mt-4 w-[60%] bg-[#7BB3E7] text-white hover:bg-[#5690C5]"
                  onClick={form.handleSubmit(onSubmit)}
                  disabled={loading}
                >
                  Giriş Yap
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
