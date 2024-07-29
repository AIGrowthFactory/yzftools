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
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

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

        const response = await getAllDocuments("projects");

        console.log(response);

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
    console.log("PROJECTID: ", projectId);
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="h-screen w-screen flex flex-1 flex-col">
      <header className="bg-gray-800 text-white p-4 gap-4 flex items-center">
        <Sheet>
          <SheetTrigger asChild>
            <button>
              <IconMenu2 />
            </button>
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>YZF Automations</SheetTitle>
              <SheetDescription>
              </SheetDescription>
            </SheetHeader>
            {loading ? (
              <div className="w-full h-full flex justify-center items-center">
                <Icons.spinner className="h-8 w-8 animate-spin" />
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
                          className="col-span-3 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md"
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
        <h1
          className="text-xl font-semibold cursor-pointer hover:underline"
          onClick={() => navigate("/app")}
        >
          YZF
        </h1>
      </header>

      <main className="h-full w-full flex-1">
        <Outlet />
      </main>

      <footer className="bg-black p-2">
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-white font-bold">&copy; YZF</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;