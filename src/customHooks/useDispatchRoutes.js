import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoutes } from "../redux/userRoutes";
function useDispatchRoutes() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => {
    return state.users;
  });

  const fetchRoutesData = useCallback(() => {
    if (currentUser) {
      dispatch(fetchRoutes());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return { fetchRoutesData };
}

export default useDispatchRoutes;
