import React, {useState, useEffect,  createContext} from "react";
import { auth } from "../firebase"
export const UserContext = createContext({user: null})

export default () => {
  const [user, setuser] = useState(null)
  useEffect(() => {
auth.onAuthStateChanged(async (user) => {
  const { displayName, email }  = user;
  setuser({
    displayName,
    email
  })
})
  },[])
  return (
    <UserContext.Provider value={user}>{this.props.children}</UserContext.Provider>
  )
}