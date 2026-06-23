# Requirement Document - Helpdesk Ticket Management

## 1. Business Objective
The organization needs a helpdesk application where employees can raise support tickets and the support team can track, prioritize, assign, and close tickets.

## 2. Business Problem
Currently support requests come through email/chat, so teams face:
- Missing tickets
- No priority visibility
- No owner tracking
- Delayed resolution
- No ticket status history

## 3. User Roles

| Role | Responsibility |
|---|---|
| Employee | Raise support ticket |
| Support Agent | Work on assigned tickets |
| Support Manager | Monitor SLA, priority, and pending tickets |
| Admin | Manage categories and agents |

## 4. Functional Requirements

### FR-001: Create Ticket
User should be able to create a support ticket with title, category, priority, requester, and description.

### FR-002: View Ticket List
System should show all tickets with ticket ID, title, category, priority, assigned agent, status, and created date.

### FR-003: Search Ticket
User should search tickets by title, requester, category, status, or priority.

### FR-004: Filter by Status
User should filter tickets by New, In Progress, Resolved, or Closed.

### FR-005: Assign Ticket
Support manager should assign a ticket to an agent.

### FR-006: Update Ticket Status
Support agent should update ticket status.

Allowed statuses:
- New
- In Progress
- Resolved
- Closed

### FR-007: Priority Management
Ticket priority should be Low, Medium, High, or Critical.

### FR-008: Dashboard Summary
System should show total tickets, open tickets, resolved tickets, and critical tickets.

### FR-009: Validation
System should not allow ticket creation if mandatory fields are missing.

Mandatory fields:
- Title
- Category
- Priority
- Requester
- Description

## 5. Non-Functional Requirements

| Requirement | Description |
|---|---|
| Performance | Ticket list should load quickly for 1,000 records |
| Usability | UI should be simple for support team |
| Security | Employees can create tickets; agents can update tickets |
| Audit | Status updates should be trackable in production |
| Availability | System should be available during business hours |

## 6. Sample Real-Time Scenario
Employee Anjali reports: "VPN is not connecting."  
System creates ticket HD-1001 with category Network and priority High.  
Manager assigns it to Ravi. Ravi updates status to In Progress and later Resolved.
