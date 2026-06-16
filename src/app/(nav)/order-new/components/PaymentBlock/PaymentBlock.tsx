import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import { PaymentBlockProps } from "../PaymentBlock/PaymentBlock.types";
import "./PaymentBlock.style.css";
import { useOrderStore } from "@/entities/Order/store/new-order/orderStore";

export const PaymentBlock = ({ activeTimeTab, isTimeSaved }: PaymentBlockProps) => {

  const { method, cashAmount, comment } = useOrderStore((s) => s.payment);
  const setPayment = useOrderStore((s) => s.setPayment);

  return (
    <div className={`payment-block ${activeTimeTab==="nearest" || isTimeSaved ? "payment-block-active" : "payment-block-disabled"}`}>
      <div className="payment-method">
        <Input 
          value={cashAmount} 
          onChange={(e) => setPayment({ cashAmount: e.target.value, method: "cash" })}
          placeholder="Введите сумму" 
          label="Сдача с" 
          className="payment-input"
        />
        <Button 
          variant="base" 
          theme={method === "card" ? "primary" : "secondary"} 
          onClick={() => setPayment( method === "card" ? { method: null } : { method: "card", cashAmount: "" })}
          className={method === "card" ? "button-active" : "button-default"}
        >
          <Text>Безналичный расчёт</Text>
        </Button>
      </div>

      <Input 
        value={comment}
        onChange={(e) => setPayment({ comment: e.target.value })}
        placeholder="Например, позвонить за час до доставки" 
        label="Комментарий курьеру"
        className="payment-input"  
      />
    </div>
  )
}