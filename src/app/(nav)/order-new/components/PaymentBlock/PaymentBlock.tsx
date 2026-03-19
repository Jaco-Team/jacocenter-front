import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { Text } from "@/shared/ui/Typography/Typography";
import { PaymentState } from "../PaymentBlock/PaymentBlock.types";
import "./PaymentBlock.style.css";

export const PaymentBlock = ({ 
  state, 
  activeTimeTab, 
  isTimeSaved 
}:{
  state: PaymentState; 
  activeTimeTab: "nearest" | "by-time" | null;
  isTimeSaved: boolean}) => {

  const { method, cashAmount, comment, setMethod, setCashAmount, setComment } = state;

  return (
    <div className={`payment-block ${activeTimeTab==="nearest" || isTimeSaved ? "payment-block-active" : "payment-block-disabled"}`}>
      <div className="payment-method">
        <Input 
          value={cashAmount} 
          onChange={(e) => setCashAmount(e.target.value)} 
          placeholder="Введите сумму" 
          label="Сдача с" 
          className="payment-input"
        />
        <Button 
          variant="base" 
          theme={method === "card" ? "primary" : "secondary"} 
          onClick={() => setMethod("card")}
          className={method === "card" ? "button-active" : "button-default"}
        >
          <Text>Безналичный расчёт</Text>
        </Button>
      </div>

      <Input 
        value={comment}
        onChange={(e) => setComment(e.target.value)} 
        placeholder="Например, позвонить за час до доставки" 
        label="Комментарий курьеру"
        className="payment-input"  
      />
    </div>
  )
}