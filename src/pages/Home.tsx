import { useAuth } from "@/context/Auth";

type Props = {};

const Home = (props: Props) => {
  const { currentUser } = useAuth();

  return (
    <div className="h-full w-full bg-[#fdfdfd] p-4">
      Welcome, {currentUser?.email}
    </div>
  );
};

export default Home;