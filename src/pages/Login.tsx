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
    .min(8, { message: "Password must be at least 8 characters." })
    .max(100, { message: "Password must be less than 100 characters." }),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { userLoggedIn } = useAuth();

  useEffect(() => {
    console.log("LOADING: ", loading);
    console.log("LOGGED IN?: ", userLoggedIn);
  }, [loading, userLoggedIn]);

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
      console.error("Error signing in:", error);

      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/app"} replace={true} />}
      <div className="h-screen w-screen bg-zinc-950">
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="bg-gray-800 rounded-none h-full w-full p-8 lg:w-2/5 lg:h-1/2 lg:rounded-xl">
            <div className="h-full w-full flex flex-col justify-between gap-4">
              <div>
                <p className="font-bold text-4xl text-white pb-4">Giriş Yap</p>
                <p className="text-lg text-white">
                  Giriş yaparak bütün projelerden faydalanabilirsiniz.
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex flex-col gap-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white">E-posta</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e-posta"
                            disabled={loading}
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
                        <FormLabel className="text-white">Şifre</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="şifre"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <Button
                size={"lg"}
                className="mt-4"
                onClick={form.handleSubmit(onSubmit)}
                disabled={loading}
              >
                Giriş
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
