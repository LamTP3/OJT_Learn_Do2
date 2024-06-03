// The First Method
import { Routes,  Navigate } from "react-router-dom";
import { useAuth } from "../services/useAuth";
import { ReactNode } from "react";

interface PrivateRouteProps {
    children: ReactNode;
    path: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children}) => {
    const { allData } = useAuth();
    if (!allData) {
        return <Navigate to="/login" replace />;
    }
    return <Routes>{children}</Routes>;
};

export default PrivateRoute;

// The Second Method
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../services/useAuth";

// interface PrivateRouteProps {
//     children: JSX.Element;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
//     const { allData } = useAuth();
//     if (!allData) {
//         return <Navigate to="/login" replace />;
//     }
//     return children;
// };

// export default PrivateRoute;






















