import axios from "axios";
import request from "./http";

const VueEnv = process.env.VUE_APP_ENV;

// 获取用户信息
export async function getUserInfo(userVid) {
  if (VueEnv === "TEST") {
    const response = await axios.get("json/user_info.json");
    return response.data;
  } else {
    return request({
      baseURL: "https://weread.qq.com",
      url: "/web/user?userVid=50157",
      method: "get",
    });
  }
}
