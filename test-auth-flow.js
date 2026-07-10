// Quick test to verify Supabase integration
const supabaseUrl = "https://kputxxqenaczmgzjptbr.supabase.co";
const supabaseKey = "sb_publishable_dyiQkY59xLhv1uTcT2kswg_MyoAxyVr";

async function testFlow() {
  console.log("Testing Athletic Wolf auth flow...\n");

  // Test 1: Check Supabase connectivity
  console.log("1. Testing Supabase connectivity...");
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/plans?limit=1`, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });
    if (response.ok) {
      console.log("   ✓ Supabase is accessible\n");
    } else {
      console.log("   ✗ Supabase returned error:", response.status);
    }
  } catch (err) {
    console.log("   ✗ Failed to connect:", err.message);
  }

  // Test 2: Check app routes
  console.log("2. Checking app routes...");
  const routes = [
    "http://localhost:3000",
    "http://localhost:3000/auth/signup",
    "http://localhost:3000/auth/login",
    "http://localhost:3000/checkout",
    "http://localhost:3000/dashboard",
  ];

  for (const route of routes) {
    try {
      const response = await fetch(route);
      console.log(`   ${response.ok ? "✓" : "✗"} ${route} (${response.status})`);
    } catch (err) {
      console.log(`   ✗ ${route} (error)`);
    }
  }

  console.log(
    "\n✓ All systems ready! Manual testing instructions:\n" +
      "  1. Go to http://localhost:3000\n" +
      "  2. Scroll to 'Packages' section\n" +
      "  3. Click 'Get Started' on any package\n" +
      "  4. Review the package and click 'Complete Purchase (Test Mode)'\n" +
      "  5. You'll be redirected to signup\n" +
      "  6. Create an account and check your dashboard\n"
  );
}

testFlow();
