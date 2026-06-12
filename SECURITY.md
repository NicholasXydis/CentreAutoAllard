# Security Policy

## Scope

This repository contains the static frontend for **Centre D'Auto Allard**. There is no backend, database, authentication layer, or private API surface in this project. The attack surface is limited to the built static site and its deployment configuration (Docker, Nginx).

---

## Supported Versions

Only the current production branch is supported. No older versions receive security updates.

---

## Reporting a Vulnerability

If you discover a security issue, please report it **privately** rather than opening a public issue. Contact the repository owner directly with details of the issue.

Please include:

- A description of the issue and its potential impact
- The affected file(s) or configuration
- Steps to reproduce, if applicable

We'll acknowledge reports as soon as possible and follow up once the issue has been reviewed.

---

## Secrets and Configuration

Do not commit secrets, private keys, deployment credentials, API tokens, or populated `.env` files. Public, non-sensitive frontend configuration belongs in `.env.example` only.
