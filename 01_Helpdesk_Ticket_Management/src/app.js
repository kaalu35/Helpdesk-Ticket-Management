const tickets = [
  {
    "ticketId": "HD-1001",
    "title": "VPN not connecting",
    "requester": "Anjali Rao",
    "category": "Network",
    "priority": "High",
    "assignedTo": "Ravi Kumar",
    "status": "In Progress",
    "createdDate": "2026-06-18",
    "description": "VPN disconnects after login."
  },
  {
    "ticketId": "HD-1002",
    "title": "Laptop screen flickering",
    "requester": "Manoj R",
    "category": "Hardware",
    "priority": "Medium",
    "assignedTo": "Priya N",
    "status": "New",
    "createdDate": "2026-06-19",
    "description": "Screen flickers while using Teams."
  },
  {
    "ticketId": "HD-1003",
    "title": "Payroll portal access issue",
    "requester": "Kavya S",
    "category": "Application",
    "priority": "Critical",
    "assignedTo": "Suresh P",
    "status": "Resolved",
    "createdDate": "2026-06-17",
    "description": "Unable to access payroll portal before salary cut-off."
  },
  {
    "ticketId": "HD-1004",
    "title": "Email not syncing",
    "requester": "Rahul M",
    "category": "Email",
    "priority": "Low",
    "assignedTo": "Meena K",
    "status": "Closed",
    "createdDate": "2026-06-15",
    "description": "Outlook mobile sync issue."
  }
];

const rows = document.getElementById("rows");
const search = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");

function badge(value) {
  const lower = value.toLowerCase();
  let cls = "info";
  if (lower.includes("critical")) cls = "danger-badge";
  if (lower.includes("resolved") || lower.includes("closed")) cls = "success";
  if (lower.includes("high") || lower.includes("progress") || lower.includes("new")) cls = "warning";
  return `<span class="badge ${cls}">${value}</span>`;
}

function render() {
  const q = search.value.toLowerCase();
  const st = statusFilter.value;
  const filtered = tickets.filter(t =>
    (!st || t.status === st) &&
    [t.ticketId,t.title,t.requester,t.category,t.priority,t.assignedTo,t.status].join(" ").toLowerCase().includes(q)
  );

  document.getElementById("total").textContent = filtered.length;
  document.getElementById("open").textContent = filtered.filter(t => ["New","In Progress"].includes(t.status)).length;
  document.getElementById("resolved").textContent = filtered.filter(t => t.status === "Resolved").length;
  document.getElementById("critical").textContent = filtered.filter(t => t.priority === "Critical").length;

  rows.innerHTML = "";
  document.getElementById("empty").style.display = filtered.length ? "none" : "block";
  filtered.forEach(t => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${t.ticketId}</td><td><b>${t.title}</b><br><small>${t.description}</small></td><td>${t.requester}</td><td>${t.category}</td><td>${badge(t.priority)}</td><td>${t.assignedTo || "-"}</td><td>${badge(t.status)}</td><td><button class="secondary" data-id="${t.ticketId}">Next Status</button></td>`;
    tr.querySelector("button").onclick = () => nextStatus(t.ticketId);
    rows.appendChild(tr);
  });
}

function nextStatus(id) {
  const t = tickets.find(x => x.ticketId === id);
  const flow = ["New","In Progress","Resolved","Closed"];
  const idx = flow.indexOf(t.status);
  t.status = flow[Math.min(idx + 1, flow.length - 1)];
  render();
}

document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();
  const item = {
    ticketId: `HD-${1000 + tickets.length + 1}`,
    title: title.value.trim(),
    requester: requester.value.trim(),
    category: category.value,
    priority: priority.value,
    assignedTo: assignedTo.value.trim() || "Unassigned",
    status: "New",
    createdDate: new Date().toISOString().slice(0,10),
    description: description.value.trim()
  };
  tickets.push(item);
  e.target.reset();
  document.getElementById("msg").textContent = `Ticket ${item.ticketId} created successfully.`;
  render();
});

search.oninput = render;
statusFilter.onchange = render;
render();
