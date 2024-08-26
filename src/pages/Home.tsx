import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const App = () => {
  return (
    <div className="h-full w-full bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <Link to={"/project/V5zWi6SBVEEBBbixUWRu"}>
          <Card className="bg-white shadow-lg shadow-blue-500/50 h-40 flex items-center">
            <CardContent className="flex flex-col">
              <h2 className="text-lg font-bold mb-2 text-left">
                LinkedIn Scraper
              </h2>
              <div className="flex items-center">
                <p className="text-sm">
                  Şirket bilgileri ile şirket açıklaması, çalışma alanı gibi
                  bilgileri çekerek airtable’a aktarabilirsin
                </p>
                <img
                  src="src/pages/LinkedIn_icon.png"
                  alt="LinkedIn Logo"
                  className="w-12 h-12 ml-2"
                />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="bg-white shadow-lg shadow-blue-500/50 h-40 flex items-start pt-4">
          <CardContent>
            <h2 className="text-lg font-bold mb-2">Startup LLM</h2>
          </CardContent>
        </Card>
      </div>

      <div className="w-full max-w-screen-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
        <Card className="bg-white shadow-lg shadow-blue-500/50 h-60 flex items-start pt-4">
          <CardContent>
            <h2 className="text-lg font-bold mb-2">Gaste</h2>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg shadow-blue-500/50 h-60">
          <CardContent className="p-0"></CardContent>
        </Card>
      </div>
    </div>
  );
};

export default App;
