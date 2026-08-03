import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <Helmet>
        <title>Page Not Found (404) | 4 Pillars Realty</title>
        <meta
          name="description"
          content="The page you are looking for does not exist on 4 Pillars Realty."
        />
      </Helmet>
      <h1 className="font-serif font-black text-6xl text-slate-900 mb-4">404</h1>
      <p className="text-slate-500 text-sm mb-8">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-[#003B72] hover:bg-[#1A67A4] text-white text-xs font-bold py-2.5 px-6 rounded-xl uppercase tracking-wider"
      >
        Back to Home
      </button>
    </div>
  );
}
