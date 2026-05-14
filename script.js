// Paddle Checkout integration.
//
// To enable real checkouts:
//   1. Sign up at paddle.com → get your Client-side Token (Developer Tools → Authentication).
//   2. In Paddle, create a Product → Price for ScreenLock at $9.99 USD.
//   3. Replace PADDLE_CLIENT_TOKEN and PADDLE_PRICE_ID below with your values.
//   4. Set Paddle.Environment.set("sandbox") for testing, remove for production.

const PADDLE_CLIENT_TOKEN = "REPLACE_WITH_YOUR_PADDLE_CLIENT_TOKEN";
const PADDLE_PRICE_ID     = "REPLACE_WITH_YOUR_PADDLE_PRICE_ID";

function paddleConfigured() {
    return !PADDLE_CLIENT_TOKEN.startsWith("REPLACE_") && !PADDLE_PRICE_ID.startsWith("REPLACE_");
}

if (paddleConfigured() && window.Paddle) {
    // Paddle.Environment.set("sandbox"); // uncomment for sandbox testing
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
            successUrl: window.location.origin + "/thanks.html",
        },
    });
}

window.openCheckout = openCheckout;
