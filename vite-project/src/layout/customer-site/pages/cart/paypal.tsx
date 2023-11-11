import { PayPalButtons } from "@paypal/react-paypal-js";
import { apiCreateOrder } from "../../../../apis";
type Props = {
    total: number;
    dataPaypal: any;
    handleCheckoutPaypal(status: any): void;
};

const TestPaypal = (props: Props) => {
    const handlePaymentSuccess = async () => {
        const response = await apiCreateOrder(props.dataPaypal);
        if (response.data.success) {
            props.handleCheckoutPaypal(response.data.success);
        }
    };

    return (
        <div>
            <PayPalButtons
                createOrder={(_data, actions) => {
                    {
                        return actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: String(props.total),
                                    },
                                    description: `purchase at ${new Date().toDateString()}`,
                                },
                            ],
                        });
                    }
                }}
                onApprove={(_, action): any => {
                    return action.order
                        ?.capture()
                        .then(() => handlePaymentSuccess());
                }}
            />
        </div>
    );
};

export default TestPaypal;
