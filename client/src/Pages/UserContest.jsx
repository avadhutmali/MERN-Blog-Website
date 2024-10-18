import React, { Children, createContext, useState } from 'react'

export const UserContest = createContext({});

export function UserContestProvider({children}){
    const [userInfo,setUserInfo] = useState({});
    return <UserContest.Provider value={{userInfo,setUserInfo}}>
        {children}
    </UserContest.Provider>
}
