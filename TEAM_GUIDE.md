# 🛡️ ZYNTH SECURE: TEAM COLLABORATION GUIDE

Welcome to the team! This guide will help you get Zynth Secure running on your machine (Mac or Windows) so we can collaborate using Antigravity.

## 🚀 1. Setup Your Environment

### Prerequisites
- **Git**: [Download Here](https://git-scm.com/)
- **Node.js (v18+)**: [Download Here](https://nodejs.org/)
- **Docker Desktop**: [Download Here](https://www.docker.com/products/docker-desktop/) (Required for the Sentinel Cluster)

### Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/Sanskar-max-ai/zynth-secure
cd zynth-secure
```

### Install Dependencies
Run this in the root folder:
```bash
npm install
```

## 🔑 2. Syncing the Secrets (IMPORTANT)

The security keys are NOT on GitHub. Ask your teammate for the contents of the `.env.local` file and paste them into a new file named `.env.local` in your project root.

## 🤖 3. Working with Antigravity

We use Antigravity to build this project. Here is how we collaborate:

### Starting Your Day
Ask Antigravity: *"Sync me with the latest changes from GitHub."*
This runs `git pull` to get your teammate's work.

### Saving Your Work
When you finish a feature, tell Antigravity: *"Save my changes to GitHub with the message: [What you did]."*
This runs `git push` so your teammate can see it.

## 🐳 4. Launching the Sentinel Cluster

To run the deep-scan tools (Nmap/Nuclei), you must have Docker running. 
Ask Antigravity: *"Start the Sentinel Cluster."*
(Or run `docker-compose up` in the `scan-worker` folder).

---

**Happy Hacking! Let's build the best security engine together.** 💂‍♂️
