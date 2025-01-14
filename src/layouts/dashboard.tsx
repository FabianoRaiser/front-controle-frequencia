

import { DashboardLayout, PageContainer } from '@toolpad/core'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <DashboardLayout>
        <PageContainer>
            <Outlet />
        </PageContainer>
    </DashboardLayout>
  )
}

export default Layout;