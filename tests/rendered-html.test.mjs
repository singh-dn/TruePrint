import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  return (await import(workerUrl.href)).default;
}

function runtimeEnv(overrides = {}) {
  return {
    ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    ...overrides,
  };
}

const executionContext = {
  waitUntil() {},
  passThroughOnException() {},
};

test("rejects malformed and oversized bodies without external requests", async () => {
  const worker = await loadWorker();
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => { throw new Error("Unexpected external request"); };
  try {
    for (const [body, status] of [["null", 400], ["[]", 400], ["{", 400], [" ".repeat(32769), 413]]) {
      const response = await worker.fetch(new Request("http://localhost/api/forms/contact-enquiry", {
        method: "POST", headers: { "content-type": "application/json" }, body,
      }), runtimeEnv(), executionContext);
      assert.equal(response.status, status);
    }
  } finally { globalThis.fetch = originalFetch; }
});

test("invalid continuation cannot upload and out-of-range quantity cannot query", async () => {
  const worker = await loadWorker();
  const originalFetch = globalThis.fetch;
  const originalUrl = process.env.SUPABASE_URL;
  const originalKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  process.env.SUPABASE_URL = "https://example.supabase.co";
  process.env.SUPABASE_SERVICE_ROLE_KEY = "test-key";
  const calls = [];
  globalThis.fetch = async (input, init) => {
    calls.push(String(input));
    assert.ok(String(input).includes("/rest/v1/homepage_project_intakes?"));
    assert.equal(init.method, undefined);
    return Response.json([]);
  };
  try {
    for (const [quantity, status] of [["2147483648", 422], ["100", 409]]) {
      const form = new FormData();
      form.set("intake_id", "11111111-1111-4111-8111-111111111111");
      form.set("continuation_token", "a".repeat(64));
      form.set("quantity", quantity);
      form.set("consent", "true");
      form.set("reference", new File(["test"], "test.png", { type: "image/png" }));
      const response = await worker.fetch(new Request("http://localhost/api/forms/project-intake", {
        method: "POST", body: form,
      }), runtimeEnv(), executionContext);
      assert.equal(response.status, status);
    }
    assert.equal(calls.length, 1);
  } finally {
    globalThis.fetch = originalFetch;
    if (originalUrl === undefined) delete process.env.SUPABASE_URL; else process.env.SUPABASE_URL = originalUrl;
    if (originalKey === undefined) delete process.env.SUPABASE_SERVICE_ROLE_KEY; else process.env.SUPABASE_SERVICE_ROLE_KEY = originalKey;
  }
});

test("renders every lead form with its Turnstile action", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    runtimeEnv(),
    executionContext,
  );

  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /<form class="sourceRequestForm"/i);
  assert.match(html, /name="name"/i);
  assert.match(html, /name="phone"/i);
  assert.match(html, /name="email"/i);
  assert.match(html, /name="organization"/i);
  assert.match(html, /name="requirement"/i);
  assert.match(html, /<input(?=[^>]*\bname="reference")(?=[^>]*\btype="file")[^>]*>/i);
  assert.match(html, /data-turnstile-action="project_intake"/i);
  assert.match(html, /data-turnstile-action="source_request"/i);

  const contactResponse = await worker.fetch(
    new Request("http://localhost/contact", { headers: { accept: "text/html" } }),
    runtimeEnv(),
    executionContext,
  );
  assert.match(await contactResponse.text(), /data-turnstile-action="contact_enquiry"/i);

});

test("validates form fields before any database request", async () => {
  const worker = await loadWorker();
  const originalFetch = globalThis.fetch;
  let externalRequests = 0;
  globalThis.fetch = async () => {
    externalRequests += 1;
    throw new Error("External request should not run for invalid input.");
  };

  try {
    const response = await worker.fetch(
      new Request("http://localhost/api/forms/contact-enquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name: "", email: "bad", phone: "1", requirement: "short" }),
      }),
      runtimeEnv(),
      executionContext,
    );
    assert.equal(response.status, 422);
    assert.equal(externalRequests, 0);
    assert.equal((await response.json()).code, "validation_error");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("every lead endpoint rejects a missing Turnstile token", async () => {
  const worker = await loadWorker();
  const env = runtimeEnv({ TURNSTILE_SECRET_KEY: "test-secret" });
  const cases = [
    new Request("http://localhost/api/forms/project-intake", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test Person",
        email: "test@example.com",
        phone: "+91 9876543210",
        requirement: "Five hundred custom welcome kits",
        source_page: "/",
      }),
    }),
    new Request("http://localhost/api/forms/contact-enquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test Person",
        email: "test@example.com",
        phone: "+91 9876543210",
        requirement: "Five hundred custom welcome kits",
        source_page: "/contact",
      }),
    }),
    new Request("http://localhost/api/forms/catalogue-download", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test Person",
        email: "test@example.com",
        phone: "+91 9876543210",
        category_key: "diaries",
        catalogue_slot: "complete-collection",
        catalogue_title: "Gifts Catalogue 2026–27",
        catalogue_url: "https://example.com/catalogue.pdf",
        source_page: "/categories",
      }),
    }),
  ];

  const sourceForm = new FormData();
  sourceForm.set("name", "Test Person");
  sourceForm.set("email", "test@example.com");
  sourceForm.set("phone", "+91 9876543210");
  sourceForm.set("organization", "Example Company");
  sourceForm.set("requirement", "A custom object based on our reference photograph");
  sourceForm.set("source_page", "/");
  cases.push(new Request("http://localhost/api/forms/source-request", { method: "POST", body: sourceForm }));

  for (const request of cases) {
    const response = await worker.fetch(request, env, executionContext);
    assert.equal(response.status, 403, request.url);
    assert.equal((await response.json()).code, "bot_verification_failed", request.url);
  }
});

test("verified sourcing request uploads its photo and inserts a dedicated record", async () => {
  const worker = await loadWorker();
  const originalFetch = globalThis.fetch;
  const environmentKeys = [
    "SUPABASE_URL",
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_STORAGE_BUCKET",
    "TURNSTILE_SECRET_KEY",
    "TURNSTILE_ALLOWED_HOSTNAMES",
  ];
  const originalEnvironment = Object.fromEntries(
    environmentKeys.map((key) => [key, process.env[key]]),
  );
  const calls = [];
  const recordId = "11111111-1111-4111-8111-111111111111";

  Object.assign(process.env, {
    SUPABASE_URL: "https://example.supabase.co",
    SUPABASE_SERVICE_ROLE_KEY: "test-service-role-key",
    SUPABASE_STORAGE_BUCKET: "trueprint-requirement-files",
    TURNSTILE_SECRET_KEY: "test-turnstile-secret",
    TURNSTILE_ALLOWED_HOSTNAMES: "localhost",
  });

  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init });

    if (url === "https://challenges.cloudflare.com/turnstile/v0/siteverify") {
      return Response.json({ success: true, action: "source_request", hostname: "localhost" });
    }
    if (url.includes("/storage/v1/object/trueprint-requirement-files/source-requests/")) {
      return Response.json({ Key: "uploaded" }, { status: 200 });
    }
    if (url === "https://example.supabase.co/rest/v1/source_requests") {
      return Response.json([{ id: recordId }], { status: 201 });
    }
    throw new Error(`Unexpected external request: ${url}`);
  };

  try {
    const form = new FormData();
    form.set("name", "Test Person");
    form.set("email", "test@example.com");
    form.set("phone", "+91 9876543210");
    form.set("organization", "Example Company");
    form.set("requirement", "Please source a custom object based on this photograph.");
    form.set("source_page", "/");
    form.set("turnstile_token", "verified-token");
    form.set("reference", new File([new Uint8Array([1, 2, 3])], "reference.png", { type: "image/png" }));

    const response = await worker.fetch(
      new Request("http://localhost/api/forms/source-request", { method: "POST", body: form }),
      runtimeEnv(),
      executionContext,
    );

    assert.equal(response.status, 201);
    assert.deepEqual(await response.json(), { ok: true, id: recordId });
    assert.equal(calls.length, 3);

    const inserted = JSON.parse(calls[2].init.body);
    assert.equal(inserted.requirement, "Please source a custom object based on this photograph.");
    assert.equal(inserted.reference_file_name, "reference.png");
    assert.equal(inserted.reference_file_type, "image/png");
    assert.equal(inserted.reference_file_size, 3);
    assert.match(inserted.reference_file_path, /^source-requests\//);
  } finally {
    globalThis.fetch = originalFetch;
    for (const key of environmentKeys) {
      const value = originalEnvironment[key];
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});
