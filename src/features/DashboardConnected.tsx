import React from 'react'
import DashboardProvider from "contextProviders/dashboard.provider"
import Dashboard from './Dashboard'

const DashboardConnected = () => {
    return (
        <>
            <DashboardProvider>
                <Dashboard/>
            </DashboardProvider>
        </>
    )
}

export default DashboardConnected
