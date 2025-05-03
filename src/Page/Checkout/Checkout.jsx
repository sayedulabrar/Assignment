import { React, useContext,useState } from "react";
import { toast } from "react-toastify";
import CartItems from "../Cart/CartItems";
import CartSummary2 from "../Cart/CartSummery2";
import { OrderContext } from "../../ContextAPIs/OrderProvider";

const Checkout = () => {
  const { cart } = useContext(OrderContext);
  const [formData, setFormData] = useState({
    name: "",
    form_no: "",
    father_name: "",
    father_phone_no: "",
    school_collage_name: "",
    job_title: "",
    email: "",
    gender: "",
    present_address: "",
    permanent_address: "",
    nid_no: "",
    phone_no: "",
    local_guardian_name: "",
    date_of_birth: "",
    admission_date: "",
    local_guardian_phone_no: "",
    blood_group: "",
    photo: null,
  });

  // Assuming cart[0] contains the necessary course info
  const course = cart[0] || {};
  const regularPrice = course?.regular_price || 0;
  const discountPrice = course?.discount_price || 0;
  const quantity = course?.quantity || 1;

  // Calculating the course fees
  const courseFee = regularPrice * quantity;
  const discountCourseFee = discountPrice * quantity;
  const subTotalCourseFee = courseFee - discountCourseFee;
  const totalCourseFee = courseFee;

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare form data
      const data = new FormData();

      // Append form fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          data.append(key, value);
        }
      });

      // Append course information
      data.append("course_id", course?.id || "");
      data.append("course_fee", courseFee);
      data.append("course_qty", quantity);
      data.append("total_course_fee", totalCourseFee);
      data.append("discount_course_fee", discountCourseFee);
      data.append("sub_total_course_fee", subTotalCourseFee);

      const response = await fetch("https://itder.com/api/course-purchase", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Response:", result);
      setFormData({
        name: "",
        form_no: "",
        father_name: "",
        father_phone_no: "",
        school_collage_name: "",
        job_title: "",
        email: "",
        gender: "",
        present_address: "",
        permanent_address: "",
        nid_no: "",
        phone_no: "",
        local_guardian_name: "",
        date_of_birth: "",
        admission_date: "",
        local_guardian_phone_no: "",
        blood_group: "",
        photo: null
      });
      toast.success(result.message);
      // Handle success (redirect, show message, etc.)
    } catch (error) {
        console.error("Error:", error);
        toast.error(error.message || "Failed to purchase the course");
      // Handle error (show error message, etc.)
    }
  };

  return (
    <div className="mt-5 border mx-2">
      <div className="bg-[#6f42c1] text-white p-6 text-center mb-5">
        <h2 className="text-5xl font-bold">Trainee Admission Form</h2>
      </div>
      <form
        className="bg-white shadow-md rounded-lg p-6"
        onSubmit={handleSubmit}
      >
        <div className="form-section">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="fullName"
                className="block font-semibold text-base mb-2"
              >
                Full Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                onChange={handleChange}
                name="name"
                value={formData.name}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="formNo"
                className="block font-semibold text-base mb-2"
              >
                Form no: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="formNo"
                onChange={handleChange}
                name="form_no"
                value={formData.form_no}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="parentName"
                className="block font-semibold text-base mb-2"
              >
                Father/Mother Name: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                onChange={handleChange}
                name="father_name"
                value={formData.father_name}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="parentNumber"
                className="block font-semibold text-base mb-2"
              >
                Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentNumber"
                onChange={handleChange}
                name="father_phone_no"
                value={formData.father_phone_no}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="school"
                className="block font-semibold text-base mb-2"
              >
                School/College: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="school"
                onChange={handleChange}
                name="school_collage_name"
                value={formData.school_collage_name}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="jobInfo"
                className="block font-semibold text-base mb-2"
              >
                Job Information:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="jobInfo"
                onChange={handleChange}
                name="job_title"
                value={formData.job_title}
                required
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="email"
                className="block font-semibold text-base mb-2"
              >
                Email: <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="gender"
                className="block font-semibold text-base mb-2"
              >
                Gender: <span className="text-red-500">*</span>
              </label>
              <select
                id="gender"
                onChange={handleChange}
                name="gender"
                value={formData.gender}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="" disabled>
                  Select Gender
                </option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Others">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="presentAddress"
                className="block font-semibold text-base mb-2"
              >
                Present Address: <span className="text-red-500">*</span>
              </label>
              <textarea
                id="presentAddress"
                onChange={handleChange}
                name="present_address"
                value={formData.present_address}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="permanentAddress"
                className="block font-semibold text-base mb-2"
              >
                Permanent Address: <span className="text-red-500">*</span>
              </label>
              <textarea
                id="permanentAddress"
                onChange={handleChange}
                name="permanent_address"
                value={formData.permanent_address}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="nid"
                className="block font-semibold text-base mb-2"
              >
                NID Number: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nid"
                onChange={handleChange}
                name="nid_no"
                value={formData.nid_no}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="mobile"
                className="block font-semibold text-base mb-2"
              >
                Mobile No: <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="mobile"
                onChange={handleChange}
                name="phone_no"
                value={formData.phone_no}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="guardianName"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian's Name:<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="guardianName"
                onChange={handleChange}
                name="local_guardian_name"
                value={formData.local_guardian_name}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="dob"
                className="block font-semibold text-base mb-2"
              >
                Date of Birth: <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dob"
                onChange={handleChange}
                name="date_of_birth"
                value={formData.date_of_birth}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="admissionDate"
                className="block font-semibold text-base mb-2"
              >
                Admission Date: <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="admissionDate"
                onChange={handleChange}
                name="admission_date"
                value={formData.admission_date}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="guardianPhone"
                className="block font-semibold text-base mb-2"
              >
                Local Guardian's Phone No:{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="guardianPhone"
                onChange={handleChange}
                name="local_guardian_phone_no"
                value={formData.local_guardian_phone_no}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="bloodGroup"
                className="block font-semibold text-base mb-2"
              >
                Blood Group: <span className="text-red-500">*</span>
              </label>
              <select
                id="bloodGroup"
                onChange={handleChange}
                name="blood_group"
                value={formData.blood_group}
                className="w-full border border-gray-300 rounded-md p-2"
                required
              >
                <option value="" disabled>
                  Select Blood Group
                </option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="photo"
              className="block font-semibold text-base mb-2"
            >
              Photo:<span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="photo"
              onChange={handleChange}
              name="photo"
              className="w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
              required
            />
          </div>
        </div>

        <div className="m-mt_16px">
          <h1 className="text-sm md:text-text_xl lg:py-0 font-bold text-center">
            Cart
          </h1>
          <div className="pt-p_16px m-mt_16px">
            <div className="lg:flex items-start gap-3">
              <CartItems />
              <CartSummary2 />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
