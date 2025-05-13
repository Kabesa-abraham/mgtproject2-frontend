import { Box, LinearProgress, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

type taskProgressBarProps = {
    task: {
        _id: string,
        taskName: string,
        taskDesc: string,
        status: string,
        deadline: string,
        createdAt: string,
        updatedAt: string
    };
}


const TaskprogressBar = ({ task }: taskProgressBarProps) => {

    const createdAt = new Date(task.createdAt);
    const deadline = new Date(task.deadline);

    const [progress, setProgress] = useState(0);

    const calculateProgress = () => {
        const now = new Date();
        const totalDuration = deadline.getTime() - createdAt.getTime();
        const elapsedTime = now.getTime() - createdAt.getTime();

        if (totalDuration <= 0) return 100;
        return Math.min(100, Math.max(0, (elapsedTime / totalDuration) * 100));
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(calculateProgress());
        }, 1000); // Update every second

        return () => clearInterval(interval);
    }, [createdAt, deadline]);


    return (
        <Box sx={{ width: '100%', mt: 1 }}>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{
                    height: { xs: 10, md: 15 },
                    borderRadius: 5,
                    bgcolor: 'rgba(39, 157, 230, 0.29)',
                    '& .MuiLinearProgress-bar': {
                        backgroundColor: progress >= 100 ? '#d32f2f' : '#1976d2',
                    },
                }}
            />
            <Typography variant="caption" sx={{ fontSize: { xs: 12, md: 14 }, mt: 0.8, display: 'block' }}>
                {progress >= 100
                    ? "Deadline reached"
                    : `${Math.round(progress)}% of time elapsed`}
            </Typography>
        </Box>
    );
}

export default TaskprogressBar
