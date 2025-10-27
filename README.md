# ParentCare Multi-Service App (parent-care-app)

This is a full-stack MERN (MongoDB, Express, React, Node.js) application built to serve as a comprehensive local service platform. The main idea is to connect users who need specific, real-world services with verified local providers.

This project is built to support three main service categories:

1.  **Day Consultancy (Elderly Care):** (This feature is **fully built and deployed!**) This service connects families with caregivers for their distant parents. Requesters (the children) can post help requests (e.g., "Need to take my mom to the hospital") or browse and directly hire local Providers (caregivers) to assist their parents.

2.  **Object Delivery:** (Future Feature) A local, on-demand courier service for users to send or receive packages.

3.  **Ride Share:** (Future Feature) A peer-to-peer ride-sharing service for booking rides within the city.

## Features (Day Consultancy)

* **Dual User Roles:** Separate registration and dashboards for "Requesters" (families) and "Providers" (caregivers).
* **Secure Authentication:** Full JWT (JSON Web Token) authentication flow with password hashing (bcrypt).
* **Role-Based Dashboards:** The UI dynamically changes based on the user's role.
* **Requester Flow:**
    * Add and manage "Beneficiaries" (e.g., parents).
    * Post public help requests to a job board.
    * Browse a directory of verified providers.
    * Send direct invitations to specific providers.
* **Provider Flow:**
    * View all available public jobs on a job board.
    * View and accept direct invitations.
    * Manage accepted jobs.

## Tech Stack

* **Frontend:** React (Vite), React Router, Axios, Material-UI (MUI)
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (using Mongoose)
* **Authentication:** JSON Web Tokens (JWT), bcrypt.js

---

## Brief Guidance: How to Handle This Project

Here is a brief guide to get this project running on your local machine.

### Prerequisites

* [Node.js](https://nodejs.org/)
* [Git](https://git-scm.com/)
* A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)

### Step 1: Clone the Repository

```bash
git clone [https://github.com/gandikotanarasimha/parent-care-app.git](https://github.com/gandikotanarasimha/parent-care-app.git)
cd parent-care-app
