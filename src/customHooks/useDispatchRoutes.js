import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/userRoutes";
function useDispatchRoutes() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => {
    return state.users;
  });

  const params =
    currentUser?.User_Type === "Admin" || currentUser?.User_Type === "Matak"
      ? {}
      : { Applicant_User_Id: currentUser?._id };

  const fetchRoutesData = useCallback(() => {
    if (currentUser) {
      dispatch(fetchRoutes(params));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  // useEffect(() => {
  //   console.log("object");
  //   if (currentUser) {
  //     fetchRoutesData();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return { fetchRoutesData };
}

export default useDispatchRoutes;
