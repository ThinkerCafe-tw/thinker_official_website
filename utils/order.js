export function parseOrderIdString(order) {
  return order ? String(order.order_id) : '--';
}
