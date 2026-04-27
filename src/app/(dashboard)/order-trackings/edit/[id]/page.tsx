// import React from "react";
// import EditOrderTrackingForm from "@/app/(dashboard)/order-trackings/edit/[id]/_components/EditOrderTrackingForm";

// const EditOrderTrackingPage = () => {
//   return (
//     <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-2xl font-bold">Edit Order Tracking</h1>
//           <p className="text-muted-foreground">
//             Update order tracking details.
//           </p>
//         </div>
//       </div>
//       <EditOrderTrackingForm />
//     </div>
//   );
// };

// export default EditOrderTrackingPage;

// --------------------- 222222222222222222222222 ----------------------------
import React from "react";
import EditOrderTrackingForm from "@/app/(dashboard)/order-trackings/edit/[id]/_components/EditOrderTrackingForm";

const EditOrderTrackingPage = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit Order Tracking</h1>
          <p className="text-muted-foreground">
            Update order tracking details.
          </p>
        </div>
      </div>
      <EditOrderTrackingForm />
    </div>
  );
};

export default EditOrderTrackingPage;