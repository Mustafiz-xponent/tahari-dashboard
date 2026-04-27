// import React from "react";
// import AddOrderTrackingForm from "@/app/(dashboard)/order-trackings/add/_components/AddOrderTrackingForm";

// const AddOrderTrackingPage = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Add Order Tracking</h1>
//           <p className="text-muted-foreground">
//             Create a new order tracking entry.
//           </p>
//         </div>
//       </div>
//       <AddOrderTrackingForm />
//     </div>
//   );
// };

// export default AddOrderTrackingPage;

// --------------------- 22222222222222222222222 --------------------------
import React from "react";
import AddOrderTrackingForm from "@/app/(dashboard)/order-trackings/add/_components/AddOrderTrackingForm";

const AddOrderTrackingPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Add Order Tracking</h1>
          <p className="text-muted-foreground">
            Create a new order tracking entry.
          </p>
        </div>
      </div>
      <AddOrderTrackingForm />
    </div>
  );
};

export default AddOrderTrackingPage;