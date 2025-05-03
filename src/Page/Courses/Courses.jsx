import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const { cart, addToCart, removeFromCart } = useContext(OrderContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://itder.com/api/get-course-list");
        console.log("Courses Response:", res.data);
        const data = res.data.courseData;
        setCourses(Array.isArray(data) ? data : []);
        console.log("Cart Data:", cart);
      } catch (error) {
        console.error("Failed to fetch courses:", error);
        setCourses([]); // fallback to avoid map crash
      }
    };
  
    fetchCourses();
  }, []);
  

  const isInCart = (id) => cart.some((course) => course.id === id);

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => {
          const {
            id,
            course_name,
            photo,
            regular_price,
            discount_price,
            trainer_data,
          } = course;

          const trainerName = trainer_data?.name || "Unknown Trainer";

          const discountPercent = Math.round(
            ((regular_price - discount_price) / regular_price) * 100
          );

          const inCart = isInCart(id);

          return (
            <div
              key={id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <div className="relative">
                <img src={photo} alt={course_name} className="w-full h-48 object-cover" />
              </div>
              <div className="p-4">
                <h2 className="text-gray-800 text-lg font-semibold mb-2">{course_name}</h2>
                <div className="flex items-center justify-between mb-4">
                  <span className="flex text-blue-500 text-md">★★★★★</span>
                  <span className="ml-2 text-gray-600 text-md font-bold">{trainerName}</span>
                </div>
                <p className="text-gray-600 text-md mb-4">
                  Course Details <span className="text-blue-500">Show Details</span>
                </p>
                <hr />
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="line-through text-gray-400 text-sm">Tk {regular_price}</span>
                    <span className="text-green-600 text-md font-bold ml-2">
                      -{discountPercent}%
                    </span>
                    <span className="text-black text-lg font-bold ml-2">
                      Tk {discount_price}
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  {inCart ? (
                    <button
                      onClick={() => removeFromCart(id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(course)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Courses;
