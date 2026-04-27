// app/(dashboard)/orders/[id]/page.tsx

import OrderDetail from "./_components/OrderDetail";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

const OrderDetailPage = async ({ params }: OrderDetailPageProps) => {
  const { id } = await params;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <OrderDetail orderId={id} />
    </div>
  );
};

export default OrderDetailPage;
