// ======================
// DASHBOARD COUNTS
// ======================

async function loadDashboardCounts(){

try{

// Owners
const ownersRes = await fetch("http://localhost:5000/api/owners");
const owners = await ownersRes.json();
document.getElementById("ownersCount").innerText = owners.length;


// Properties
const propRes = await fetch("http://localhost:5000/api/properties");
const properties = await propRes.json();
document.getElementById("propertiesCount").innerText = properties.length;


// Tenants
const tenantsRes = await fetch("http://localhost:5000/api/tenants");
const tenants = await tenantsRes.json();
document.getElementById("tenantsCount").innerText = tenants.length;


// Maintenance
const maintRes = await fetch("http://localhost:5000/api/maintenance");
const maintenance = await maintRes.json();
document.getElementById("maintenanceCount").innerText = maintenance.length;

}catch(err){
console.log("Dashboard load error", err);
}

}
const API = "http://localhost:5000/api";


// ======================
// ADD OWNER
// ======================

async function addOwner(){

const name = document.getElementById("owner_name").value;
const phone = document.getElementById("owner_phone").value;
const email = document.getElementById("owner_email").value;

await fetch(`${API}/owners`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({name, phone, email})
});

clearOwnerInputs();
loadOwners();
}


// ======================
// CLEAR OWNER INPUTS
// ======================

function clearOwnerInputs(){

document.getElementById("owner_name").value="";
document.getElementById("owner_phone").value="";
document.getElementById("owner_email").value="";

}


// ======================
// LOAD OWNERS LIST
// ======================

async function loadOwners(){

const res = await fetch(`${API}/owners`);
const data = await res.json();

const table = document.getElementById("ownerTable");

if(!table) return;

table.innerHTML="";

data.forEach(owner => {

table.innerHTML += `
<tr>
<td>${owner.name}</td>
<td>${owner.phone}</td>
<td>${owner.email}</td>
</tr>
`;

});

}



// ======================
// ADD TENANT
// ======================

async function addTenant(){

const tenant_name = document.getElementById("tenant_name").value;
const business_type = document.getElementById("business_type").value;
const tenant_phone = document.getElementById("tenant_phone").value;

await fetch(`${API}/tenants`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({tenant_name, business_type, tenant_phone})
});

clearTenantInputs();
loadTenants();

}



// ======================
// CLEAR TENANT INPUTS
// ======================

function clearTenantInputs(){

document.getElementById("tenant_name").value="";
document.getElementById("business_type").value="";
document.getElementById("tenant_phone").value="";

}



// ======================
// LOAD TENANTS
// ======================

async function loadTenants(){

const res = await fetch(`${API}/tenants`);
const data = await res.json();

const table = document.getElementById("tenantTable");

if(!table) return;

table.innerHTML="";

data.forEach(t => {

table.innerHTML += `
<tr>
<td>${t.tenant_name}</td>
<td>${t.business_type}</td>
<td>${t.tenant_phone}</td>
</tr>
`;

});

}



// ======================
// ADD PROPERTY
// ======================

async function addProperty(){

const owner_id = document.getElementById("owner_id").value;
const shop_number = document.getElementById("shop_number").value;
const floor = document.getElementById("floor").value;
const rent_price = document.getElementById("rent_price").value;

await fetch(`${API}/properties`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({owner_id, shop_number, floor, rent_price})
});

document.getElementById("owner_id").value="";
document.getElementById("shop_number").value="";
document.getElementById("floor").value="";
document.getElementById("rent_price").value="";

alert("Property Added");

}
async function loadDashboard(){

/* OWNERS COUNT */

let owners = await fetch("http://localhost:5000/owners")
let ownerData = await owners.json()

document.getElementById("ownerCount").innerText = ownerData.length


/* PROPERTIES COUNT */

let properties = await fetch("http://localhost:5000/properties")
let propertyData = await properties.json()

document.getElementById("propertyCount").innerText = propertyData.length


/* TENANTS COUNT */

let tenants = await fetch("http://localhost:5000/tenants")
let tenantData = await tenants.json()

document.getElementById("tenantCount").innerText = tenantData.length


/* RENT TOTAL */

let rent = await fetch("http://localhost:5000/rent")
let rentData = await rent.json()

let totalRent = 0

rentData.forEach(r=>{
totalRent += Number(r.amount)
})

document.getElementById("rentTotal").innerText = "₹" + totalRent


/* OCCUPANCY */

let occupancy = (tenantData.length / propertyData.length) * 100

if(!isNaN(occupancy)){
document.getElementById("occupancyBar").style.width = occupancy + "%"
document.getElementById("occupancyText").innerText = Math.round(occupancy) + "% Occupied"
}

}



// ======================
// ADD LEASE
// ======================

async function addLease(){

const property_id = document.getElementById("property_id").value;
const tenant_id = document.getElementById("tenant_id").value;
const lease_start = document.getElementById("lease_start").value;
const lease_end = document.getElementById("lease_end").value;

await fetch(`${API}/leases`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({property_id, tenant_id, lease_start, lease_end})
});

document.getElementById("property_id").value="";
document.getElementById("tenant_id").value="";
document.getElementById("lease_start").value="";
document.getElementById("lease_end").value="";

alert("Lease Created");

}



// ======================
// ADD RENT
// ======================

async function addRent(){

const lease_id = document.getElementById("lease_id").value;
const amount = document.getElementById("amount").value;
const status = document.getElementById("status").value;

await fetch(`${API}/rent`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({lease_id, amount, status})
});

document.getElementById("lease_id").value="";
document.getElementById("amount").value="";

alert("Payment Added");

}



// ======================
// ADD MAINTENANCE
// ======================

async function addMaintenance(){

const property_id = document.getElementById("property_id").value;
const issue = document.getElementById("issue").value;
const status = document.getElementById("status").value;

await fetch(`${API}/maintenance`,{
method:"POST",
headers:{ "Content-Type":"application/json"},
body: JSON.stringify({property_id, issue, status})
});

document.getElementById("property_id").value="";
document.getElementById("issue").value="";

alert("Request Submitted");

}
async function loadRent(){

const res = await fetch("http://localhost:5000/rent");

const data = await res.json();

let table = document.getElementById("rentTable");

table.innerHTML="";

data.forEach(r => {

table.innerHTML += `
<tr>
<td>${r.lease_id}</td>
<td>₹${r.amount}</td>
<td>${r.status}</td>
</tr>
`;

});

}
function loadDashboard(){

/* Example numbers */

let owners=5
let properties=20
let tenants=15
let rent=75000

document.getElementById("ownerCount").innerText=owners
document.getElementById("propertyCount").innerText=properties
document.getElementById("tenantCount").innerText=tenants
document.getElementById("rentTotal").innerText="₹"+rent


/* OCCUPANCY */

let occupancy=(tenants/properties)*100

document.getElementById("occupancyBar").style.width=occupancy+"%"

document.getElementById("occupancyText").innerText=
Math.round(occupancy)+"% Occupied"



/* RENT CHART */

let ctx=document.getElementById("rentChart")

new Chart(ctx,{

type:"bar",

data:{

labels:["Jan","Feb","Mar","Apr","May","Jun"],

datasets:[{

label:"Rent Collected",

data:[12000,15000,10000,18000,20000,17000]

}]

},

options:{

responsive:true

}

})

}