# Architecture Overview

## Context

Enterprise Ethiopia-ready multi-tenant university platform designed for:
- Multiple universities and campuses (multi-tenancy)
- Ethiopian context: Amharic/English, Ethiopian calendar, mobile money
- Accessibility: WCAG 2.2 AA compliance
- Performance: 3G networks, low-end devices
- Resilience: Intermittent connectivity, USSD/SMS fallbacks

## Container Diagram (ASCII)

```
┌─────────────────────────────────────────────────────────────────┐
│                        ET University Platform                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │ Web Portal  │    │     BFF     │    │    Microservices    │  │
│  │ (Next.js)   │◄──►│ (NestJS +   │◄──►│                     │  │
│  │             │    │  GraphQL)   │    │ • Enrollment        │  │
│  │ • Dashboard │    │             │    │ • Billing           │  │
│  │ • i18n      │    │ • Auth      │    │ • Payments Adapter  │  │
│  │ • A11y      │    │ • CORS      │    │ • Notifications     │  │
│  └─────────────┘    │ • Health    │    │ • USSD/SMS          │  │
│                     └─────────────┘    │ • Degree Audit      │  │
│                                        └─────────────────────┘  │
│                                                                 │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────────────┐  │
│  │ PostgreSQL  │    │    Redis    │    │    External APIs    │  │
│  │ (Primary)   │    │ (Cache)     │    │                     │  │
│  │             │    │             │    │ • Keycloak (IAM)    │  │
│  │ • Multi-DB  │    │ • Sessions  │    │ • Cerbos (ABAC)     │  │
│  │ • Audit     │    │ • Cache     │    │ • Telebirr/M-Pesa   │  │
│  └─────────────┘    └─────────────┘    │ • SMS Gateway       │  │
│                                        └─────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

## Target Architecture

### Frontend Layer
- **Web Portal**: Next.js 14 with App Router, Tailwind + shadcn/ui
- **Internationalization**: next-intl (Amharic/English)
- **Typography**: Noto Sans Ethiopic for Amharic support
- **Accessibility**: jest-axe testing, WCAG 2.2 AA compliance

### API Layer
- **BFF (Backend for Frontend)**: NestJS + Apollo GraphQL
- **Authentication**: OIDC/SAML via Keycloak integration
- **Authorization**: RBAC/ABAC via Cerbos integration

### Service Layer (Microservices)
- **Enrollment Service**: Student registration, course enrollment
- **Billing Service**: Fee calculation, invoicing
- **Payments Adapter**: Mobile money integration (Telebirr, M-Pesa)
- **Notifications Service**: Email, SMS, push notifications
- **USSD/SMS Service**: Offline access via USSD codes
- **Degree Audit Service**: Academic progress tracking

### Data Layer
- **PostgreSQL 15**: Primary database with multi-tenant schema
- **Redis 7**: Caching, sessions, real-time data
- **Future**: Kafka/Redpanda for event streaming, S3/MinIO for files

### Infrastructure
- **Containerization**: Docker + Kubernetes
- **Cloud**: AWS af-south-1 (pilot), on-premises parity
- **Observability**: OpenTelemetry, Prometheus, Grafana
- **CI/CD**: GitHub Actions with security scanning

## Domain Boundaries

1. **Identity & Access Management**: User authentication, authorization, RBAC/ABAC
2. **Academic Management**: Courses, programs, curriculum, scheduling
3. **Student Lifecycle**: Enrollment, registration, academic records
4. **Financial Management**: Billing, payments, financial aid
5. **Communication**: Notifications, messaging, USSD/SMS
6. **Reporting & Analytics**: Academic analytics, operational metrics
7. **Integration**: External systems, mobile money, SMS gateways

## Non-Functional Requirements

- **Performance**: p95 web TTI < 2.5s on 3G, p95 API read < 800ms
- **Availability**: 99.5% core services uptime
- **Accessibility**: WCAG 2.2 AA compliance
- **Security**: OWASP compliance, secrets scanning, vulnerability management
- **Scalability**: Multi-tenant architecture, horizontal scaling
- **Resilience**: Graceful degradation, offline capabilities
