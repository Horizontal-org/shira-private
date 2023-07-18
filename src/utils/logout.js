import axios from "axios";

export const logout = () => {
  window.localStorage.removeItem('shira_access_token')
  axios.defaults.headers.common['Authorization'] = null; 
  window.location.reload()
}