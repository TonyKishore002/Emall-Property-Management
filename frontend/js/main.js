const API = "http://localhost:5000/api";

// ======================
// DASHBOARD
// ======================

async function loadDashboard() {
  try {
    const ownersResponse = await fetch(`${API}/owners`);
    const ownersData = await ownersResponse.json();

    const tenantsResponse = await fetch(`${API}/tenants`);
    const tenantsData = await tenantsResponse.json();

    const propertiesResponse = await fetch(`${API}/properties`);
    const propertiesData = await propertiesResponse.json();

    const leasesResponse = await fetch(`${API}/leases`);
    const leasesData = await leasesResponse.json();

    const rentResponse = await fetch(`${API}/rent`);
    const rentData = await rentResponse.json();

    const maintenanceResponse = await fetch(`${API}/maintenance`);
    const maintenanceData = await maintenanceResponse.json();

    const ownerCountElement = document.getElementById("ownerCount");
    if (ownerCountElement) ownerCountElement.innerText = ownersData.length;

    const propertyCountElement = document.getElementById("propertyCount");
    if (propertyCountElement) propertyCountElement.innerText = propertiesData.length;

    const tenantCountElement = document.getElementById("tenantCount");
    if (tenantCountElement) tenantCountElement.innerText = tenantsData.length;

    const totalRent = rentData.reduce((sum, payment) => sum + Number(payment.amount || 0), 0);
    const rentTotalElement = document.getElementById("rentTotal");
    if (rentTotalElement) rentTotalElement.innerText = `₹${totalRent}`;

    const occupancy = propertiesData.length ? Math.round((leasesData.length / propertiesData.length) * 100) : 0;
    const occupancyBarElement = document.getElementById("occupancyBar");
    if (occupancyBarElement) occupancyBarElement.style.setProperty("width", `${occupancy}%`);

    const occupancyTextElement = document.getElementById("occupancyText");
    if (occupancyTextElement) occupancyTextElement.innerText = `${occupancy}% Occupied`;

    const maintenanceCountElement = document.getElementById("maintenanceCount");
    if (maintenanceCountElement) maintenanceCountElement.innerText = maintenanceData.length;
  } catch (err) {
    console.error("Dashboard error", err);
  }
}

// ======================
// OWNER
// ======================

async function addOwner() {
  const name = document.getElementById("owner_name").value;
  const phone = document.getElementById("owner_phone").value;
  const email = document.getElementById("owner_email").value;

  if (!name || !phone || !email) {
    alert("All fields required");
    return;
  }

  await fetch(`${API}/owners`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner_name: name, phone, email }),
  });

  document.getElementById("owner_name").value = "";
  document.getElementById("owner_phone").value = "";
  document.getElementById("owner_email").value = "";

  loadOwners();
  loadDashboard();
}

async function loadOwners() {
  const res = await fetch(`${API}/owners`);
  const data = await res.json();
  const table = document.getElementById("ownerTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((o) => {
    table.innerHTML += `
      <tr>
        <td>${o.owner_name}</td>
        <td>${o.phone || "N/A"}</td>
        <td>${o.email || "N/A"}</td>
      </tr>
    `;
  });

  if (typeof populateOwnerOptions === "function") populateOwnerOptions();
}

// ======================
// TENANT
// ======================

async function addTenant() {
  const tenant_name = document.getElementById("tenant_name").value;
  const business_type = document.getElementById("business_type").value;
  const tenant_phone = document.getElementById("tenant_phone").value;

  if (!tenant_name || !business_type || !tenant_phone) {
    alert("All fields required");
    return;
  }

  await fetch(`${API}/tenants`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tenant_name, business_type, phone: tenant_phone }),
  });

  document.getElementById("tenant_name").value = "";
  document.getElementById("business_type").value = "";
  document.getElementById("tenant_phone").value = "";

  loadTenants();
  loadDashboard();
}

async function loadTenants() {
  const res = await fetch(`${API}/tenants`);
  const data = await res.json();
  const table = document.getElementById("tenantTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((tenant) => {
    table.innerHTML += `
      <tr>
        <td>${tenant.tenant_name}</td>
        <td>${tenant.business_type}</td>
        <td>${tenant.phone}</td>
      </tr>
    `;
  });

  if (typeof populateTenantOptions === "function") populateTenantOptions();
}

async function populateOwnerOptions() {
  const res = await fetch(`${API}/owners`);
  const data = await res.json();
  const select = document.getElementById("owner_id");
  if (!select) return;
  select.innerHTML = `<option value="">Select Owner</option>`;
  data.forEach((owner) => {
    select.innerHTML += `<option value="${owner._id}">${owner.owner_name} (${owner._id.slice(0, 6)})</option>`;
  });
}

async function populatePropertyOptions() {
  const res = await fetch(`${API}/properties`);
  const data = await res.json();
  const select = document.getElementById("property_id");
  if (!select) return;
  select.innerHTML = `<option value="">Select Property</option>`;
  data.forEach((property) => {
    const ownerName = property.owner_id?.owner_name || "Unknown";
    select.innerHTML += `<option value="${property._id}">${property.shop_number} - ${ownerName}</option>`;
  });
}

async function populateTenantOptions() {
  const res = await fetch(`${API}/tenants`);
  const data = await res.json();
  const select = document.getElementById("tenant_id");
  if (!select) return;
  select.innerHTML = `<option value="">Select Tenant</option>`;
  data.forEach((tenant) => {
    select.innerHTML += `<option value="${tenant._id}">${tenant.tenant_name} (${tenant.business_type})</option>`;
  });
}

async function populateLeaseOptions() {
  const res = await fetch(`${API}/leases`);
  const data = await res.json();
  const select = document.getElementById("lease_id");
  if (!select) return;
  select.innerHTML = `<option value="">Select Lease</option>`;
  data.forEach((lease) => {
    const propertyLabel = lease.property_id?.shop_number || lease.property_id?._id || "N/A";
    const tenantLabel = lease.tenant_id?.tenant_name || lease.tenant_id?._id || "N/A";
    select.innerHTML += `<option value="${lease._id}">${propertyLabel} - ${tenantLabel}</option>`;
  });
}

// ======================
// PROPERTY
// ======================

async function addProperty() {
  const owner_id = document.getElementById("owner_id").value;
  const shop_number = document.getElementById("shop_number").value;
  const floor = document.getElementById("floor").value;
  const rent_price = document.getElementById("rent_price").value;

  if (!owner_id || !shop_number || !floor || !rent_price) {
    alert("All fields required");
    return;
  }

  const propertyRes = await fetch(`${API}/properties`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ owner_id, shop_number, floor, rent_price }),
  });

  if (!propertyRes.ok) {
    const errorText = await propertyRes.text();
    alert(`Property save failed: ${errorText}`);
    return;
  }

  document.getElementById("owner_id").value = "";
  document.getElementById("shop_number").value = "";
  document.getElementById("floor").value = "";
  document.getElementById("rent_price").value = "";

  loadProperties();
  loadDashboard();
}

async function loadProperties() {
  const res = await fetch(`${API}/properties`);
  const data = await res.json();
  const table = document.getElementById("propertyTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((property) => {
    const ownerName = property.owner_id?.owner_name || property.owner_id || "Unknown";
    table.innerHTML += `
      <tr>
        <td>${ownerName}</td>
        <td>${property.shop_number}</td>
        <td>${property.floor}</td>
        <td>₹${property.rent_price}</td>
      </tr>
    `;
  });

  if (typeof populatePropertyOptions === "function") populatePropertyOptions();
}

async function addLease() {
  const property_id = document.getElementById("property_id").value;
  const tenant_id = document.getElementById("tenant_id").value;
  const lease_start = document.getElementById("lease_start").value;
  const lease_end = document.getElementById("lease_end").value;

  if (!property_id || !tenant_id || !lease_start || !lease_end) {
    alert("All fields required");
    return;
  }

  const leaseRes = await fetch(`${API}/leases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ property_id, tenant_id, lease_start, lease_end }),
  });

  if (!leaseRes.ok) {
    const errorText = await leaseRes.text();
    alert(`Lease save failed: ${errorText}`);
    return;
  }

  document.getElementById("property_id").value = "";
  document.getElementById("tenant_id").value = "";
  document.getElementById("lease_start").value = "";
  document.getElementById("lease_end").value = "";

  loadLeases();
  loadDashboard();
}

// ======================
// LEASES

async function loadLeases() {
  const res = await fetch(`${API}/leases`);
  const data = await res.json();
  const table = document.getElementById("leaseTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((lease) => {
    const propertyLabel = lease.property_id?.shop_number
      ? `${lease.property_id.shop_number} (${lease.property_id._id})`
      : lease.property_id?._id || "N/A";
    const tenantLabel = lease.tenant_id?.tenant_name || lease.tenant_id?._id || "N/A";
    const startDate = lease.lease_start ? new Date(lease.lease_start).toLocaleDateString() : "N/A";
    const endDate = lease.lease_end ? new Date(lease.lease_end).toLocaleDateString() : "N/A";

    table.innerHTML += `
      <tr>
        <td>${propertyLabel}</td>
        <td>${tenantLabel}</td>
        <td>${startDate}</td>
        <td>${endDate}</td>
      </tr>
    `;
  });

  if (typeof populateLeaseOptions === "function") populateLeaseOptions();
}

// ======================
// RENT
// ======================

async function addRent() {
  const lease_id = document.getElementById("lease_id").value;
  const amount = document.getElementById("amount").value;
  const status = document.getElementById("status").value;

  if (!lease_id || !amount) {
    alert("All fields required");
    return;
  }

  const rentRes = await fetch(`${API}/rent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      lease_id,
      payment_date: new Date().toISOString(),
      amount,
      payment_status: status,
    }),
  });

  if (!rentRes.ok) {
    const errorText = await rentRes.text();
    alert(`Rent save failed: ${errorText}`);
    return;
  }

  document.getElementById("lease_id").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("status").value = "";

  loadRent();
  loadDashboard();
}

async function loadRent() {
  const res = await fetch(`${API}/rent`);
  const data = await res.json();
  const table = document.getElementById("rentTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((payment) => {
    const lease = payment.lease_id;
    const leaseLabel = lease?.property_id?.shop_number
      ? `${lease.property_id.shop_number} - ${lease.tenant_id?.tenant_name || lease.tenant_id?._id || "N/A"}`
      : lease?._id || "N/A";
    const paymentDate = payment.payment_date ? new Date(payment.payment_date).toLocaleDateString() : "N/A";
    table.innerHTML += `
      <tr>
        <td>${leaseLabel}</td>
        <td>₹${payment.amount}</td>
        <td>${payment.payment_status}</td>
      </tr>
    `;
  });
}

// ======================
// MAINTENANCE
// ======================

async function addMaintenance() {
  const property_id = document.getElementById("property_id").value;
  const issue = document.getElementById("issue").value;
  const status = document.getElementById("status").value;

  if (!property_id || !issue) {
    alert("All fields required");
    return;
  }

  const maintenanceRes = await fetch(`${API}/maintenance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      property_id,
      request_date: new Date().toISOString(),
      issue_description: issue,
      status,
    }),
  });

  if (!maintenanceRes.ok) {
    const errorText = await maintenanceRes.text();
    alert(`Maintenance save failed: ${errorText}`);
    return;
  }

  document.getElementById("property_id").value = "";
  document.getElementById("issue").value = "";
  document.getElementById("status").value = "";

  loadMaintenance();
  loadDashboard();
}

async function loadMaintenance() {
  const res = await fetch(`${API}/maintenance`);
  const data = await res.json();
  const table = document.getElementById("maintenanceTable");
  if (!table) return;

  table.innerHTML = "";
  data.forEach((request) => {
    const property = request.property_id;
    const propertyLabel = property?.shop_number
      ? `${property.shop_number} (${property._id})`
      : property?._id || "N/A";
    table.innerHTML += `
      <tr>
        <td>${propertyLabel}</td>
        <td>${request.issue_description}</td>
        <td>${request.status}</td>
      </tr>
    `;
  });
}

// ======================
// PAGE LOAD
// ======================

window.onload = function () {
  loadDashboard();

  if (typeof populateOwnerOptions === "function") populateOwnerOptions();
  if (typeof populatePropertyOptions === "function") populatePropertyOptions();
  if (typeof populateTenantOptions === "function") populateTenantOptions();
  if (typeof populateLeaseOptions === "function") populateLeaseOptions();

  if (typeof loadOwners === "function") loadOwners();
  if (typeof loadTenants === "function") loadTenants();
  if (typeof loadProperties === "function") loadProperties();
  if (typeof loadLeases === "function") loadLeases();
  if (typeof loadRent === "function") loadRent();
  if (typeof loadMaintenance === "function") loadMaintenance();
};
