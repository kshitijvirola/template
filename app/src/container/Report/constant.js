const ReportConst = ["Employee Wise Request Report", "Porter Wise Report"];
const Report1Const = [
  "Job Wise Report",
  "Floor Wise Report",
  "Location Wise Report",
];

const RequestStatus = [
  { id: 0, value: "All" },
  { id: 1, value: "Looking for Porter" },
  { id: 2, value: "Porter on Way" },
  { id: 3, value: "Job Started" },
  { id: 4, value: "Finished" },
  { id: 5, value: "completed " },
];
const PortStatus = [
  { id: 0, value: "All" },
  { id: 1, value: "Job accepted" },
  { id: 2, value: "Job ongoing" },
  { id: 3, value: "Finished" },
];
const FloLocStatus = [
  { id: 0, value: "All" },
  { id: 1, value: "Pickup" },
  { id: 2, value: "Destination" },
];
export { ReportConst, Report1Const, RequestStatus, PortStatus, FloLocStatus };
