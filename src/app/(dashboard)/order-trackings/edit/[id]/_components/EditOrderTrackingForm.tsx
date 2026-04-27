// "use client";
// import { z } from "zod";
// import React from "react";
// import { toast } from "sonner";
// import { IApiError } from "@/types";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Form } from "@/components/ui/form";
// import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
// import {
//   useGetOrderTrackingQuery,
//   useUpdateOrderTrackingMutation,
// } from "@/redux/services/orderTrackingsApi";
// import { useGetAllOrdersQuery } from "@/redux/services/ordersApi";
// import { updateOrderTrackingSchema } from "@/lib/validations/orderTrackingSchema";
// import { OrderTrackingStatus } from "@/types/orderTracking";
// import { InputField } from "@/components/common/form/InputField";
// import { SelectField } from "@/components/common/form/SelectField";
// import { DatePickerField } from "@/components/common/form/DatePickerField";
// import { TextAreaField } from "@/components/common/form/TextAreaField";
// import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
// import { useParams, useRouter } from "next/navigation";
// import { Order } from "@/types/order";

// const EditOrderTrackingForm = () => {
//   const { id } = useParams();
//   const router = useRouter();
//   const [updateOrderTrackingHandler, { isLoading }] = useUpdateOrderTrackingMutation();
//   const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({
//     limit: 100,
//   });

//   const trackingId = Number(id);
//   const { data: trackingResponse, isLoading: trackingLoading } = useGetOrderTrackingQuery(trackingId);

//   const trackingData = trackingResponse;

//   const form = useForm<z.infer<typeof updateOrderTrackingSchema>>({
//     resolver: zodResolver(updateOrderTrackingSchema),
//     defaultValues: {
//       orderId: 0,
//       status: OrderTrackingStatus.PENDING,
//       location: "",
//       latitude: 0,
//       longitude: 0,
//       estimatedDelivery: undefined,
//       actualDelivery: undefined,
//       carrier: "",
//       trackingNumber: "",
//       notes: "",
//     },
//     mode: "onChange",
//   });

//   // When trackingData is loaded, populate the form
//   React.useEffect(() => {
//     if (trackingData) {
//       form.reset({
//         orderId: trackingData.orderId || 0,
//         status: trackingData.status || OrderTrackingStatus.PENDING,
//         location: trackingData.location || "",
//         latitude: trackingData.latitude || 0,
//         longitude: trackingData.longitude || 0,
//         estimatedDelivery: trackingData.estimatedDelivery
//           ? new Date(trackingData.estimatedDelivery)
//           : undefined,
//         actualDelivery: trackingData.actualDelivery
//           ? new Date(trackingData.actualDelivery)
//           : undefined,
//         carrier: trackingData.carrier || "",
//         trackingNumber: trackingData.trackingNumber || "",
//         notes: trackingData.notes || "",
//       });
//     }
//   }, [trackingData, form]);

//   if (trackingLoading) {
//     return <DataTableSkeleton columnCount={4} />;
//   }

//   if (!trackingLoading && !trackingData) {
//     return (
//       <div className="rounded-md border bg-white p-6 text-center">
//         <h2 className="text-lg font-semibold">Order tracking not found</h2>
//         <p className="mt-2 text-sm text-muted-foreground">
//           We could not find a tracking entry for that ID.
//         </p>
//       </div>
//     );
//   }

//   const orderOptions = ordersData?.data?.map((order: Order) => ({
//     label: `Order #${order?.orderId}`,
//     value: order?.orderId,
//   }));

//   async function onSubmit(data: z.infer<typeof updateOrderTrackingSchema>) {
//     const submitData = {
//       ...data,
//       estimatedDelivery: data.estimatedDelivery?.toISOString(),
//       actualDelivery: data.actualDelivery?.toISOString(),
//     };
//     try {
//       const response = await updateOrderTrackingHandler({
//         id,
//         ...submitData,
//       }).unwrap();
//       if (response.success) {
//         toast.success(response?.message || "Order tracking updated successfully.");
//         router.push("/order-trackings");
//       }
//     } catch (err: unknown) {
//       const error = err as IApiError;
//       toast.error(error?.data?.error?.message || "Something went wrong.");
//     }
//   }

//   const statusOptions = Object.values(OrderTrackingStatus).map((status) => ({
//     label: status.replace(/_/g, " "),
//     value: status,
//   }));

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="grid grid-cols-1 lg:grid-cols-2 gap-4"
//       >
//         <div className="bg-white p-4 rounded-md space-y-6">
//           <SelectField
//             control={form.control}
//             name="orderId"
//             label="Order"
//             placeholder="Select an Order"
//             inputClassName="w-full h-11"
//             isDataLoading={ordersLoading}
//             options={orderOptions}
//           />
//           <SelectField
//             control={form.control}
//             name="status"
//             label="Status"
//             placeholder="Select status"
//             inputClassName="w-full h-11"
//             options={statusOptions}
//           />
//           <InputField
//             control={form.control}
//             name="location"
//             label="Location"
//             placeholder="Current location"
//           />
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <InputField
//               control={form.control}
//               name="latitude"
//               type="number"
//               label="Latitude"
//               placeholder="23.8103"
//               step="any"
//             />
//             <InputField
//               control={form.control}
//               name="longitude"
//               type="number"
//               label="Longitude"
//               placeholder="90.4125"
//               step="any"
//             />
//           </div>
//           <DatePickerField
//             control={form.control}
//             name="estimatedDelivery"
//             label="Estimated Delivery Date"
//             disableFuture={false}
//             disablePastBefore={new Date()}
//           />
//           <DatePickerField
//             control={form.control}
//             name="actualDelivery"
//             label="Actual Delivery Date"
//             disableFuture={false}
//             disablePastBefore={new Date()}
//             required={false}
//           />
//         </div>
//         <div className="bg-white p-4 rounded-md space-y-6">
//           <InputField
//             control={form.control}
//             name="carrier"
//             label="Carrier"
//             placeholder="FedEx, DHL, etc."
//           />
//           <InputField
//             control={form.control}
//             name="trackingNumber"
//             label="Tracking Number"
//             placeholder="TR123456789"
//           />
//           <TextAreaField
//             control={form.control}
//             name="notes"
//             label="Notes"
//             placeholder="Additional notes"
//             rows={4}
//             required={false}
//           />
//           <FormSubmitBtn
//             text={"Update Order Tracking"}
//             isLoading={isLoading}
//             className="sm:w-fit w-1/2 min-w-[200px] h-12 mt-6 float-right"
//             spinnerSize={23}
//           />
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default EditOrderTrackingForm;

// ------------------------- 2222222222222222222222222222222222 -------------------------
"use client";
import { z } from "zod";
import React from "react";
import { toast } from "sonner";
import { IApiError } from "@/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import FormSubmitBtn from "@/components/common/form/FormSubmitBtn";
import {
  useGetOrderTrackingQuery,
  useUpdateOrderTrackingMutation,
} from "@/redux/services/orderTrackingsApi";
import { useGetAllOrdersQuery } from "@/redux/services/ordersApi";
import { updateOrderTrackingSchema } from "@/lib/validations/orderTrackingSchema";
import { OrderTrackingStatus } from "@/types/orderTracking";
import { SelectField } from "@/components/common/form/SelectField";
import { TextAreaField } from "@/components/common/form/TextAreaField";
import { DataTableSkeleton } from "@/components/common/DataTableSkeleton";
import { useParams, useRouter } from "next/navigation";
import { Order } from "@/types/order";

const EditOrderTrackingForm = () => {
  const params = useParams();
  const router = useRouter();
  const [updateOrderTrackingHandler, { isLoading }] =
    useUpdateOrderTrackingMutation();
  const { data: ordersData, isLoading: ordersLoading } = useGetAllOrdersQuery({
    limit: 100,
  });

  // Safely extract and validate the ID
  const id = params?.id;
  const trackingId = typeof id === "string" ? Number(id) : 0;

  const { data: trackingData, isLoading: trackingLoading } =
    useGetOrderTrackingQuery(trackingId, {
      skip: !trackingId || trackingId === 0,
    });

  const form = useForm<z.infer<typeof updateOrderTrackingSchema>>({
    resolver: zodResolver(updateOrderTrackingSchema),
    defaultValues: {
      orderId: undefined,
      status: undefined,
      description: "",
    },
    mode: "onChange",
  });

  // Populate form when tracking data is loaded
  React.useEffect(() => {
    if (trackingData) {
      console.log("Tracking data loaded:", trackingData);
      form.reset({
        orderId: trackingData.orderId,
        status: trackingData.status as OrderTrackingStatus,
        description: trackingData.description || "",
      });
    }
  }, [trackingData, form]);

  if (!trackingId || trackingId === 0) {
    return (
      <div className="rounded-md border bg-white p-6 text-center">
        <h2 className="text-lg font-semibold">Invalid tracking ID</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The tracking ID is missing or invalid.
        </p>
      </div>
    );
  }

  if (trackingLoading) {
    return <DataTableSkeleton columnCount={4} />;
  }

  if (!trackingLoading && !trackingData) {
    return (
      <div className="rounded-md border bg-white p-6 text-center">
        <h2 className="text-lg font-semibold">Order tracking not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We could not find a tracking entry for that ID.
        </p>
      </div>
    );
  }

  const orderOptions = ordersData?.data?.map((order: Order) => ({
    label: `Order #${order?.orderId}`,
    value: order?.orderId,
  }));

  async function onSubmit(data: z.infer<typeof updateOrderTrackingSchema>) {
    try {
      const response = await updateOrderTrackingHandler({
        id: trackingId,
        ...data,
      }).unwrap();
      if (response.success) {
        toast.success(
          response?.message || "Order tracking updated successfully.",
        );
        router.push("/order-trackings");
      }
    } catch (err: unknown) {
      const error = err as IApiError;
      toast.error(error?.data?.error?.message || "Something went wrong.");
    }
  }

  const statusOptions = Object.values(OrderTrackingStatus).map((status) => ({
    label: status,
    value: status,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white p-6 rounded-md space-y-6 max-w-2xl">
          <SelectField
            control={form.control}
            name="orderId"
            label="Order"
            placeholder="Select an Order"
            inputClassName="w-full h-11"
            isDataLoading={ordersLoading}
            options={orderOptions}
          />
          <SelectField
            control={form.control}
            name="status"
            label="Status"
            placeholder="Select status"
            inputClassName="w-full h-11"
            options={statusOptions}
          />
          <TextAreaField
            control={form.control}
            name="description"
            label="Description"
            placeholder="Optional tracking description"
            rows={4}
          />
          <FormSubmitBtn
            text="Update Order Tracking"
            isLoading={isLoading}
            className="w-full sm:w-fit min-w-[200px] h-12"
            spinnerSize={23}
          />
        </div>
      </form>
    </Form>
  );
};

export default EditOrderTrackingForm;
