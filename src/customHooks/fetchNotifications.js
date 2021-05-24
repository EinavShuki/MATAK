import axios from "axios";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axiosConfig from "../config/axiosConfig";

function useDispatchNoty() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector(state => {
    return state.users;
  });

  const fetchNotyData = useCallback(() => {
    if (currentUser) {
      dispatch(callNotifications());
      console.log(callNotifications());
    }
  }, [currentUser]);
  return { fetchNotyData };
}

const source = axios.CancelToken.source();
const callNotifications = async () => {
  try {
    const { data } = await axiosConfig.get("/notification/read", {
      cancelToken: source.token,
    });
    // console.log(data.data);
    data.data.forEach(noti => {
      noti.createdAt = noti.createdAt.slice(0, 19);
      noti.createdAt = noti.createdAt.replace("T", " ");
    });
    return data.data;
  } catch (err) {
    console.error("error:", err.message);
  }
};

export default useDispatchNoty;
