import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";

const useUser = () => {
    const axiosPublic = useAxiosSecure();
  
    const {data:userData = null, isLoading, refetch} = useQuery({
      queryKey : ['profile'],
      queryFn : async () => {
        const res = await axiosPublic("https://itder.com/api/profile");
        return res.data
      }
    })
    
    return [userData, isLoading, refetch]
    
};

export default useUser;