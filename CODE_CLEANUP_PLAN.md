# Code Cleanup Plan for E-commerce Dashboard

## Issues Identified:

### 1. Missing PageWrapper Component 🚨
- **Issue**: `AppRoutes.tsx` imports `PageWrapper` from '../components/layout/PageWrapper' but this component doesn't exist
- **Impact**: Application will fail to compile/run
- **Fix**: Remove PageWrapper dependency or create the component

### 2. Duplicate SalesChart Components 🔄
- **Location 1**: `src/components/charts/SalesChart.tsx` (AreaChart with revenue/sales data)
- **Location 2**: `src/features/dashboard/components/SalesChart.tsx` (LineChart with simpler sales data)
- **Impact**: Code duplication, maintenance overhead
- **Fix**: Consolidate into one component

### 3. Duplicate Dashboard Implementations 📊
- **Location 1**: `src/pages/Dashboard.tsx` (Comprehensive dashboard with stats, charts, recent orders, activities)
- **Location 2**: `src/features/dashboard/DashboardView.tsx` (Simpler version with stats and basic charts)
- **Impact**: Confusing which one to use, code duplication
- **Fix**: Keep the more comprehensive version

### 4. Unnecessary CSS Styles 🎨
- **Issue**: `src/index.css` contains default Vite template styles not relevant for this project
- **Impact**: Unused CSS, potential style conflicts
- **Fix**: Clean up index.css, ensure styles/index.css is used

### 5. Potential Dead Code 🗑️
- Unused imports
- Unreferenced components
- Duplicate route definitions

## Cleanup Actions:

### Step 1: Fix Missing PageWrapper (CRITICAL)
- Remove PageWrapper import from AppRoutes.tsx
- Update routing structure to work without it

### Step 2: Consolidate Dashboard Components
- Keep `src/pages/Dashboard.tsx` (more comprehensive)
- Remove `src/features/dashboard/DashboardView.tsx`
- Update any references

### Step 3: Consolidate SalesChart Components  
- Keep `src/components/charts/SalesChart.tsx` (more feature-rich)
- Remove `src/features/dashboard/components/SalesChart.tsx`
- Update imports

### Step 4: Clean Up CSS
- Remove Vite template styles from `src/index.css`
- Ensure `src/styles/index.css` contains the actual project styles
- Update imports if needed

### Step 5: Remove Dead Code
- Remove unused imports
- Delete unreferenced files
- Clean up commented code

## Expected Outcome:
- ✅ Application compiles and runs without errors
- ✅ Reduced code duplication
- ✅ Cleaner, more maintainable codebase
- ✅ Better performance (fewer components to load)
- ✅ Clear project structure

## Files to be Modified:
- `src/routes/AppRoutes.tsx`
- `src/features/dashboard/DashboardView.tsx` (delete)
- `src/features/dashboard/components/SalesChart.tsx` (delete)
- `src/index.css`
- `src/pages/Dashboard.tsx` (update imports if needed)

## Files to be Deleted:
- `src/features/dashboard/DashboardView.tsx`
- `src/features/dashboard/components/SalesChart.tsx`

## Testing Required:
- Verify all routes work correctly
- Ensure dashboard displays properly
- Check that all navigation links work
- Test for any TypeScript/compilation errors
