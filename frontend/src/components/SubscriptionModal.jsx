import { X, Check, Sparkles, FileText, MessageSquare, Zap } from "lucide-react";
import { useUIStore } from "../store/useUIStore"
import { useAuthStore } from "../store/useAuthStore"
import { usePaymentStore } from "../store/usePaymentStore"

const plans = [
  {
    name: "Free",
    description: "Everything you need to get started.",
    price: "₹0",
    duration: "forever",
    features: [
      "5 PDF uploads per month",
      "20 questions per day",
      "AI-powered PDF conversations",
      "Document processing and search",
    ],
  },
  {
    name: "Pro",
    description: "More room to learn, research, and build.",
    price: "₹299",
    duration: "/ 30 days",
    features: [
      "50 PDF uploads per month",
      "1,000 questions per month",
      "AI-powered PDF conversations",
      "Priority workspace for your documents",
    ],
  },
];

export default function SubscriptionModal() {
  const { showPlans, closePlans } = useUIStore();
  const { authUser } = useAuthStore(); 
  const { startPayment, verifyPayment } = usePaymentStore();
  console.log(authUser)

  if (!showPlans) return null;

  const isPaid = authUser.plan === "paid";

  const handlePayment = async (e) => {
    const order = await startPayment();
    console.log(order) 
    if(!order) return
    var options = {
      "key": order.keyId, 
      "amount": order.amount, 
      "currency": order.currency,
      "name": "AskDoc.ai",
      "description": "Test Transaction",
      "image": "https://example.com/your_logo",
      "order_id": order.orderId, 
      "handler": function (response){
          const data = verifyPayment(response);
          console.log(data)
        },
        "prefill": { 
            "name": authUser.fullName, 
            "email": authUser.email, 
            "contact": "<phone>"  
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center
    overflow-hidden bg-black/75 p-3 backdrop-blur-sm sm:p-4">

    <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="subscription-title"
        className="relative w-full max-w-3xl max-h-full overflow-y-auto
        rounded-2xl border border-[#2a2a2a] bg-[#111111]
        p-4 text-white shadow-2xl sm:p-5 lg:overflow-visible"
    >
        {/* Close button */}
        <button
          onClick={closePlans}
          aria-label="Close subscription plans"
          className="absolute right-4 top-4 rounded-lg p-2
            text-zinc-500 transition hover:bg-[#242424]
            hover:text-white"
        >
          <X size={19} />
        </button>

        {/* Header */}
        <div className="mx-auto mb-7 max-w-lg text-center">
          <div
            className="mx-auto mb-4 flex h-11 w-11 items-center
              justify-center rounded-xl border border-[#333]
              bg-[#1d1d1d]"
          >
            <Sparkles size={21} className="text-white" />
          </div>

          <p className="mb-2 text-xs font-medium uppercase
            tracking-[0.2em] text-zinc-500">
            ASKDOC / PLANS
          </p>

          <h2
            id="subscription-title"
            className="text-2xl font-semibold tracking-tight
              sm:text-3xl"
          >
            Choose your plan
          </h2>

          <p className="mt-2 text-sm leading-6 text-zinc-400">
            Get more out of your documents with a plan that
            fits your workflow.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {plans.map((item) => {
            const isPro = item.name === "Pro";
            const isCurrent = isPro ? isPaid : !isPaid;

            return (
              <div
                key={item.name}
                className={`flex min-w-0 flex-col rounded-xl border p-4 ${
                isPro
                    ? "border-zinc-500 bg-[#1b1b1b]"
                    : "border-[#2b2b2b] bg-[#171717]"
                }`}
              >
                {/* Plan title */}
                <div className="mb-5 flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-zinc-400">
                      {item.description}
                    </p>
                  </div>

                  {isPro && (
                    <span className="shrink-0 rounded-md border
                      border-[#444] px-2 py-1 text-[10px]
                      font-medium uppercase tracking-wider
                      text-zinc-300">
                      Pro
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-tight">
                    {item.price}
                  </span>
                  <span className="text-xs text-zinc-500">
                    {item.duration}
                  </span>
                </div>

                <div className="mb-5 h-px bg-[#2c2c2c]" />

                {/* Features */}
                <div className="mb-7 flex-1">
                  <p className="mb-4 text-xs font-medium uppercase
                    tracking-wider text-zinc-500">
                    What's included
                  </p>

                  <ul className="space-y-3">
                    {item.features.map((feature,) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm
                          leading-5 text-zinc-300"
                      >
                        <Check
                          size={16}
                          className="mt-0.5 shrink-0 text-zinc-400"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action */}
                <button
                  type="button"
                  disabled={isCurrent}
                  onClick={() => {
                    if (isPro && !isPaid) {
                      closePlans();
                      handlePayment();
                    }
                  }}
                  className={`flex w-full items-center justify-center
                    gap-2 rounded-lg px-4 py-3 text-sm font-medium
                    transition ${
                      isCurrent
                        ? "cursor-default border border-[#333] bg-[#202020] text-zinc-400"
                        : isPro
                          ? "bg-white text-black hover:bg-zinc-200"
                          : "border border-[#333] bg-transparent text-zinc-300 hover:bg-[#242424]"
                    }`}
                >
                  {isCurrent ? (
                    <>
                      <Check size={16} />
                      Your current plan
                    </>
                  ) : isPro ? (
                    <>
                      <Zap size={16} />
                      Start now
                    </>
                  ) : (
                    "Free plan"
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-5 text-center text-xs leading-5 text-zinc-500">
          {isPaid
            ? "You're on Pro. Enjoy your current plan."
            : "Upgrade whenever you need more room to work."}
          {" "}Payments are securely processed by Razorpay.
        </p>
      </div>
    </div>
  );
}
