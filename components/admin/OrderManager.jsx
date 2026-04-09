"use client";

import { useState, useEffect, useCallback } from "react";

function formatPrice(price) {
  return price.toLocaleString("en-PK");
}

function timeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date).getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" });
}

const statusColors = {
  PENDING: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
  CONFIRMED: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
  SHIPPED: "text-indigo-700 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20",
  DELIVERED: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
  CANCELLED: "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20",
};

const statusTabs = ["ALL", "PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("ALL");
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const params = activeTab !== "ALL" ? `?status=${activeTab}` : "";
    const res = await fetch(`/api/orders${params}`);
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
    setLoading(false);
  }, [activeTab]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const updateStatus = async (orderId, newStatus) => {
    setUpdating(orderId);
    const res = await fetch(`/api/orders/${orderId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) {
      const updated = await res.json();
      setOrders((prev) => prev.map((o) => (o.id === orderId ? updated : o)));
    }
    setUpdating(null);
  };

  const statusCounts = orders.reduce((acc, o) => {
    acc[o.status] = (acc[o.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-sans text-2xl font-bold tracking-tight mb-1">Orders</h1>
        <p className="text-sm text-sand-500">
          {orders.length} {orders.length === 1 ? "order" : "orders"}
          {activeTab !== "ALL" && ` (${activeTab.toLowerCase()})`}
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              font-mono text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-all
              ${activeTab === tab
                ? "bg-neutral-900 dark:bg-sand-100 text-white dark:text-sand-900"
                : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
              }
            `}
            style={activeTab !== tab ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
          >
            {tab === "ALL" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            {tab === "ALL" && orders.length > 0 && ` (${orders.length})`}
            {tab !== "ALL" && statusCounts[tab] ? ` (${statusCounts[tab]})` : ""}
          </button>
        ))}
      </div>

      {/* Orders list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-5 animate-pulse">
              <div className="h-4 bg-sand-300 dark:bg-sand-700 rounded w-1/3 mb-2" />
              <div className="h-3 bg-sand-300 dark:bg-sand-700 rounded w-2/3" />
            </div>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-sm text-sand-600 dark:text-sand-500">
            No orders {activeTab !== "ALL" ? `with status "${activeTab.toLowerCase()}"` : "yet"}.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="card p-0 overflow-hidden">
              {/* Order header — clickable */}
              <button
                onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                className="w-full text-left px-5 py-4 bg-transparent border-none cursor-pointer flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <span className="font-mono text-sm font-semibold text-rugged-500 dark:text-rugged-400 shrink-0">
                    {order.orderNumber}
                  </span>
                  <span className="text-sm text-neutral-900 dark:text-sand-100 truncate">
                    {order.customerName}
                  </span>
                  <span className="text-xs text-sand-500 shrink-0">{order.city}</span>
                  <span className={`text-[0.6rem] uppercase tracking-widest font-medium px-2 py-0.5 rounded-sm shrink-0 ${statusColors[order.status]}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-semibold text-neutral-900 dark:text-sand-100 tabular-nums">
                    Rs. {formatPrice(order.total)}
                  </span>
                  <span className="text-xs text-sand-500 tabular-nums w-20 text-right">
                    {timeAgo(order.createdAt)}
                  </span>
                  <span className="text-sand-400 text-xs">
                    {expandedOrder === order.id ? "▲" : "▼"}
                  </span>
                </div>
              </button>

              {/* Expanded details */}
              {expandedOrder === order.id && (
                <div className="px-5 pb-5 pt-0" style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}>
                  <div className="grid md:grid-cols-2 gap-6 mt-4">
                    {/* Customer info */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-3">
                        Customer Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <span className="text-sand-500 w-16 inline-block">Name:</span>
                          <span className="text-neutral-900 dark:text-sand-100">{order.customerName}</span>
                        </p>
                        <p>
                          <span className="text-sand-500 w-16 inline-block">Phone:</span>
                          <span className="text-neutral-900 dark:text-sand-100 font-mono">{order.phone}</span>
                        </p>
                        <p>
                          <span className="text-sand-500 w-16 inline-block">City:</span>
                          <span className="text-neutral-900 dark:text-sand-100">{order.city}</span>
                        </p>
                        <p>
                          <span className="text-sand-500 w-16 inline-block">Address:</span>
                          <span className="text-neutral-900 dark:text-sand-100">{order.address}</span>
                        </p>
                        {order.notes && (
                          <p>
                            <span className="text-sand-500 w-16 inline-block">Notes:</span>
                            <span className="text-neutral-900 dark:text-sand-100 italic">{order.notes}</span>
                          </p>
                        )}
                        <p>
                          <span className="text-sand-500 w-16 inline-block">Date:</span>
                          <span className="text-neutral-900 dark:text-sand-100">
                            {new Date(order.createdAt).toLocaleString("en-PK", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-sand-500 mb-3">
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex-1 min-w-0">
                              <span className="text-neutral-900 dark:text-sand-100 truncate block">
                                {item.name}
                              </span>
                              <span className="text-xs text-sand-500">
                                {item.quantity} x Rs. {formatPrice(item.price)}
                              </span>
                            </div>
                            <span className="text-neutral-900 dark:text-sand-100 font-medium tabular-nums shrink-0 ml-4">
                              Rs. {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-3 pt-3 flex justify-between items-center" style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}>
                        <span className="text-sm font-medium text-sand-600 dark:text-sand-500">Total</span>
                        <span className="text-lg font-bold text-neutral-900 dark:text-sand-100">
                          Rs. {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status update */}
                  <div className="mt-5 pt-4 flex items-center gap-3" style={{ borderTop: "1px solid rgba(128,128,128,0.1)" }}>
                    <span className="text-xs font-mono uppercase tracking-wider text-sand-500">Update status:</span>
                    <div className="flex gap-2 flex-wrap">
                      {["PENDING", "CONFIRMED", "SHIPPED", "DELIVERED", "CANCELLED"].map((s) => (
                        <button
                          key={s}
                          onClick={() => updateStatus(order.id, s)}
                          disabled={order.status === s || updating === order.id}
                          className={`
                            text-xs font-mono px-3 py-1.5 rounded-sm cursor-pointer transition-all
                            disabled:opacity-30 disabled:cursor-not-allowed
                            ${order.status === s
                              ? statusColors[s]
                              : "bg-transparent text-sand-600 dark:text-sand-500 hover:text-neutral-900 dark:hover:text-sand-100"
                            }
                          `}
                          style={order.status !== s ? { border: "1px solid rgba(128,128,128,0.2)" } : { border: "1px solid transparent" }}
                        >
                          {s.charAt(0) + s.slice(1).toLowerCase()}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
