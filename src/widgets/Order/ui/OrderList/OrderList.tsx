import "./OrderList.styles.css";
import { OrderListProps } from "./OrderList.types";

export const OrderList = ({
  items,
  totalPrice,
  variant = "narrow",
  className = "",
}: OrderListProps) => {
  return (
    <div
      className={`order-list ${variant === "wide" ? "wide" : ""} ${className}`}
    >
      <h2>Состав заказа</h2>

      <div className="order-table">
        {/* Заголовки колонок */}
        <div className="order-row order-header">
          <span className="order-name">Название</span>
          <span className="order-quantity">Количество</span>
          <span className="order-price">Цена(₽)</span>
        </div>

        {/* Список товаров */}
        <div className="order-items">
          {items.map((item, index) => (
            <div key={index} className="order-row order-item">
              <span className="order-name">{item.name}</span>
              <span className="order-quantity">{item.quantity}</span>
              <span className="order-price">{item.price}</span>
            </div>
          ))}
        </div>

        {/* Разделитель */}
        <div className="order-divider" />

        {/* Итоговая сумма */}
        <div className="order-total order-row">
          <h3>Сумма заказа</h3>
          <span className="order-price">{totalPrice} ₽</span>
        </div>
      </div>
    </div>
  );
};
