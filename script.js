// Paddle Checkout integration.
//
// To enable real checkouts:
//   1. Sign up at paddle.com → get your Client-side Token (Developer Tools → Authentication).
//   2. In Paddle, create a Product → Price for ScreenLock at $9.99 USD.
//   3. Replace PADDLE_CLIENT_TOKEN and PADDLE_PRICE_ID below with your values.
//   4. Set Paddle.Environment.set("sandbox") for testing, remove for production.

const PADDLE_CLIENT_TOKEN = "live_579bce3839d79a9bc0ef2ee9cd3";
const PADDLE_PRICE_ID     = "pri_01krkvwy4nbz0fjvbde2twf6n6";

function paddleConfigured() {
    return !PADDLE_CLIENT_TOKEN.startsWith("REPLACE_") && !PADDLE_PRICE_ID.startsWith("REPLACE_");
}

if (paddleConfigured() && window.Paddle) {
    // CDN Paddle.js v2 doesn't accept `environment` in Initialize — it defaults
    // to production. For sandbox testing, call Paddle.Environment.set("sandbox")
    // BEFORE Paddle.Initialize.
    Paddle.Initialize({ token: PADDLE_CLIENT_TOKEN });
}

function openCheckout() {
    if (!paddleConfigured() || !window.Paddle) {
        alert(
            "Paddle isn't wired up yet. Edit script.js and replace PADDLE_CLIENT_TOKEN " +
            "and PADDLE_PRICE_ID with values from your Paddle dashboard."
        );
        return;
    }

    Paddle.Checkout.open({
        items: [{ priceId: PADDLE_PRICE_ID, quantity: 1 }],
        settings: {
            displayMode: "overlay",
            theme: "light",
            // {transaction_id} is the Paddle Billing placeholder that gets
            // substituted with the real txn ID on redirect. Empirically,
            // Paddle does NOT always auto-append _ptxn, so make it explicit.
            successUrl: window.location.origin + "/thanks.html?_ptxn={transaction_id}",
        },
    });
}

window.openCheckout = openCheckout;
