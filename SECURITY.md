# Security Policy

## Supported Version

| Version | Supported |
| ------- | --------- |
| 1.1.x   | Yes       |

Only the current production version is supported. No older versions receive security updates.

## Reporting a Vulnerability

Do not open a public issue for suspected vulnerabilities, leaked credentials, cross-site scripting, security-header bypasses, or production exposure.

Report security issues privately to the repository owner with:

- the affected page, component, dependency, or configuration
- reproduction steps
- expected impact
- relevant logs or screenshots with secrets removed

Valid reports will be reviewed as quickly as possible and prioritized based on severity and exploitability.

## Scope

In scope:

- cross-site scripting and unsafe client-side behavior
- Content Security Policy or security-header bypasses
- sensitive information or credential exposure
- vulnerable production dependencies
- Docker, Nginx, GitHub Actions, or deployment misconfiguration
- issues affecting the integrity or availability of the production website

Out of scope:

- denial-of-service testing against production without permission
- social engineering
- automated spam or abusive traffic
- reports requiring access to secrets, private keys, infrastructure, or accounts you do not own
- issues that apply only to unsupported browsers or modified client environments

This repository contains a statically exported website. It has no backend, database, authentication system, user accounts, or private API.
