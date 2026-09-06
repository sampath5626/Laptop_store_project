import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearFavorites } from "../features/favoriteSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearFavorites());
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  }, [dispatch, navigate]);

  return null;
}

export default Logout;
