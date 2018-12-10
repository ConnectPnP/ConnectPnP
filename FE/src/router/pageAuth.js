//유저가 관리자이면 true, 아니면 false
export const AdminPage = (userData) => {
    if (userData.data.admin) {
        return true;
    } else {
        return false;
    }
}
