import { Icons } from "@/components/Icon";
import { getDocumentDetail } from "@/utils/db";
import { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  id: string;
};

const Project = () => {
  const { id } = useParams<Props>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState({});

  if (!id || null || "") {
    navigate("/404", { replace: true });
    return null;
  }

  useEffect(() => {
    const getProjectDetail = async () => {
      try {
        setLoading(true);

        const response = await getDocumentDetail("projects", id);

        setDetail(response);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    getProjectDetail();
  }, [id]);

  return (
    <div className="h-full w-full bg-[#fdfdfd]">
      {loading ? (
        <div className="h-full flex justify-center items-center">
          <Icons.spinner className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <Iframe
          url={`${detail.url}?embedded=true`}
          className="w-full h-full"
          loading="auto"
        />
      )}
    </div>
  );
};

export default Project;
