import { Calendar as ReactBigCalendar, dateFnsLocalizer, Views, View } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useState } from 'react'
import { task } from '../../../data/types/useTaskTypes'
import useThemeStore from '../../../data/Store/themeStore.js'

//configuration of localization
const locales = {
    fr: fr,
};

export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }), // monday
    getDay,
    locales,
});
type CalendarProps = {
    tasks: task[]
};


const Calendar = ({ tasks }: CalendarProps) => {

    const events = tasks.map(task => ({
        title: task.taskName,
        start: new Date(task.createdAt), // conversion obligatoire
        end: new Date(task.deadline),
    }));

    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<View>(Views.MONTH);

    const { darkMode } = useThemeStore();

    return (
        <>
            <div style={{ height: 800, background: darkMode === false ? '#fff' : 'rgba(37, 37, 37, 0.88)', padding: 16, borderRadius: 8 }}>
                <ReactBigCalendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    view={currentView}
                    onView={(view) => setCurrentView(view)}
                    defaultView={Views.MONTH}
                    views={[Views.MONTH, Views.WEEK, Views.DAY]}
                    date={currentDate}
                    onNavigate={(date) => setCurrentDate(date)}
                    popup
                    style={{ height: '100%', borderRadius: 8 }}
                    toolbar={true}
                />
            </div>
        </>
    )
}

export default Calendar
