# Ecommerce Dashboard

A React + TypeScript admin dashboard for managing an ecommerce business.

This repository is a frontend-focused project that demonstrates how ecommerce operations are managed from an admin panel: products, orders, customers, analytics, settings, and UI workflows.

## What Ecommerce Is

Ecommerce (electronic commerce) is the process of selling and buying products online. A complete ecommerce system usually includes:

1. Storefront (customer-facing website/app)
2. Cart and checkout
3. Payment processing
4. Order management
5. Inventory management
6. Shipping and fulfillment
7. Customer support and returns
8. Reporting and analytics

## How Ecommerce Works End-to-End

Typical ecommerce lifecycle:

1. Product setup
- Business creates products (name, price, SKU, stock, category, images).
- Products are organized into categories and made searchable.

2. Discovery and browsing
- Customer browses categories, searches, filters, and views product details.

3. Cart and checkout
- Customer adds items to cart and confirms quantities.
- Shipping details and payment method are collected.

4. Payment authorization
- Payment gateway (Stripe, PayPal, bank integrations, etc.) authorizes or captures payment.
- Fraud and risk checks may run here.

5. Order creation
- System creates an order record with status (e.g., `pending`, `processing`).
- Inventory is reserved or reduced.

6. Fulfillment
- Warehouse/staff pick, pack, and ship items.
- Order status moves through `processing -> shipped -> delivered`.

7. Post-purchase
- Customer receives updates and invoice.
- Returns/refunds/cancellations are handled if needed.

8. Analytics and optimization
- Business tracks conversion, revenue, top products, retention, and channel performance.
- Data informs pricing, promotions, and inventory strategy.

## How This Dashboard Maps to Ecommerce

This project is the **operations/admin side** of ecommerce.

- `Dashboard`: KPI snapshot + recent activity
- `Products`: inventory and product list management
- `Orders`: status tracking and order detail inspection
- `Customers`: customer value and engagement insights
- `Analytics`: charts and business performance views
- `Settings`: store-level configuration and preferences

## Current Features

### Core UI and Navigation
- Responsive sidebar (desktop collapse + mobile drawer)
- Sticky top navbar with global search submit
- Notification and profile dropdown menus
- Light, dark, and system theme support
- URL fallbacks for unknown routes

### Products
- Search, category filter, status filter
- Sorting by multiple columns
- Pagination with page controls
- Empty-state handling when filters return no results
- Delete flow with confirmation modal

### Orders
- Search + status filter
- Paginated table
- Order detail modal (customer, payment, line items)
- Status and payment badges
- Empty-state handling

### Customers
- Search + status filter
- Sort by name/orders/spend/join date
- Paginated table and profile modal
- Empty-state handling

### Analytics
- Revenue and order charts
- Category distribution pie chart
- Top products and traffic source summaries

### Settings
- Store information controls
- Theme mode selection (light/dark/system)
- Notification/security/payment toggles
- Password validation workflow
- Settings export to JSON

### Utility/UX Improvements
- Modals support `Esc` to close
- Body scroll lock while modal is open
- Better in-app status messages (instead of blocking alerts)

## Important Notes About Current Scope

This is currently a **frontend demo/dashboard layer** with mock data.

- No real backend/API persistence
- No real payment capture
- No real shipping integration
- Login is demo behavior

If you want production ecommerce, connect this UI to backend services (see “Backend Integration Plan” below).

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Recharts
- Lucide React
- ESLint

## Project Structure

```txt
src/
  components/
    charts/
    common/
    layout/
  contexts/
  data/
  hooks/
  pages/
  routes/
  styles/
  types/
  utils/
```

## Routes

- `/login`
- `/dashboard`
- `/products`
- `/orders`
- `/customers`
- `/analytics`
- `/settings`

Unknown routes are redirected to dashboard/login depending on layout scope.

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install

```bash
npm install
```

### Run development server

```bash
npm run dev
```

Open `http://localhost:5173`.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Backend Integration Plan (Production)

To make this a real ecommerce system:

1. Add authentication
- JWT/session auth
- protected routes
- role-based access (admin, manager, support)

2. Replace mock data with APIs
- `GET /products`, `POST /products`, `PATCH /products/:id`
- `GET /orders`, `PATCH /orders/:id/status`
- `GET /customers`, `GET /customers/:id`
- `GET /analytics/overview`

3. Add persistence and validation
- Database (PostgreSQL/MySQL)
- server-side validation and error handling

4. Integrate payments
- Stripe/PayPal/bank APIs
- webhook handling for payment status updates

5. Add fulfillment integrations
- shipping provider APIs
- tracking number + shipment events

6. Add observability
- audit logs
- metrics and tracing
- error monitoring

## Recommended Ecommerce Data Model

Core entities you should keep consistent across frontend and backend:

- Product: `id`, `name`, `sku`, `category`, `price`, `stock`, `status`
- Order: `id`, `customerId`, `items`, `total`, `paymentStatus`, `status`, `createdAt`
- Customer: `id`, `name`, `email`, `ordersCount`, `lifetimeValue`
- Payment: `method`, `gatewayRef`, `status`, `amount`
- Inventory Movement: `productId`, `delta`, `reason`, `timestamp`

## Typical Production Risks to Plan For

- Overselling inventory during high traffic
- Payment status mismatches (gateway success but local failure)
- Inconsistent order states across services
- Missing audit history for admin actions
- Poor performance on large tables/charts

## Future Enhancements

- API-driven CRUD for products/orders/customers
- Real-time notifications (websocket/SSE)
- CSV/PDF exports for reports
- Advanced filtering (date ranges, segments)
- Unit and integration tests
- Multi-warehouse inventory support
- Return/refund management module

## License

Use the license that matches your project policy (for example, MIT).
