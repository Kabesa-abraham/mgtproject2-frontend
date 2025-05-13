import { Box, Button, Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material'
import StateCard from './dashHome/StateCard'
import { DoneAll, EditNote, JoinRight, ListAlt } from '@mui/icons-material'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import RecentTasks from './dashHome/RecentTasks'
import useThemeStore from '../../data/Store/themeStore.js'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../lib/axios.js'
import { task } from '../../data/types/useTaskTypes.js';
import { useNavigate } from 'react-router-dom'


const tasksCreatedByMonth = [ //tasks created by month
    { month: 'Janu', tasks: 5 },
    { month: 'Feb', tasks: 8 },
    { month: 'Mar', tasks: 12 },
    { month: 'Apr', tasks: 9 },
    { month: 'Nov', tasks: 25 },
    { month: 'Dec', tasks: 30 },
    { month: 'Oct', tasks: 28 },
];

//-----------------------------
type ProjectTaskData = {
    name: string; // Nom du projet
    completed: number; // Nombre de tâches terminées
};

const projectTaskFinished: ProjectTaskData[] = [
    { name: 'Create a new computer that people can use', completed: 12 },
    { name: 'Projet B in a new city and selebamo kvkdgdg', completed: 8 },
    { name: 'Projet C', completed: 15 },
    { name: 'Projet D', completed: 5 },
    { name: 'Projet E', completed: 10 },
];
//-----------------------------


const DashHome = () => {

    const { darkMode } = useThemeStore();

    const [totalProject, setTotalProject] = useState({ created: 0, participated: 0 });
    const [totalTasksByStatus, setTotalTasksByStatus] = useState({ toDo: 0, completed: 0 });
    const someCardData = [ //it contains all data for the four cards in DashHome
        {
            icon: ListAlt,
            title: 'Tasks To do',
            value: totalTasksByStatus.toDo,
            colorIcon: 'rgb(10, 153, 236)'
        },
        {
            icon: DoneAll,
            title: 'Finished tasks',
            value: totalTasksByStatus.completed,
            colorIcon: 'rgb(156, 5, 5)'
        },
        {
            icon: EditNote,
            title: 'Projects created',
            value: totalProject.created,
            colorIcon: 'rgb(119, 8, 192)'
        },
        {
            icon: JoinRight,
            title: 'Participated projects',
            value: totalProject.participated,
            colorIcon: 'rgb(42, 7, 53)'
        },
    ]
    const [recentTasks, setRecentTasks] = useState<task[]>([]);
    const [taskByMonth, setTaskByMonth] = useState([]);
    const [completeTaskPerProjects, setCompleteTaskPerMonth] = useState([]);

    const convertMonth = (monthNumber: number) => { //will help me to convert the number of the month to its name
        const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',]
        return month[monthNumber - 1];
    }

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await axiosInstance.get('/task/fetchTaskAssignedToProject');
                const data = res.data;
                setTotalTasksByStatus({ toDo: data?.taskState?.toDo, completed: data?.taskState?.completed })
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        const fetchProjects = async () => {
            try {
                const res = await axiosInstance.get(`/project/getAllProject`);
                const data = res.data;
                setTotalProject({ created: data?.totalProjectsCreated, participated: data?.totalProjectMembered })
            } catch (error) {
                console.log('Error fetching projects:', error)
            }

        };

        const fetchRecentTasks = async () => {
            try {
                const res = await axiosInstance(`/task/getAllTask?endIndex=${6}&order=${'desc'}`);
                const data = res.data;
                setRecentTasks(data?.task)
            } catch (error) {
                console.log('Error when we fetch Recent Tasks :', error)
            }
        };

        const handleFetchSomeTasks = async () => {
            try {
                const res = await axiosInstance.get('/task/getTaskState');
                const data = res.data;

                const formattedTasksByMonth = data?.tasksByMonth.map((item: { _id: number, tasks: number }) => ({
                    month: convertMonth(item._id),
                    tasks: item.tasks,
                }));

                const completedTasksByProject = data?.completedTasksByProject.map((item: { projectName: string, count: number }) => ({
                    name: item.projectName,
                    completed: item.count
                }));

                setTaskByMonth(formattedTasksByMonth || []);
                setCompleteTaskPerMonth(completedTasksByProject || [])
            } catch (error) {
                console.log('Error fetching tasks:', error)
            }
        }

        fetchTasks();
        fetchProjects();
        fetchRecentTasks();
        handleFetchSomeTasks();
    }, [])

    console.log("completeTaskPerProjects", completeTaskPerProjects);

    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
            <Stack spacing={2} >
                <Box>
                    <Typography variant='h4' sx={{ fontWeight: 400, color: 'rgb(122, 122, 122)', fontSize: '14px' }}>
                        Dashboard
                    </Typography>
                </Box>

                <Grid container spacing={2} sx={{ width: '100%', margin: '0 auto' }}>
                    {
                        someCardData.map((card, i) => (
                            <Grid key={i} size={{ xs: 12, sm: 6, md: 6, lg: 3 }} sx={{ width: '100%' }} >
                                <StateCard icon={<card.icon />} title={card.title} value={card.value} iconColor={card.colorIcon} />
                            </Grid>
                        ))
                    }
                </Grid>

                <Stack direction={{ xs: 'column', lg: 'row' }} spacing={2} sx={{ width: '100%', margin: '0 auto' }}>
                    <Card sx={{
                        width: '100%', boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(125, 132, 143, 0.34)' : 'rgba(0, 0, 0, 0.12)'}`, borderRadius: '5px',
                        bgcolor: darkMode ? 'rgb(10, 10, 10)' : '',
                    }}>
                        <CardHeader
                            title={<Typography variant='h5' sx={{ fontWeight: 400, color: darkMode ? 'rgb(119, 119, 119)' : 'rgb(61, 61, 61)', fontSize: '15px' }}>
                                Tasks created by month
                            </Typography>}
                        />
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={taskByMonth}
                                    margin={{ top: 20, bottom: 5 }}
                                    barCategoryGap={'10%'}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tick={{ fontSize: 12, fill: "rgb(95, 107, 119)", fontWeight: 600 }}
                                    />
                                    <YAxis allowDecimals={false}
                                        tick={{ fontSize: 11, fill: "rgb(95, 107, 119)", fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                                        cursor={{ fill: darkMode ? 'rgba(56, 56, 56, 0.98)' : "#eee" }} //when hovering over the bar
                                    />
                                    <Bar dataKey="tasks"
                                        fill="rgb(84, 157, 241)"
                                        radius={[10, 10, 0, 0]}
                                        barSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card sx={{
                        width: '100%', boxShadow: 'none', border: `1px solid ${darkMode ? 'rgba(125, 132, 143, 0.34)' : 'rgba(0, 0, 0, 0.12)'}`, borderRadius: '5px',
                        bgcolor: darkMode ? 'rgb(10, 10, 10)' : '',
                    }}>
                        <CardHeader
                            title={<Typography variant='h5' sx={{ fontWeight: 400, color: darkMode ? 'rgb(119, 119, 119)' : 'rgb(61, 61, 61)', fontSize: '15px' }}>
                                Completed tasks per project
                            </Typography>}
                        />
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={completeTaskPerProjects}
                                    margin={{ top: 20, bottom: 5 }}
                                    barCategoryGap={'10%'}
                                >
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                    <XAxis
                                        dataKey="name" tickFormatter={(value) => value.length > 15 ? value.slice(0, 15) + '…' : value}
                                        tick={{ fontSize: 12, fill: "rgb(95, 107, 119)", fontWeight: 600 }}
                                    />
                                    <YAxis allowDecimals={false}
                                        tick={{ fontSize: 11, fill: "rgb(95, 107, 119)", fontWeight: 500 }}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: 8, fontSize: 12 }}
                                        cursor={{ fill: darkMode ? 'rgba(56, 56, 56, 0.48)' : "#eee" }} //when hovering over the bar
                                    />
                                    <Bar dataKey="completed"
                                        fill={darkMode ? 'rgb(81, 44, 131)' : "rgb(28, 3, 39)"}
                                        radius={[10, 10, 0, 0]}
                                        barSize={50}
                                    />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </Stack>

                <Box sx={{}}>
                    <Card sx={{ boxShadow: 'none', border: 'none', padding: '0px', bgcolor: darkMode ? 'rgb(10, 10, 10)' : '' }}>
                        <CardContent sx={{ padding: "12px 0px", margin: 0 }}>
                            <Stack spacing={2} direction={'row'} sx={{ justifyContent: 'space-between', alignItems: 'center' }} >
                                <Typography variant='h6' sx={{ fontSize: '14px', fontWeight: 500 }} >Recent Tasks</Typography>
                                <Button variant='contained'
                                    sx={{
                                        textTransform: 'none', fontWeight: 400, fontSize: '14px', bgcolor: darkMode ? 'rgb(81, 44, 131)' : 'rgb(40, 21, 65)', borderRadius: 2, boxShadow: 'none',
                                        '&:hover': { boxShadow: 'none' }
                                    }} onClick={() => navigate('/tasks')}  >
                                    See More</Button>
                            </Stack>
                        </CardContent>
                        <CardContent sx={{ padding: 0, margin: 0 }} >
                            <RecentTasks RecentTaskes={recentTasks} />
                        </CardContent>
                    </Card>
                </Box>
            </Stack >
        </Box >
    )
}

export default DashHome
