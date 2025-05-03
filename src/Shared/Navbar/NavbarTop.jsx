import { MdMenu } from "react-icons/md";
import { useContext, useEffect } from "react";
import { OrderContext } from "../../ContextAPIs/OrderProvider";
import { Link, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useUser from "../../Security/useUser";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import useSmallScreen from "../../Hooks/useSmallScreen";

const NavbarTop = () => {
  const { open, setOpen, sidebarRef, cart } = useContext(OrderContext);
  const [isSmallScreen] = useSmallScreen();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [userData, , refetch] = useUser();
  const imgUrl = `https://littleaccount.com/uploads/userProfile/`;

  const handleLogout = async () => {
    try {
      const res = await axiosSecure("https://itder.com/api/logout");
      if (res.data) {
        navigate("/login");
        localStorage.removeItem("token");
        toast.success("Logout Successfully");
        window.location.reload();
        refetch();
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (isSmallScreen) {
      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      } else {
        document.removeEventListener("mousedown", handleClickOutside);
      }
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [open, isSmallScreen]);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isSmallScreen, setOpen]);

  return (
    <div className="bg-white py-pt_primary text-_white w-full shadow-md border-b-1">
      <ul className="flex gap-gap_primary justify-between px-pt_secondary">
        <div className="flex items-center gap-gap_primary text-text_sm font-semibold lg:hidden">
          <MdMenu
            onClick={() => setOpen(!open)}
            className="text-text_xxl cursor-pointer text-black"
          />
        </div>
        <div className="hidden lg:block"></div>

        <div className="flex items-center gap-8 text-text_sm font-semibold relative">
          {/* Cart Icon */}
          <div className="relative group/cart cursor-pointer">
            <FaShoppingCart className="text-black text-2xl" />
            {cart.length > 0 && (
              <div className="absolute -bottom-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </div>
            )}

            {/* Cart Hover List */}
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md p-2 z-50 hidden group-hover/cart:block">
              <h3 className="font-semibold mb-2">Cart Items</h3>
              {cart.length > 0 ? (
                <ul className="text-sm text-gray-700 max-h-60 overflow-y-auto space-y-2">
                  {cart.map((item, index) => (
                    <li
                      key={index}
                      className="py-2 border-b last:border-none flex items-center gap-2"
                    >
                      {/* Course Image */}
                      <img
                        src={item.photo}
                        alt={item.course_name}
                        className="w-12 h-12 rounded object-cover"
                      />

                      {/* Course Info */}
                      <div className="flex flex-col">
                        <span className="font-semibold text-black truncate">
                          {item.course_name}
                        </span>
                        <span className="text-sm text-gray-600">
                          Trainer: {item.trainer_data?.name || "N/A"}
                        </span>
                        <span className="text-sm text-gray-600">
                          Price: ৳{item.discount_price || item.regular_price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">Cart is empty</p>
              )}
            </div>
          </div>

          {/* User Info and Profile Dropdown */}
          <div className="relative group/profile flex items-center gap-2 cursor-pointer">
            <h1 className="text-blue-500 text-xl font-medium">
              {userData?.userData.name}
            </h1>
            {userData?.userData.image ? (
              <img
                className="w-[40px] h-[40px] rounded-full"
                src={`${imgUrl}${userData.userData.image}`}
                alt="User"
              />
            ) : (
              <FaUserCircle className="w-[40px] h-[40px] rounded-full text-black" />
            )}

            {/* Profile Dropdown */}
            <div className="absolute top-10 right-0 bg-_white shadow-md rounded-sm overflow-hidden pt-2 w-48 z-10 hidden group-hover/profile:block">
              {userData && (
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Profile
                </Link>
              )}
              {userData ? (
                <Link
                  onClick={handleLogout}
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="block px-4 py-2 text-black hover:bg-bg_selected hover:text-white"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default NavbarTop;
