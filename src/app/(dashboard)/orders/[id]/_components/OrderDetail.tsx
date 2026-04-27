// // app/(dashboard)/orders/[id]/_components/OrderDetail.tsx
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Image from "next/image";
// import {
//   ArrowLeft,
//   Package,
//   User,
//   CreditCard,
//   MapPin,
//   Calendar,
//   CheckCircle2,
//   Truck,
//   ShoppingBag,
//   AlertCircle,
//   Ban,
//   Clock,
//   Tag,
//   Hash,
//   Layers,
//   Star,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Separator } from "@/components/ui/separator";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";
// import {
//   useGetOrderQuery,
//   useUpdateOrderMutation,
// } from "@/redux/services/ordersApi";

// // =============================================================================
// // Types
// // =============================================================================

// interface OrderDetailProps {
//   orderId: string;
// }

// interface OrderCustomer {
//   customerId: number | bigint;
//   user?: {
//     name?: string;
//     email?: string;
//     phone?: string;
//   };
// }

// interface OrderProduct {
//   productId: number | bigint;
//   name: string;
//   description?: string;
//   price: number | string;
//   sku?: string;
//   slug?: string;
//   brand?: string;
//   category?: string;
//   weight?: number;
//   unit?: string;
//   packageSize?: number;
//   stockQuantity?: number;
//   imageUrls?: string[];
//   accessibleImageUrls?: string[];
//   isActive?: boolean;
//   rating?: number;
//   reviewCount?: number;
//   quantity: number;
// }

// // Handles both nested { product: {...}, quantity } and flat { ...product, quantity }
// interface OrderItemRaw {
//   orderItemId?: number;
//   orderId?: number;
//   productId?: number | bigint;
//   quantity: number;
//   packageSize?: number;
//   product?: {
//     productId?: number | bigint;
//     name: string;
//     description?: string;
//     price: number | string;
//     sku?: string;
//     slug?: string;
//     brand?: string;
//     category?: string;
//     weight?: number;
//     unit?: string;
//     packageSize?: number;
//     stockQuantity?: number;
//     imageUrls?: string[];
//     isActive?: boolean;
//     rating?: number;
//     reviewCount?: number;
//   };
//   // Flat structure fields (after backend processing)
//   name?: string;
//   price?: number | string;
//   sku?: string;
//   slug?: string;
//   brand?: string;
//   description?: string;
//   category?: string;
//   weight?: number;
//   unit?: string;
//   stockQuantity?: number;
//   accessibleImageUrls?: string[];
//   imageUrls?: string[];
//   isActive?: boolean;
//   rating?: number;
//   reviewCount?: number;
// }

// // =============================================================================
// // Constants
// // =============================================================================

// const ORDER_STATUS_FLOW = [
//   "PENDING",
//   "CONFIRMED",
//   "PROCESSING",
//   "SHIPPED",
//   "DELIVERED",
// ];

// const STATUS_CONFIG: Record<
//   string,
//   {
//     label: string;
//     color: string;
//     icon: React.ComponentType<{ className?: string }>;
//     description: string;
//   }
// > = {
//   PENDING: {
//     label: "Pending",
//     color: "bg-yellow-100 text-yellow-800 border-yellow-200",
//     icon: Clock,
//     description: "Order has been placed and is awaiting confirmation",
//   },
//   CONFIRMED: {
//     label: "Confirmed",
//     color: "bg-blue-100 text-blue-800 border-blue-200",
//     icon: CheckCircle2,
//     description: "Order has been confirmed and is being prepared",
//   },
//   PROCESSING: {
//     label: "Processing",
//     color: "bg-purple-100 text-purple-800 border-purple-200",
//     icon: Package,
//     description: "Order is being processed and packed",
//   },
//   SHIPPED: {
//     label: "Shipped",
//     color: "bg-orange-100 text-orange-800 border-orange-200",
//     icon: Truck,
//     description: "Order has been shipped and is on the way",
//   },
//   DELIVERED: {
//     label: "Delivered",
//     color: "bg-green-100 text-green-800 border-green-200",
//     icon: CheckCircle2,
//     description: "Order has been delivered successfully",
//   },
//   CANCELLED: {
//     label: "Cancelled",
//     color: "bg-red-100 text-red-800 border-red-200",
//     icon: Ban,
//     description: "Order has been cancelled",
//   },
// };

// const PAYMENT_STATUS_CONFIG: Record<string, { label: string; color: string }> =
//   {
//     PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
//     COMPLETED: { label: "Completed", color: "bg-green-100 text-green-800" },
//     FAILED: { label: "Failed", color: "bg-red-100 text-red-800" },
//     REFUNDED: { label: "Refunded", color: "bg-orange-100 text-orange-800" },
//   };

// // =============================================================================
// // Helpers
// // =============================================================================

// function formatTaka(amount: number | string): string {
//   return `৳${Number(amount).toLocaleString("en-BD", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;
// }

// function getAvailableStatuses(currentStatus: string): string[] {
//   if (currentStatus === "DELIVERED" || currentStatus === "CANCELLED") {
//     return [currentStatus];
//   }

//   const currentIndex = ORDER_STATUS_FLOW.indexOf(currentStatus);
//   if (currentIndex === -1) return ORDER_STATUS_FLOW;

//   const available = ORDER_STATUS_FLOW.filter((_, index) => {
//     return index >= currentIndex;
//   });

//   available.push("CANCELLED");
//   return available;
// }

// /**
//  * Normalize order item from API response
//  * Handles both nested { product: {...}, quantity } and flat { ...product, quantity }
//  */
// function normalizeOrderItem(item: OrderItemRaw): OrderProduct {
//   // If product data is nested inside a "product" field
//   if (item.product) {
//     return {
//       productId: item.product.productId || item.productId || 0,
//       name: item.product.name,
//       description: item.product.description,
//       price: item.product.price,
//       sku: item.product.sku,
//       slug: item.product.slug,
//       brand: item.product.brand,
//       category: item.product.category,
//       weight: item.product.weight,
//       unit: item.product.unit,
//       packageSize: item.product.packageSize || item.packageSize,
//       stockQuantity: item.product.stockQuantity,
//       imageUrls: item.product.imageUrls,
//       accessibleImageUrls: item.accessibleImageUrls,
//       isActive: item.product.isActive,
//       rating: item.product.rating,
//       reviewCount: item.product.reviewCount,
//       quantity: item.quantity,
//     };
//   }

//   // If product data is flat (already spread)
//   return {
//     productId: item.productId || 0,
//     name: item.name || "Unknown Product",
//     description: item.description,
//     price: item.price || 0,
//     sku: item.sku,
//     slug: item.slug,
//     brand: item.brand,
//     category: item.category,
//     weight: item.weight,
//     unit: item.unit,
//     packageSize: item.packageSize,
//     stockQuantity: item.stockQuantity,
//     imageUrls: item.imageUrls,
//     accessibleImageUrls: item.accessibleImageUrls,
//     isActive: item.isActive,
//     rating: item.rating,
//     reviewCount: item.reviewCount,
//     quantity: item.quantity,
//   };
// }

// // =============================================================================
// // Skeleton Loader
// // =============================================================================

// function OrderDetailSkeleton() {
//   return (
//     <div className="space-y-6">
//       <div className="flex items-center gap-4">
//         <Skeleton className="h-10 w-10 rounded-md" />
//         <div className="flex-1 space-y-2">
//           <Skeleton className="h-6 w-48" />
//           <Skeleton className="h-4 w-32" />
//         </div>
//       </div>
//       <Skeleton className="h-48 w-full rounded-lg" />
//       <div className="grid gap-6 md:grid-cols-2">
//         {[...Array(4)].map((_, i) => (
//           <Skeleton key={i} className="h-40 w-full rounded-lg" />
//         ))}
//       </div>
//       <Skeleton className="h-64 w-full rounded-lg" />
//     </div>
//   );
// }

// // =============================================================================
// // Product Image Component
// // =============================================================================

// function ProductImage({
//   item,
//   size = "default",
// }: {
//   item: OrderProduct;
//   size?: "default" | "large";
// }) {
//   const imageUrl = item.accessibleImageUrls?.[0] || item.imageUrls?.[0] || null;
//   const dimensions = size === "large" ? "h-24 w-24" : "h-16 w-16";
//   const imgSize = size === "large" ? 96 : 64;

//   if (imageUrl) {
//     return (
//       <div
//         className={`${dimensions} overflow-hidden rounded-lg border bg-muted shrink-0`}
//       >
//         <Image
//           src={imageUrl}
//           alt={item.name}
//           width={imgSize}
//           height={imgSize}
//           className="h-full w-full object-cover"
//         />
//       </div>
//     );
//   }

//   return (
//     <div
//       className={`${dimensions} flex items-center justify-center rounded-lg border bg-muted shrink-0`}
//     >
//       <Package className="h-6 w-6 text-muted-foreground" />
//     </div>
//   );
// }

// // =============================================================================
// // Main Component
// // =============================================================================

// export default function OrderDetail({ orderId }: OrderDetailProps) {
//   const router = useRouter();
//   const [selectedStatus, setSelectedStatus] = useState<string>("");
//   const [isUpdating, setIsUpdating] = useState(false);

//   const { data, isLoading, error } = useGetOrderQuery(orderId);
//   const [updateOrder] = useUpdateOrderMutation();

//   const order = data?.data;

//   // Debug: Log order data to see actual structure
//   React.useEffect(() => {
//     if (order) {
//       console.log("Full order data:", order);
//       console.log("Order items:", order.orderItems);
//       console.log("First item structure:", order.orderItems?.[0]);
//     }
//   }, [order]);

//   // Set initial status when order loads
//   React.useEffect(() => {
//     if (order?.status) {
//       setSelectedStatus(order.status);
//     }
//   }, [order?.status]);

//   // Handle status update
//   const handleStatusUpdate = async () => {
//     if (!order || selectedStatus === order.status) {
//       toast.info("No status change detected");
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       await updateOrder({
//         orderId: order.orderId,
//         bodyData: { status: selectedStatus },
//       }).unwrap();

//       toast.success(`Order status updated to ${selectedStatus}`);
//     } catch (err: unknown) {
//       const apiError = err as { data?: { message?: string } };
//       toast.error(apiError?.data?.message || "Failed to update order status");
//       setSelectedStatus(order.status);
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   // Loading state
//   if (isLoading) {
//     return <OrderDetailSkeleton />;
//   }

//   // Error state
//   if (error || !order) {
//     return (
//       <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
//         <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
//         <div>
//           <p className="font-semibold">Error</p>
//           <p className="text-sm">
//             Failed to load order details. Please try again.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // Derived values
//   const currentStatusConfig =
//     STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
//   const StatusIcon = currentStatusConfig.icon;
//   const availableStatuses = getAvailableStatuses(order.status);
//   const isDelivered = order.status === "DELIVERED";
//   const isCancelled = order.status === "CANCELLED";
//   const canUpdateStatus = !isDelivered && !isCancelled;
//   const customer = order.customer as OrderCustomer | null;

//   // Normalize order items - handles both nested and flat structures
//   const rawItems = (order.orderItems || []) as OrderItemRaw[];
//   const orderItems: OrderProduct[] = rawItems.map(normalizeOrderItem);

//   // Calculate subtotal
//   const subtotal = orderItems.reduce(
//     (sum, item) => sum + Number(item.price) * item.quantity,
//     0,
//   );

//   return (
//     <div className="space-y-6">
//       {/* ================================================================= */}
//       {/* Header                                                            */}
//       {/* ================================================================= */}
//       <div className="flex items-center gap-4">
//         <Button variant="outline" size="icon" onClick={() => router.back()}>
//           <ArrowLeft className="h-4 w-4" />
//         </Button>
//         <div className="flex-1">
//           <h1 className="text-2xl font-bold">Order #{order.orderId}</h1>
//           <p className="text-muted-foreground">
//             Placed on{" "}
//             {new Date(order.createdAt).toLocaleDateString("en-BD", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//         <Badge
//           className={`border px-3 py-1 text-sm font-medium ${currentStatusConfig.color}`}
//         >
//           <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
//           {currentStatusConfig.label}
//         </Badge>
//       </div>

//       {/* ================================================================= */}
//       {/* Status Update Card                                                */}
//       {/* ================================================================= */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg">Update Order Status</CardTitle>
//           <CardDescription>
//             {canUpdateStatus
//               ? "Change the current status of this order"
//               : `This order has been ${order.status.toLowerCase()} and cannot be updated`}
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {/* Status Timeline */}
//           <div className="mb-6">
//             <div className="flex items-center justify-between">
//               {ORDER_STATUS_FLOW.map((status, index) => {
//                 const config = STATUS_CONFIG[status];
//                 const Icon = config.icon;
//                 const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status);
//                 const isCompleted = index <= currentIndex;
//                 const isCurrent = status === order.status;

//                 return (
//                   <React.Fragment key={status}>
//                     <div className="flex flex-col items-center gap-1">
//                       <div
//                         className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
//                           isCompleted
//                             ? "border-primary bg-primary text-primary-foreground"
//                             : "border-muted bg-background text-muted-foreground"
//                         }`}
//                       >
//                         <Icon className="h-5 w-5" />
//                       </div>
//                       <span
//                         className={`text-xs font-medium ${
//                           isCurrent ? "text-primary" : "text-muted-foreground"
//                         }`}
//                       >
//                         {config.label}
//                       </span>
//                     </div>
//                     {index < ORDER_STATUS_FLOW.length - 1 && (
//                       <div
//                         className={`mx-2 h-0.5 flex-1 ${
//                           index < ORDER_STATUS_FLOW.indexOf(order.status)
//                             ? "bg-primary"
//                             : "bg-muted"
//                         }`}
//                       />
//                     )}
//                   </React.Fragment>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Status Selector */}
//           {canUpdateStatus && (
//             <div className="flex items-center gap-4">
//               <div className="flex-1">
//                 <Select
//                   value={selectedStatus}
//                   onValueChange={setSelectedStatus}
//                   disabled={!canUpdateStatus}
//                 >
//                   <SelectTrigger>
//                     <SelectValue placeholder="Select new status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {availableStatuses.map((status) => {
//                       const config = STATUS_CONFIG[status];
//                       const Icon = config?.icon || Package;
//                       return (
//                         <SelectItem key={status} value={status}>
//                           <div className="flex items-center gap-2">
//                             <Icon className="h-4 w-4" />
//                             {config?.label || status}
//                           </div>
//                         </SelectItem>
//                       );
//                     })}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <Button
//                 onClick={handleStatusUpdate}
//                 disabled={
//                   isUpdating ||
//                   selectedStatus === order.status ||
//                   !canUpdateStatus
//                 }
//                 className="min-w-[140px]"
//               >
//                 {isUpdating ? "Updating..." : "Update Status"}
//               </Button>
//             </div>
//           )}

//           {/* Delivered Notice */}
//           {isDelivered && (
//             <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
//               <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
//               <div>
//                 <p className="font-semibold">Order Completed</p>
//                 <p className="text-sm">
//                   This order has been delivered and cannot be updated further.
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Cancelled Notice */}
//           {isCancelled && (
//             <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
//               <Ban className="mt-0.5 h-5 w-5 shrink-0" />
//               <div>
//                 <p className="font-semibold">Order Cancelled</p>
//                 <p className="text-sm">
//                   This order has been cancelled and cannot be updated further.
//                 </p>
//               </div>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* ================================================================= */}
//       {/* Info Cards Grid                                                   */}
//       {/* ================================================================= */}
//       <div className="grid gap-6 md:grid-cols-2">
//         {/* Customer Info */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <User className="h-4 w-4" />
//               Customer Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div>
//               <p className="text-sm text-muted-foreground">Name</p>
//               <p className="font-medium">{customer?.user?.name ?? "N/A"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Email</p>
//               <p className="font-medium">{customer?.user?.email ?? "N/A"}</p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Customer ID</p>
//               <p className="font-medium">
//                 {customer?.customerId?.toString() ?? "N/A"}
//               </p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Payment Info */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <CreditCard className="h-4 w-4" />
//               Payment Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div>
//               <p className="text-sm text-muted-foreground">Total Amount</p>
//               <p className="text-xl font-bold">
//                 {formatTaka(order.totalAmount)}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Payment Method</p>
//               <p className="font-medium capitalize">
//                 {order.paymentMethod ?? "N/A"}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Payment Status</p>
//               <Badge
//                 className={`border-0 ${
//                   PAYMENT_STATUS_CONFIG[order.paymentStatus]?.color ||
//                   "bg-gray-100 text-gray-800"
//                 }`}
//               >
//                 {PAYMENT_STATUS_CONFIG[order.paymentStatus]?.label ||
//                   order.paymentStatus}
//               </Badge>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Shipping Info */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <MapPin className="h-4 w-4" />
//               Shipping Information
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div>
//               <p className="text-sm text-muted-foreground">Shipping Address</p>
//               <p className="font-medium">{order.shippingAddress ?? "N/A"}</p>
//             </div>
//             {order.preorderDeliveryDate && (
//               <div>
//                 <p className="text-sm text-muted-foreground">Delivery Date</p>
//                 <p className="font-medium">
//                   {new Date(order.preorderDeliveryDate).toLocaleDateString(
//                     "en-BD",
//                     {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     },
//                   )}
//                 </p>
//               </div>
//             )}
//           </CardContent>
//         </Card>

//         {/* Order Timeline */}
//         <Card>
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2 text-base">
//               <Calendar className="h-4 w-4" />
//               Order Timeline
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="space-y-3">
//             <div>
//               <p className="text-sm text-muted-foreground">Order Placed</p>
//               <p className="font-medium">
//                 {new Date(order.createdAt).toLocaleDateString("en-BD", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//             <div>
//               <p className="text-sm text-muted-foreground">Last Updated</p>
//               <p className="font-medium">
//                 {new Date(order.updatedAt).toLocaleDateString("en-BD", {
//                   year: "numeric",
//                   month: "long",
//                   day: "numeric",
//                   hour: "2-digit",
//                   minute: "2-digit",
//                 })}
//               </p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* ================================================================= */}
//       {/* Order Items                                                       */}
//       {/* ================================================================= */}
//       <Card>
//         <CardHeader>
//           <div className="flex items-center justify-between">
//             <CardTitle className="flex items-center gap-2">
//               <ShoppingBag className="h-5 w-5" />
//               Order Items
//             </CardTitle>
//             <Badge variant="secondary" className="text-sm">
//               {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}
//             </Badge>
//           </div>
//           <CardDescription>Products included in this order</CardDescription>
//         </CardHeader>
//         <CardContent>
//           {orderItems.length > 0 ? (
//             <div className="space-y-6">
//               {orderItems.map((item: OrderProduct, index: number) => {
//                 const itemTotal = Number(item.price) * item.quantity;

//                 return (
//                   <div key={item.productId?.toString() || index}>
//                     <div className="flex gap-4">
//                       {/* Product Image */}
//                       <ProductImage item={item} size="large" />

//                       {/* Product Details */}
//                       <div className="flex-1 min-w-0 space-y-2">
//                         {/* Title & Price Row */}
//                         <div className="flex items-start justify-between gap-4">
//                           <div className="min-w-0">
//                             <h3 className="text-base font-semibold truncate">
//                               {item.name}
//                             </h3>
//                             {item.description && (
//                               <p className="mt-0.5 text-sm text-muted-foreground line-clamp-2">
//                                 {item.description}
//                               </p>
//                             )}
//                           </div>
//                           <div className="shrink-0 text-right">
//                             <p className="text-lg font-bold">
//                               {formatTaka(itemTotal)}
//                             </p>
//                             <p className="text-xs text-muted-foreground">
//                               {formatTaka(item.price)} × {item.quantity}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Product Meta Info */}
//                         <div className="flex flex-wrap gap-x-4 gap-y-2">
//                           {item.sku && (
//                             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//                               <Hash className="h-3.5 w-3.5" />
//                               <span>SKU: {item.sku}</span>
//                             </div>
//                           )}

//                           {item.brand && (
//                             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//                               <Tag className="h-3.5 w-3.5" />
//                               <span>Brand: {item.brand}</span>
//                             </div>
//                           )}

//                           {item.category && (
//                             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//                               <Layers className="h-3.5 w-3.5" />
//                               <span>{item.category}</span>
//                             </div>
//                           )}

//                           {item.weight != null && item.weight > 0 && (
//                             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//                               <Package className="h-3.5 w-3.5" />
//                               <span>
//                                 {item.weight}
//                                 {item.unit || "g"}
//                               </span>
//                             </div>
//                           )}

//                           {item.packageSize != null && item.packageSize > 1 && (
//                             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//                               <Layers className="h-3.5 w-3.5" />
//                               <span>Pack of {item.packageSize}</span>
//                             </div>
//                           )}
//                         </div>

//                         {/* Badges Row */}
//                         <div className="flex flex-wrap items-center gap-2 pt-1">
//                           <Badge variant="secondary" className="text-xs">
//                             Qty: {item.quantity}
//                           </Badge>

//                           <Badge variant="outline" className="text-xs">
//                             {formatTaka(item.price)} each
//                           </Badge>

//                           {item.rating != null && item.rating > 0 && (
//                             <Badge variant="outline" className="gap-1 text-xs">
//                               <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
//                               {item.rating}
//                               {item.reviewCount != null && (
//                                 <span className="text-muted-foreground">
//                                   ({item.reviewCount})
//                                 </span>
//                               )}
//                             </Badge>
//                           )}

//                           {item.productId != null && (
//                             <span className="text-xs text-muted-foreground">
//                               ID: {item.productId.toString()}
//                             </span>
//                           )}
//                         </div>

//                         {/* Multiple Images Preview */}
//                         {(item.accessibleImageUrls?.length ?? 0) > 1 && (
//                           <div className="flex gap-2 pt-2">
//                             {item.accessibleImageUrls
//                               ?.slice(1, 4)
//                               .map((url, imgIndex) => (
//                                 <div
//                                   key={imgIndex}
//                                   className="h-12 w-12 overflow-hidden rounded-md border bg-muted"
//                                 >
//                                   <Image
//                                     src={url}
//                                     alt={`${item.name} ${imgIndex + 2}`}
//                                     width={48}
//                                     height={48}
//                                     className="h-full w-full object-cover"
//                                   />
//                                 </div>
//                               ))}
//                             {(item.accessibleImageUrls?.length ?? 0) > 4 && (
//                               <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
//                                 +{(item.accessibleImageUrls?.length ?? 0) - 4}
//                               </div>
//                             )}
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     {index < orderItems.length - 1 && (
//                       <Separator className="mt-6" />
//                     )}
//                   </div>
//                 );
//               })}

//               {/* Order Summary */}
//               <Separator />
//               <div className="space-y-2">
//                 <div className="flex justify-between text-sm">
//                   <span className="text-muted-foreground">
//                     Subtotal ({orderItems.length} item
//                     {orderItems.length !== 1 ? "s" : ""})
//                   </span>
//                   <span>{formatTaka(subtotal)}</span>
//                 </div>

//                 {subtotal !== Number(order.totalAmount) && (
//                   <div className="flex justify-between text-sm">
//                     <span className="text-muted-foreground">
//                       Shipping & Others
//                     </span>
//                     <span>
//                       {formatTaka(Number(order.totalAmount) - subtotal)}
//                     </span>
//                   </div>
//                 )}

//                 <Separator />
//                 <div className="flex justify-between text-lg font-bold">
//                   <span>Total</span>
//                   <span>{formatTaka(order.totalAmount)}</span>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="flex flex-col items-center justify-center py-12 text-center">
//               <Package className="mb-4 h-12 w-12 text-muted-foreground/30" />
//               <p className="font-medium">No items found</p>
//               <p className="text-sm text-muted-foreground">
//                 This order doesn&apos;t have any items yet
//               </p>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// -------------------------------------- 2222222222222222222222222222222 -------------------------------------
// app/(dashboard)/orders/[id]/_components/OrderDetail.tsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  User,
  CreditCard,
  MapPin,
  Calendar,
  CheckCircle2,
  Truck,
  ShoppingBag,
  AlertCircle,
  Ban,
  Clock,
  Tag,
  Hash,
  Layers,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import {
  useGetOrderQuery,
  useUpdateOrderMutation,
} from "@/redux/services/ordersApi";

// =============================================================================
// Types
// =============================================================================

interface OrderDetailProps {
  orderId: string;
}

interface OrderCustomer {
  customerId: number | bigint;
  user?: {
    name?: string;
    email?: string;
    phone?: string;
  };
}

interface OrderProduct {
  productId: number | bigint;
  name: string;
  description?: string;
  price: number;
  unitPrice: number;
  subtotal: number;
  sku?: string;
  slug?: string;
  brand?: string;
  category?: string;
  weight?: number;
  unit?: string;
  unitType?: string;
  packageSize?: number;
  stockQuantity?: number;
  imageUrls?: string[];
  accessibleImageUrls?: string[];
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
  quantity: number;
}

interface OrderItemRaw {
  orderItemId?: number;
  orderId?: number;
  productId?: number | bigint;
  quantity: number;
  packageSize?: number;
  unitType?: string;
  unitPrice?: number | string;
  subtotal?: number | string;
  price?: number | string;
  product?: {
    productId?: number | bigint;
    name: string;
    description?: string;
    price: number | string;
    unitPrice?: number | string;
    sku?: string;
    slug?: string;
    brand?: string;
    category?: string;
    weight?: number;
    unit?: string;
    packageSize?: number;
    stockQuantity?: number;
    imageUrls?: string[];
    isActive?: boolean;
    rating?: number;
    reviewCount?: number;
  };
  name?: string;
  sku?: string;
  slug?: string;
  brand?: string;
  description?: string;
  category?: string;
  weight?: number;
  unit?: string;
  stockQuantity?: number;
  accessibleImageUrls?: string[];
  imageUrls?: string[];
  isActive?: boolean;
  rating?: number;
  reviewCount?: number;
}

// =============================================================================
// Constants
// =============================================================================

const ORDER_STATUS_FLOW = [
  "PENDING",
  "CONFIRMED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
];

const STATUS_CONFIG: Record<
  string,
  {
    label: string;
    color: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
  }
> = {
  PENDING: {
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: Clock,
    description: "Order has been placed and is awaiting confirmation",
  },
  CONFIRMED: {
    label: "Confirmed",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle2,
    description: "Order has been confirmed and is being prepared",
  },
  PROCESSING: {
    label: "Processing",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: Package,
    description: "Order is being processed and packed",
  },
  SHIPPED: {
    label: "Shipped",
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: Truck,
    description: "Order has been shipped and is on the way",
  },
  DELIVERED: {
    label: "Delivered",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle2,
    description: "Order has been delivered successfully",
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: Ban,
    description: "Order has been cancelled",
  },
};

const PAYMENT_STATUS_CONFIG: Record<string, { label: string; color: string }> =
  {
    PENDING: { label: "Pending", color: "bg-yellow-100 text-yellow-800" },
    COMPLETED: { label: "Completed", color: "bg-green-100 text-green-800" },
    FAILED: { label: "Failed", color: "bg-red-100 text-red-800" },
    REFUNDED: { label: "Refunded", color: "bg-orange-100 text-orange-800" },
  };

// =============================================================================
// Helpers
// =============================================================================

/**
 * Safely convert any value to number
 * Handles Decimal strings, numbers, null, undefined
 */
function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const num = Number(value);
  return isNaN(num) ? 0 : num;
}

function formatTaka(amount: number | string | null | undefined): string {
  const num = toNumber(amount);
  return `৳${num.toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getAvailableStatuses(currentStatus: string): string[] {
  if (currentStatus === "DELIVERED" || currentStatus === "CANCELLED") {
    return [currentStatus];
  }

  const currentIndex = ORDER_STATUS_FLOW.indexOf(currentStatus);
  if (currentIndex === -1) return ORDER_STATUS_FLOW;

  const available = ORDER_STATUS_FLOW.filter((_, index) => {
    return index >= currentIndex;
  });

  available.push("CANCELLED");
  return available;
}

/**
 * Normalize order item from API response
 * Handles both nested and flat structures
 * Converts Decimal strings to numbers
 */
function normalizeOrderItem(item: OrderItemRaw): OrderProduct {
  if (item.product) {
    // Nested structure: { product: {...}, quantity, unitPrice, subtotal }
    const unitPrice = toNumber(
      item.unitPrice || item.product.unitPrice || item.product.price,
    );
    const quantity = toNumber(item.quantity);
    const subtotal = toNumber(item.subtotal) || unitPrice * quantity;

    return {
      productId: item.product.productId || item.productId || 0,
      name: item.product.name,
      description: item.product.description,
      price: unitPrice,
      unitPrice: unitPrice,
      subtotal: subtotal,
      sku: item.product.sku,
      slug: item.product.slug,
      brand: item.product.brand,
      category: item.product.category,
      weight: item.product.weight,
      unit: item.product.unit,
      unitType: item.unitType,
      packageSize:
        toNumber(item.product.packageSize || item.packageSize) || undefined,
      stockQuantity: item.product.stockQuantity,
      imageUrls: item.product.imageUrls,
      accessibleImageUrls: item.accessibleImageUrls,
      isActive: item.product.isActive,
      rating: item.product.rating,
      reviewCount: item.product.reviewCount,
      quantity: quantity,
    };
  }

  // Flat structure: { ...product, quantity, unitPrice, subtotal }
  const unitPrice = toNumber(item.unitPrice || item.price);
  const quantity = toNumber(item.quantity);
  const subtotal = toNumber(item.subtotal) || unitPrice * quantity;

  return {
    productId: item.productId || 0,
    name: item.name || "Unknown Product",
    description: item.description,
    price: unitPrice,
    unitPrice: unitPrice,
    subtotal: subtotal,
    sku: item.sku,
    slug: item.slug,
    brand: item.brand,
    category: item.category,
    weight: item.weight,
    unit: item.unit,
    unitType: item.unitType,
    packageSize: toNumber(item.packageSize) || undefined,
    stockQuantity: item.stockQuantity,
    imageUrls: item.imageUrls,
    accessibleImageUrls: item.accessibleImageUrls,
    isActive: item.isActive,
    rating: item.rating,
    reviewCount: item.reviewCount,
    quantity: quantity,
  };
}

// =============================================================================
// Skeleton Loader
// =============================================================================

function OrderDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-md" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <Skeleton className="h-48 w-full rounded-lg" />
      <div className="grid gap-6 md:grid-cols-2">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-40 w-full rounded-lg" />
        ))}
      </div>
      <Skeleton className="h-64 w-full rounded-lg" />
    </div>
  );
}

// =============================================================================
// Product Image Component
// =============================================================================

function ProductImage({
  item,
  size = "default",
}: {
  item: OrderProduct;
  size?: "default" | "large";
}) {
  const imageUrl = item.accessibleImageUrls?.[0] || item.imageUrls?.[0] || null;
  const dimensions = size === "large" ? "h-24 w-24" : "h-16 w-16";
  const imgSize = size === "large" ? 96 : 64;

  if (imageUrl) {
    return (
      <div
        className={`${dimensions} overflow-hidden rounded-lg border bg-muted shrink-0`}
      >
        <Image
          src={imageUrl}
          alt={item.name}
          width={imgSize}
          height={imgSize}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={`${dimensions} flex items-center justify-center rounded-lg border bg-muted shrink-0`}
    >
      <Package className="h-6 w-6 text-muted-foreground" />
    </div>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export default function OrderDetail({ orderId }: OrderDetailProps) {
  const router = useRouter();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { data, isLoading, error } = useGetOrderQuery(orderId);
  const [updateOrder] = useUpdateOrderMutation();

  const order = data?.data;

  // Debug: Log order data
  React.useEffect(() => {
    if (order) {
      console.log("Full order data:", order);
      console.log("Order items:", order.orderItems);
      if (order.orderItems?.[0]) {
        console.log("First item raw:", order.orderItems[0]);
        console.log("First item unitPrice:", order.orderItems[0].unitPrice);
        console.log("First item subtotal:", order.orderItems[0].subtotal);
        console.log("First item price:", order.orderItems[0].price);
      }
    }
  }, [order]);

  // Set initial status when order loads
  React.useEffect(() => {
    if (order?.status) {
      setSelectedStatus(order.status);
    }
  }, [order?.status]);

  // Handle status update
  const handleStatusUpdate = async () => {
    if (!order || selectedStatus === order.status) {
      toast.info("No status change detected");
      return;
    }

    setIsUpdating(true);
    try {
      await updateOrder({
        orderId: order.orderId,
        bodyData: { status: selectedStatus },
      }).unwrap();

      toast.success(`Order status updated to ${selectedStatus}`);
    } catch (err: unknown) {
      const apiError = err as { data?: { message?: string } };
      toast.error(apiError?.data?.message || "Failed to update order status");
      setSelectedStatus(order.status);
    } finally {
      setIsUpdating(false);
    }
  };

  // Loading state
  if (isLoading) {
    return <OrderDetailSkeleton />;
  }

  // Error state
  if (error || !order) {
    return (
      <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">Error</p>
          <p className="text-sm">
            Failed to load order details. Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Derived values
  const currentStatusConfig =
    STATUS_CONFIG[order.status] || STATUS_CONFIG.PENDING;
  const StatusIcon = currentStatusConfig.icon;
  const availableStatuses = getAvailableStatuses(order.status);
  const isDelivered = order.status === "DELIVERED";
  const isCancelled = order.status === "CANCELLED";
  const canUpdateStatus = !isDelivered && !isCancelled;
  const customer = order.customer as OrderCustomer | null;

  // Normalize order items - handles both nested and flat, converts Decimals
  const rawItems = (order.orderItems || []) as OrderItemRaw[];
  const orderItems: OrderProduct[] = rawItems.map(normalizeOrderItem);

  // Calculate subtotal from items
  const itemsSubtotal = orderItems.reduce(
    (sum, item) => sum + item.subtotal,
    0,
  );

  // Order total from API
  const orderTotal = toNumber(order.totalAmount);

  // Shipping/other charges
  const shippingCharges = orderTotal - itemsSubtotal;

  return (
    <div className="space-y-6">
      {/* ================================================================= */}
      {/* Header                                                            */}
      {/* ================================================================= */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">Order #{order.orderId}</h1>
          <p className="text-muted-foreground">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-BD", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <Badge
          className={`border px-3 py-1 text-sm font-medium ${currentStatusConfig.color}`}
        >
          <StatusIcon className="mr-1.5 h-3.5 w-3.5" />
          {currentStatusConfig.label}
        </Badge>
      </div>

      {/* ================================================================= */}
      {/* Status Update Card                                                */}
      {/* ================================================================= */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Update Order Status</CardTitle>
          <CardDescription>
            {canUpdateStatus
              ? "Change the current status of this order"
              : `This order has been ${order.status.toLowerCase()} and cannot be updated`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Status Timeline */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {ORDER_STATUS_FLOW.map((status, index) => {
                const config = STATUS_CONFIG[status];
                const Icon = config.icon;
                const currentIndex = ORDER_STATUS_FLOW.indexOf(order.status);
                const isCompleted = index <= currentIndex;
                const isCurrent = status === order.status;

                return (
                  <React.Fragment key={status}>
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                          isCompleted
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-muted bg-background text-muted-foreground"
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          isCurrent ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {config.label}
                      </span>
                    </div>
                    {index < ORDER_STATUS_FLOW.length - 1 && (
                      <div
                        className={`mx-2 h-0.5 flex-1 ${
                          index < ORDER_STATUS_FLOW.indexOf(order.status)
                            ? "bg-primary"
                            : "bg-muted"
                        }`}
                      />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Status Selector */}
          {canUpdateStatus && (
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                  disabled={!canUpdateStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select new status" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableStatuses.map((status) => {
                      const config = STATUS_CONFIG[status];
                      const Icon = config?.icon || Package;
                      return (
                        <SelectItem key={status} value={status}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {config?.label || status}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleStatusUpdate}
                disabled={
                  isUpdating ||
                  selectedStatus === order.status ||
                  !canUpdateStatus
                }
                className="min-w-[140px]"
              >
                {isUpdating ? "Updating..." : "Update Status"}
              </Button>
            </div>
          )}

          {/* Delivered Notice */}
          {isDelivered && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Order Completed</p>
                <p className="text-sm">
                  This order has been delivered and cannot be updated further.
                </p>
              </div>
            </div>
          )}

          {/* Cancelled Notice */}
          {isCancelled && (
            <div className="mt-4 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800">
              <Ban className="mt-0.5 h-5 w-5 shrink-0" />
              <div>
                <p className="font-semibold">Order Cancelled</p>
                <p className="text-sm">
                  This order has been cancelled and cannot be updated further.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* ================================================================= */}
      {/* Info Cards Grid                                                   */}
      {/* ================================================================= */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <User className="h-4 w-4" />
              Customer Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{customer?.user?.name ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{customer?.user?.email ?? "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Customer ID</p>
              <p className="font-medium">
                {customer?.customerId?.toString() ?? "N/A"}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CreditCard className="h-4 w-4" />
              Payment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Total Amount</p>
              <p className="text-xl font-bold">
                {formatTaka(order.totalAmount)}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Method</p>
              <p className="font-medium capitalize">
                {order.paymentMethod ?? "N/A"}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Payment Status</p>
              <Badge
                className={`border-0 ${
                  PAYMENT_STATUS_CONFIG[order.paymentStatus]?.color ||
                  "bg-gray-100 text-gray-800"
                }`}
              >
                {PAYMENT_STATUS_CONFIG[order.paymentStatus]?.label ||
                  order.paymentStatus}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              Shipping Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Shipping Address</p>
              <p className="font-medium">{order.shippingAddress ?? "N/A"}</p>
            </div>
            {order.preorderDeliveryDate && (
              <div>
                <p className="text-sm text-muted-foreground">Delivery Date</p>
                <p className="font-medium">
                  {new Date(order.preorderDeliveryDate).toLocaleDateString(
                    "en-BD",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    },
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Order Timeline */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4" />
              Order Timeline
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">Order Placed</p>
              <p className="font-medium">
                {new Date(order.createdAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Last Updated</p>
              <p className="font-medium">
                {new Date(order.updatedAt).toLocaleDateString("en-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ================================================================= */}
      {/* Order Items                                                       */}
      {/* ================================================================= */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              Order Items
            </CardTitle>
            <Badge variant="secondary" className="text-sm">
              {orderItems.length} item{orderItems.length !== 1 ? "s" : ""}
            </Badge>
          </div>
          <CardDescription>Products included in this order</CardDescription>
        </CardHeader>
        <CardContent>
          {orderItems.length > 0 ? (
            <div className="space-y-6">
              {orderItems.map((item, index) => (
                <div key={item.productId?.toString() || index}>
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <ProductImage item={item} size="large" />

                    {/* Product Details */}
                    <div className="min-w-0 flex-1 space-y-2">
                      {/* Title & Price Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h3 className="truncate text-base font-semibold">
                            {item.name}
                          </h3>
                          {item.description && (
                            <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg font-bold">
                            {formatTaka(item.subtotal)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTaka(item.unitPrice)} × {item.quantity}
                          </p>
                        </div>
                      </div>

                      {/* Product Meta Info */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2">
                        {item.sku && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Hash className="h-3.5 w-3.5" />
                            <span>SKU: {item.sku}</span>
                          </div>
                        )}

                        {item.brand && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Tag className="h-3.5 w-3.5" />
                            <span>Brand: {item.brand}</span>
                          </div>
                        )}

                        {item.category && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Layers className="h-3.5 w-3.5" />
                            <span>{item.category}</span>
                          </div>
                        )}

                        {item.weight != null && item.weight > 0 && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Package className="h-3.5 w-3.5" />
                            <span>
                              {item.weight}
                              {item.unit || item.unitType || "g"}
                            </span>
                          </div>
                        )}

                        {item.packageSize != null && item.packageSize > 1 && (
                          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                            <Layers className="h-3.5 w-3.5" />
                            <span>Pack of {item.packageSize}</span>
                          </div>
                        )}
                      </div>

                      {/* Badges Row */}
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        <Badge variant="secondary" className="text-xs">
                          Qty: {item.quantity}
                        </Badge>

                        <Badge variant="outline" className="text-xs">
                          {formatTaka(item.unitPrice)} each
                        </Badge>

                        {item.unitType && (
                          <Badge variant="outline" className="text-xs">
                            {item.unitType}
                          </Badge>
                        )}

                        {item.rating != null && item.rating > 0 && (
                          <Badge variant="outline" className="gap-1 text-xs">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            {item.rating}
                            {item.reviewCount != null && (
                              <span className="text-muted-foreground">
                                ({item.reviewCount})
                              </span>
                            )}
                          </Badge>
                        )}

                        {item.productId != null && (
                          <span className="text-xs text-muted-foreground">
                            ID: {item.productId.toString()}
                          </span>
                        )}
                      </div>

                      {/* Multiple Images Preview */}
                      {(item.accessibleImageUrls?.length ?? 0) > 1 && (
                        <div className="flex gap-2 pt-2">
                          {item.accessibleImageUrls
                            ?.slice(1, 4)
                            .map((url, imgIndex) => (
                              <div
                                key={imgIndex}
                                className="h-12 w-12 overflow-hidden rounded-md border bg-muted"
                              >
                                <Image
                                  src={url}
                                  alt={`${item.name} ${imgIndex + 2}`}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover"
                                />
                              </div>
                            ))}
                          {(item.accessibleImageUrls?.length ?? 0) > 4 && (
                            <div className="flex h-12 w-12 items-center justify-center rounded-md border bg-muted text-xs text-muted-foreground">
                              +{(item.accessibleImageUrls?.length ?? 0) - 4}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {index < orderItems.length - 1 && (
                    <Separator className="mt-6" />
                  )}
                </div>
              ))}

              {/* Order Summary */}
              <Separator />
              <div className="space-y-2">
                {/* Subtotal */}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Subtotal ({orderItems.length} item
                    {orderItems.length !== 1 ? "s" : ""})
                  </span>
                  <span>{formatTaka(itemsSubtotal)}</span>
                </div>

                {/* Shipping & Others */}
                {shippingCharges !== 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {shippingCharges > 0 ? "Shipping & Others" : "Discount"}
                    </span>
                    <span>
                      {shippingCharges > 0 ? "" : "-"}
                      {formatTaka(Math.abs(shippingCharges))}
                    </span>
                  </div>
                )}

                {/* Total */}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{formatTaka(orderTotal)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Package className="mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="font-medium">No items found</p>
              <p className="text-sm text-muted-foreground">
                This order doesn&apos;t have any items yet
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
