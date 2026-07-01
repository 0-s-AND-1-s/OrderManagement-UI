import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReceiptDetails } from "../../services/ReceiptDetailsService";

function DisplayReceiptComponent() {
  const { receiptId } = useParams();
  const navigate = useNavigate();

  const [receiptDetails, setReceiptDetails] = useState({
    receiptItemDetails: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getReceiptDetails(receiptId)
      .then((response) => {
        setReceiptDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading receipt:", err);
        setIsLoading(false);
      });
  }, [receiptId]);

  if (isLoading) {
    return <div className="text-center mt-5">Loading secure receipt...</div>;
  }

  return (
    <div className="d-flex flex-column align-items-center mt-4 mb-5">
      {/* Receipt Paper Container */}
      <div
        className="bg-white p-4 shadow-sm border text-dark font-monospace"
        style={{ width: "380px", fontSize: "14px", lineHeight: "1.5" }}
      >
        {/* Header Section */}
        <div className="text-center mb-3">
          <h2 className="fw-bold m-0" style={{ letterSpacing: "1px" }}>
            ZeroesAndOnes
          </h2>
          <small className="text-muted">RECEIPT / INVOICE</small>
        </div>

        {/* Metadata Section */}
        <div className="mb-2">
          <div>
            <strong>Order ID:</strong> #{receiptDetails.orderId}
          </div>
          <div>
            <strong>Date:</strong>{" "}
            {new Date(receiptDetails.orderTime).toLocaleString()}
          </div>
        </div>

        {/* Dashed Separator */}
        <div
          className="border-bottom border-secondary border-dashed my-2"
          style={{ borderStyle: "dashed" }}
        ></div>

        {/* Items Table Headers */}
        <div className="d-flex fw-bold text-secondary mb-1">
          <div style={{ width: "55%" }}>ITEM</div>
          <div style={{ width: "15%" }} className="text-center">
            QTY
          </div>
          <div style={{ width: "30%" }} className="text-end">
            PRICE
          </div>
        </div>

        {/* Dashed Separator */}
        <div
          className="border-bottom border-secondary border-dashed mb-2"
          style={{ borderStyle: "dashed" }}
        ></div>

        {/* Dynamic Items Loop */}
        <div className="mb-3">
          {receiptDetails.receiptItemDetails.map((receiptItem, index) => (
            <div key={index} className="d-flex align-items-start mb-1">
              {/* Item Name */}
              <div style={{ width: "55%" }} className="text-truncate pr-2">
                {receiptItem.itemName}
              </div>
              {/* Quantity */}
              <div style={{ width: "15%" }} className="text-center">
                {receiptItem.quantity}
              </div>
              {/* Price Calculation Format (e.g., 1x $10.99) */}
              <div style={{ width: "30%" }} className="text-end text-nowrap">
                {receiptItem.quantity}x ${receiptItem.unitPrice?.toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Thick Separator */}
        <div className="border-bottom border-dark border-2 my-2"></div>

        {/* Financial Summary Breakdown */}
        <div className="d-flex flex-column align-items-end gap-1">
          <div
            className="d-flex justify-content-between"
            style={{ width: "60%" }}
          >
            <span>Subtotal:</span>
            <span>${receiptDetails.subTotal?.toFixed(2)}</span>
          </div>
          <div
            className="d-flex justify-content-between"
            style={{ width: "60%" }}
          >
            <span className="text-muted">Sales Tax (8.25%):</span>
            <span>${receiptDetails.salesTax?.toFixed(2)}</span>
          </div>

          <div
            className="border-bottom border-secondary border-dashed my-1 w-60"
            style={{ borderStyle: "dashed", width: "60%" }}
          ></div>

          <div
            className="d-flex justify-content-between fw-bold fs-5"
            style={{ width: "60%" }}
          >
            <span>TOTAL:</span>
            <span>${receiptDetails.total?.toFixed(2)}</span>
          </div>
        </div>

        {/* Footer Greetings */}
        <div className="text-center mt-4 pt-2">
          <div className="fw-semibold">Thank You for shopping with</div>
          <div className="fw-bold text-uppercase">ZeroesAndOnes😊</div>
        </div>
      </div>

      {/* Navigation Safety Net Button */}
      <button
        className="btn btn-outline-dark font-monospace px-4 mt-3 shadow-sm"
        onClick={() => navigate("/orderItems")}
      >
        ⬅ Back to Menu
      </button>
    </div>
  );
}

export default DisplayReceiptComponent;
