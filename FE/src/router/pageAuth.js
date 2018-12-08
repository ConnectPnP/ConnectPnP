//유저가 관리자이면 true, 아니면 false
export const AdminPage=(userData)=>{
    console.log("beforeEnter>>"+userData.data.admin);
    if(userData.data.admin){
        console.log("ADMINISTARTOR!");
        return true;
    } else {
        return false;
    }
}
