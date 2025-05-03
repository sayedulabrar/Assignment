import { useLocation } from "react-router-dom";
import TrackOrder from "./TrackOrder";

const OrderDetails = () => {
  const { state: coursePurchaseData } = useLocation();

  if (!coursePurchaseData) {
    return <div>No order data found.</div>;
  }

  return (
    <div className="m-mt_16px">
      <div className="w-full flex flex-col lg:flex-row items-start justify-center h-full gap-2 ">
        <div className="bg-white lg:p-p_30px w-full">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-xl font-bold">Order Information</p>
            <p className="p-3 rounded-md lg:my-2 my-1 w-fit border bg-[#D2C5A2] font-bold text-lg">
              Order Id :
              <span className="font-semibold"> {coursePurchaseData.id} </span>
            </p>
          </div>

          <div className="w-full border flex flex-col md:flex-row md:items-start md:mt-4 mt-3 bg-[#D2C5A2] rounded-md p-4">
            <div className="md:text-base text-sm flex-1 font-semibold md:border-r-2 md:border-black md:pr-10">
              <p className="font-bold md:mb-4 w-full">Student Info</p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Full Name :</p>
                  <p>{coursePurchaseData.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Father's Name :</p>
                  <p>{coursePurchaseData.father_name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Mobile :</p>
                  <p>{coursePurchaseData.phone_no}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Address :</p>
                  <p>{coursePurchaseData.present_address}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>NID No :</p>
                  <p>{coursePurchaseData.nid_no}</p>
                </div>
              </div>
            </div>

            <div className="md:text-base text-sm flex-1 font-semibold md:ml-10 mt-m_medium">
              <p className="font-bold md:mb-4 w-full">Guardian Info</p>
              <div className="space-y-1 w-full">
                <div className="flex items-center justify-between">
                  <p>Local Guardian :</p>
                  <p>{coursePurchaseData.local_guardian_name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Guardian Phone :</p>
                  <p>{coursePurchaseData.local_guardian_phone_no}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Gender :</p>
                  <p>{coursePurchaseData.gender}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Blood Group :</p>
                  <p>{coursePurchaseData.blood_group}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Date of Birth :</p>
                  <p>{coursePurchaseData.date_of_birth}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:my-8 md:my-6 my-8 px-p_4px">
            <p className="md:my-2 font-semibold">Courses:</p>
            <table className="overflow-x-auto border w-full">
              <thead>
                <tr className="text-sm">
                  <th className="lg:w-20 md:w-16 w-8 py-2 border">Image</th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 border">Course ID</th>
                  <th className="lg:w-72 md:w-64 w-40 py-2 border">Student Name</th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 border">Quantity</th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 border text-center">Price</th>
                  <th className="lg:w-20 md:w-20 w-16 py-2 border text-center">Total</th>
                </tr>
              </thead>
              <tbody className="md:text-base text-sm font-semibold">
                <tr>
                  <td className="border text-center w-10 h-12 px-2">
                    <img
                      className="w-full h-full object-cover mx-auto"
                      src={coursePurchaseData.photo}
                      alt="Course"
                    />
                  </td>
                  <td className="py-2 text-center border">
                    {coursePurchaseData.course_id}
                  </td>
                  <td className="py-2 text-center border">
                    {coursePurchaseData.name}
                  </td>
                  <td className="py-2 text-center border">
                    {coursePurchaseData.course_qty}
                  </td>
                  <td className="py-2 text-center border">
                    {coursePurchaseData.course_fee}
                  </td>
                  <td className="py-2 text-center border">
                    {coursePurchaseData.total_course_fee}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
