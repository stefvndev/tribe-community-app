import CommunityLayout from "@/components/layout/CommunityLayout";
import { createFileRoute } from "@tanstack/react-router";
import dayjs from "dayjs";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

export const Route = createFileRoute("/_authenticated/_community/$id/calendar")(
  {
    component: () => (
      <CommunityLayout>
        <RouteComponent />
      </CommunityLayout>
    ),
  }
);

const localizer = dayjsLocalizer(dayjs);

const events = [
  {
    id: 0,
    title: "In progress.. ⚒️",
    start: new Date(),
    end: new Date(),
  },
];

function RouteComponent() {
  return (
    <div className="w-full h-full">
      <div className="w-full p-8 bg-white border rounded-xl">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 600 }}
          popup
        />
      </div>
    </div>
  );
}
