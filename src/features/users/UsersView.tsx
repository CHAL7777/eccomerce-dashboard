import React from "react";
import UserTable from "./UserTable";
import StatCard from "../../components/common/StatCard";
import { UserCheck, UserPlus, Users, UserX } from "lucide-react";

const UsersView: React.FC = () => {
  return (
    <div className='flex-1 overflow-auto relative z-10'>
      <header className='bg-gray-800 bg-opacity-50 backdrop-blur-md border-b border-gray-700 p-4'>
        <h1 className='text-2xl font-semibold text-gray-100'>User Management</h1>
      </header>

      <main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
        <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'>
          <StatCard name='Total Users' icon={Users} value='1,234' color='#6366F1' />
          <StatCard name='New Users Today' icon={UserPlus} value='42' color='#10B981' />
          <StatCard name='Active Users' icon={UserCheck} value='1,180' color='#F59E0B' />
          <StatCard name='Churn Rate' icon={UserX} value='2.4%' color='#EF4444' />
        </div>

        <UserTable />
      </main>
    </div>
  );
};

export default UsersView;