import { getAllDocuments } from "@/utils/db";
import { IconMenu2 } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Icons } from "./Icon";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";
import { signOut } from "firebase/auth";
import { auth } from "@/config/firebase";

type Project = {
  id: string;
  name: string;
  url: string;
};

const Layout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = (await getAllDocuments("projects")) as Project[];

        setList(response);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectSelect = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="h-screen w-screen flex flex-1 flex-col bg-white">
      <header className="bg-white text-blue-600 p-4 gap-4 flex items-center shadow-md">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <IconMenu2 className="text-blue-600" />
            </button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <div className="flex flex-col items-center justify-center">
                <img
                  src="/images/logo.png"
                  alt="Logo"
                  className="w-48 h-32 object-contain"
                />
              </div>
            </SheetHeader>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Icons.spinner className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : (
              <ScrollArea>
                <div className="grid gap-4 py-4">
                  <SheetClose>
                    <div className="grid grid-cols-1 items-center gap-4">
                      {list.map((item) => (
                        <button
                          key={item.id}
                          onClick={() =>
                            handleProjectSelect(item.id.toString())
                          }
                          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md text-blue-600"
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </SheetClose>
                </div>
              </ScrollArea>
            )}
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 flex-row justify-between items-center">
          <button
            className="text-2xl font-semibold cursor-pointer hover:underline text-blue-600"
            onClick={() => navigate("/app")}
          >
            YZF
          </button>

          <Button
            onClick={() => {
              signOut(auth);
              navigate("/");
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Çıkış Yap
          </Button>
        </div>
      </header>

      <main className="h-full w-full flex-1">
        <Outlet />
      </main>

      <footer className="bg-white p-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-blue-600 font-bold">&copy; YZF</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
