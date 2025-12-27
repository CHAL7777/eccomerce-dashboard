# TypeScript Errors Fix Plan

## Error Analysis

### 1. ProductTable.tsx Issues (Lines 8-12)
- **Problem**: Mock data missing required Product interface properties
- **Required Properties**: cost, status, image, sku, createdAt, updatedAt
- **Solution**: Update mock data to match Product interface

### 2. Analytics.tsx Issue (Line 284)
- **Problem**: `percent` is possibly undefined in label function
- **Solution**: Add null check for percent parameter

### 3. Missing Files/Imports
- **Problem**: Modal.tsx and formatDate.ts don't exist
- **Solution**: Create missing utility files

### 4. Button Component Issues
- **Problem**: Button components missing required `children` property
- **Problem**: Using non-existent 'danger' variant
- **Solution**: Add 'danger' variant to Button component and fix usage

### 5. Dashboard.tsx Issues
- **Problem**: Using 'customer' instead of 'customerId'
- **Problem**: Status comparisons using wrong case
- **Solution**: Fix property references and status values

### 6. Sort Function Issue (Products.tsx)
- **Problem**: Trying to sort by 'category' which isn't in allowed types
- **Solution**: Update sort types to include 'category'

### 7. Settings.tsx Issues
- **Problem**: Spread operator type issues and theme comparison problems
- **Solution**: Fix type definitions and comparisons

## Implementation Steps

1. Create missing utility files (Modal, formatDate)
2. Fix Product interface data in ProductTable
3. Update Button component with 'danger' variant
4. Fix all import statements
5. Update sort types in Products.tsx
6. Fix Dashboard.tsx property references and status values
7. Fix Analytics.tsx undefined check
8. Fix Settings.tsx type and comparison issues
9. Add children prop to all Button usages
10. Test all fixes

## Files to Create/Edit

### New Files:
- src/components/common/Modal.tsx
- src/utils/formatDate.ts

### Files to Edit:
- src/features/products/components/ProductTable.tsx
- src/components/common/Button.tsx
- src/pages/Analytics.tsx
- src/pages/Customers.tsx
- src/pages/Dashboard.tsx
- src/pages/Orders.tsx
- src/pages/Products.tsx
- src/pages/Settings.tsx
