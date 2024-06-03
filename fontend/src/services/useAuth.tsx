import { useSelector } from "react-redux";
export const useAuth = () => {
    const allData = useSelector(
        (state: any) => state.auth?.login?.currentUser
    );
    const accessToken = allData?.accessToken
    const user = allData?.user
    return { allData, user, accessToken };
};
