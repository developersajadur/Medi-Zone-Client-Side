/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyOrder } from "@/services/OrderService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

const VerifyOrderComponent = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!orderId) {
      setError("No order ID provided");
      setLoading(false);
      return;
    }

    const fetchOrder = async () => {
      try {
        const response = await verifyOrder(orderId);
        if (response.success) {
          setOrderData(response?.data[0]);
        } else {
          setError(response.message || "Failed to verify order");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  if (loading) return <p className="text-center text-gray-600">Verifying order...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!orderData) return <p className="text-center text-red-500">No order data found.</p>;

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-900">Order Verification</h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {/* Order Details */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoGrid
              data={[
                { label: "Order ID", value: orderData?.order_id },
                { label: "Amount", value: `${orderData?.currency} ${orderData?.amount?.toFixed(2)}` },
                { label: "Date", value: new Date(orderData?.date_time).toLocaleString() },
                {
                  label: "Status",
                  value: (
                    <Badge
                      className={`text-white ${
                        orderData?.bank_status === "Success" ? "bg-green-500" : "bg-red-500"
                      }`}
                    >
                      {orderData?.bank_status}
                    </Badge>
                  ),
                },
              ]}
            />
          </CardContent>
        </Card>

        {/* Payment Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoGrid
              data={[
                { label: "Method", value: orderData?.method },
                { label: "Transaction ID", value: orderData?.bank_trx_id },
                { label: "Invoice No", value: orderData?.invoice_no },
                { label: "SP Code", value: orderData?.sp_code },
                { label: "SP Message", value: orderData?.sp_message },
              ]}
            />
          </CardContent>
        </Card>

        {/* Customer Information */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <InfoGrid
              data={[
                { label: "Name", value: orderData?.name },
                { label: "Email", value: orderData?.email },
                { label: "Phone", value: orderData?.phone_no },
                { label: "Address", value: orderData?.address },
                { label: "City", value: orderData?.city },
              ]}
            />
          </CardContent>
        </Card>

        {/* Verification Status */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-lg font-semibold">
              {orderData?.is_verify >= 1 ? (
                <>
                  <CheckCircle className="text-green-500" />
                  <span className="text-green-600">Verified</span>
                </>
              ) : (
                <>
                  <AlertCircle className="text-yellow-500" />
                  <span className="text-yellow-600">Not Verified</span>
                </>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Link href="/order">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Orders</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

// **Reusable Component for Info Display**
const InfoGrid = ({ data }: { data: { label: string; value: React.ReactNode }[] }) => (
  <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-gray-700">
    {data.map(({ label, value }, index) => (
      <React.Fragment key={index}>
        <dt className="font-medium text-gray-600">{label}:</dt>
        <dd className="text-gray-800">{value || "N/A"}</dd>
      </React.Fragment>
    ))}
  </dl>
);

export default VerifyOrderComponent;
