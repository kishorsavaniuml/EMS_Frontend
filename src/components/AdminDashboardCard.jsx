function AdminDashboardCard(props) {
  return (
    <div className="bg-white flex flex-col items-center justify-evenly  shadow shadow-gray-300 p-5 min-w-1/6 gap-3 rounded-xl">

      <div className={props.adminCardsData.className}>
        {props.adminCardsData.icon}
      </div>
      <div className="text-center font-semibold">{props.adminCardsData.title}</div>
      <div className="text-center font-semibold">{props.dashboardData[props.adminCardsData.valueKey]}</div>

    </div>
  );
}

export default AdminDashboardCard;
