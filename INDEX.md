# ET University Platform - Documentation Index

Welcome to the ET University Platform documentation. This enterprise-grade, Ethiopia-ready, multi-tenant university platform is designed for scale, accessibility, and local context.

## 📋 Planning & Architecture

### Core Documentation
- **[Architecture Overview](./ARCHITECTURE.md)** - System architecture, container diagrams, and technical design
- **[Build Log](./BUILDLOG.md)** - Development progress, assumptions, risks, and decisions
- **[Roadmap](./ROADMAP.md)** - 90-day development plan with phases and milestones

### Quick Links
- **[README](./README.md)** - Project overview and getting started guide
- **[License](./LICENSE)** - Apache 2.0 license terms

## 🏗️ Development

### Getting Started
```bash
# Clone and setup
git clone <repo-url>
cd et-university-platform
pnpm install

# Start development
pnpm dev

# Run tests
pnpm test
```

### Project Structure
```
et-university-platform/
├── apps/
│   ├── web-portal/          # Next.js frontend
│   └── bff/                 # NestJS GraphQL BFF
├── packages/
│   ├── i18n/                # Internationalization
│   └── ethiopian-calendar/  # Ethiopian calendar utilities
├── services/
│   ├── enrollment/          # Student enrollment service
│   ├── billing/             # Billing and invoicing
│   ├── payments-adapter/    # Mobile money integration
│   ├── notifications/       # Multi-channel notifications
│   ├── ussd-sms/           # USSD/SMS fallback service
│   └── degree-audit-stub/   # Academic progress tracking
└── infra/
    └── docker-compose.yml   # Local development infrastructure
```

## 🌍 Ethiopia-Ready Features

### Localization
- **Languages**: Amharic (አማርኛ) and English
- **Calendar**: Ethiopian calendar support with Gregorian conversion
- **Typography**: Noto Sans Ethiopic font integration
- **Currency**: Ethiopian Birr (ETB) formatting

### Connectivity & Payments
- **Mobile Money**: Telebirr and M-Pesa integration
- **Offline Support**: USSD codes and SMS fallbacks
- **Performance**: Optimized for 3G networks and low-end devices
- **Progressive Web App**: Offline-first architecture

### Accessibility
- **WCAG 2.2 AA**: Full compliance with accessibility standards
- **Screen Readers**: Optimized for assistive technologies
- **Keyboard Navigation**: Complete keyboard accessibility
- **High Contrast**: Support for visual impairments

## 🏛️ Multi-Tenant Architecture

### University Management
- **Multi-University**: Support for multiple institutions
- **Multi-Campus**: Campus-level organization and management
- **Data Isolation**: Secure tenant separation
- **Custom Branding**: University-specific theming

### Role-Based Access Control
- **RBAC + ABAC**: Role and attribute-based permissions
- **University Hierarchy**: Admin → Faculty → Staff → Student
- **Campus Permissions**: Campus-specific access controls
- **Audit Trails**: Comprehensive activity logging

## 🔧 Technical Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS + shadcn/ui components
- **Internationalization**: next-intl
- **Testing**: Jest + Playwright + jest-axe

### Backend
- **BFF**: NestJS + Apollo GraphQL
- **Services**: NestJS microservices
- **Database**: PostgreSQL 15 + Prisma ORM
- **Cache**: Redis 7
- **Authentication**: Keycloak (OIDC/SAML)
- **Authorization**: Cerbos (ABAC/RBAC)

### Infrastructure
- **Containerization**: Docker + Kubernetes
- **Cloud**: AWS af-south-1 (pilot)
- **CI/CD**: GitHub Actions
- **Monitoring**: OpenTelemetry + Prometheus + Grafana
- **Security**: CodeQL, gitleaks, Trivy scanning

## 📊 Performance Targets

- **Web Performance**: p95 TTI < 2.5s on 3G networks
- **API Performance**: p95 read operations < 800ms
- **Availability**: 99.5% uptime for core services
- **Accessibility**: WCAG 2.2 AA compliance

## 🚀 Current Status

**Phase 0: Enterprise Bootstrap** ✅ **COMPLETED**
- Monorepo structure established
- Core tooling configured
- Documentation created
- CI/CD pipeline ready

## 🎯 Next Steps

**Ready for Phase 1: Identity & Authentication**

The platform foundation is complete and ready for the next development phase. Phase 1 will focus on:
- Keycloak integration for authentication
- Cerbos setup for authorization
- Multi-tenant user management
- Security middleware implementation

---

## 📞 Support & Contributing

- **Issues**: Report bugs and feature requests via GitHub Issues
- **Contributing**: See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines
- **Security**: Report security issues via [SECURITY.md](./SECURITY.md)
- **Code of Conduct**: [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)

---

*Last updated: Phase 0 completion - Ready for Phase 1*
