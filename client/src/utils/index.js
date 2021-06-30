import uuid from 'react-uuid'
export const checkUserAdmin=(user)=>{
if(user?.result?.isAdmin) return true
return false
}

export const createToken=()=>{
return uuid()
}