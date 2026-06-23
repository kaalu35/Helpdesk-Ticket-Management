# Design Document - Helpdesk Ticket Management

## 1. System Overview
The Helpdesk Ticket Management application tracks employee support requests from ticket creation to closure.

## 2. End-to-End Flow

```text
Employee raises ticket
        ↓
Ticket created with New status
        ↓
Support manager reviews ticket
        ↓
Ticket assigned to support agent
        ↓
Agent works on issue
        ↓
Agent marks ticket Resolved
        ↓
User confirms
        ↓
Ticket is Closed
```

## 3. UI Design

### Page: Helpdesk Dashboard
Sections:
1. Summary cards
2. Search and status filter
3. Ticket table
4. Create ticket form

## 4. Data Model

### Entity: Ticket

| Field | Type | Required |
|---|---|---|
| ticketId | String | Yes |
| title | String | Yes |
| requester | String | Yes |
| category | Picklist | Yes |
| priority | Picklist | Yes |
| assignedTo | String | No |
| status | Picklist | Yes |
| createdDate | Date | Yes |
| description | Text Area | Yes |

## 5. Business Rules

| Rule ID | Rule |
|---|---|
| BR-001 | New ticket should always start with New status |
| BR-002 | Critical tickets should be highlighted |
| BR-003 | Closed ticket should not be reopened without manager approval in production |
| BR-004 | Ticket cannot be created without title, requester, category, priority, and description |
| BR-005 | Open tickets include New and In Progress tickets |

## 6. API Design for Future Backend

| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/tickets | Create ticket |
| GET | /api/tickets | Get ticket list |
| PATCH | /api/tickets/{id}/status | Update status |
| PATCH | /api/tickets/{id}/assign | Assign ticket |
| GET | /api/tickets/summary | Dashboard summary |

## 7. Salesforce Mapping

| Salesforce Object | Purpose |
|---|---|
| Helpdesk_Ticket__c | Main ticket record |
| Ticket_Comment__c | Ticket comments/history |
| Support_Agent__c | Agent details |
| SLA_Policy__c | SLA rules |

## 8. Error Handling

| Scenario | Expected System Behavior |
|---|---|
| Mandatory field missing | Show validation error |
| No search result | Show empty state |
| Critical ticket created | Highlight priority badge |
| Invalid status | Do not update status |
