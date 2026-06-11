function EmployeeDashboardCard({ employeeCardData, employeeDashboardData }) {
  return (
    <div className="flex flex-col items-center gap-3 border bg-white border-gray-200 w-1/5 p-5 rounded-xl shadow shadow-gray-200">
      <div className={employeeCardData.className}>{employeeCardData.icon}</div>
      <div className="text-sm font-semibold">{employeeCardData.title}</div>
      <div className="text-center font-bold text-lg">
        {employeeDashboardData[employeeCardData.employeeDashboardCardKey]}
      </div>
      <div className="text-gray-600 text-sm">Days</div>
    </div>
  );
}

export default EmployeeDashboardCard;
