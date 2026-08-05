// Local smoke-test helper. Uses env vars — never hardcode keys.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function testFlow() {
  console.log("Testing Athletic Wolf auth/API smoke checks...\n");

  if (!supabaseUrl || !supabaseAnonKey) {
    console.log("✗ Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY");
    process.exit(1);
  }

  console.log("1. Testing anon access to plans (should be empty/denied after RLS)...");
  try {
    const response = await fetch(
      `${supabaseUrl}/rest/v1/plans?select=id&limit=1`,
      {
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      }
    );
    const body = await response.text();
    console.log(`   status=${response.status}`);
    console.log(`   body=${body.slice(0, 120)}`);
    if (response.ok && body.trim() === "[]") {
      console.log("   ✓ Anon cannot read plan rows (RLS working)\n");
    } else if (response.ok && body.includes('"id"')) {
      console.log("   ✗ Anon can still read plans — enable RLS migration\n");
    } else {
      console.log("   ✓ Anon blocked or empty\n");
    }
  } catch (err) {
    console.log("   ✗ Failed to connect:", err.message);
  }

  console.log("2. Checking app routes...");
  const routes = [
    "http://localhost:3000",
    "http://localhost:3000/auth/signup",
    "http://localhost:3000/auth/login",
    "http://localhost:3000/checkout",
    "http://localhost:3000/dashboard",
    "http://localhost:3000/admin",
  ];

  for (const route of routes) {
    try {
      const response = await fetch(route);
      console.log(
        `   ${response.ok ? "✓" : "✗"} ${route} (${response.status})`
      );
    } catch {
      console.log(`   ✗ ${route} (error — is dev server running?)`);
    }
  }
}

testFlow();
