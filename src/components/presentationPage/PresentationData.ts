import AssignmentIcon from '@mui/icons-material/Assignment';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import CleanHandsOutlinedIcon from '@mui/icons-material/CleanHandsOutlined';

export const featuresData1 = [
    {
        icon: {
            bg_color: '#6CB47F',
            icon_color: '#007920',
            iconName: AssignmentIcon
        },
        titleFeature: 'Task management',
        descFeatures: 'Create, assign, and track the progress of your tasks easily with an intuitive dashboard.'
    },
    {
        icon: {
            bg_color: '#36B3E0',
            icon_color: '#007CA9',
            iconName: CalendarMonthOutlinedIcon
        },
        titleFeature: 'Planning & calendar',
        descFeatures: 'Keep track of deadlines with a smart calendar and automatic reminders.'
    },
    {
        icon: {
            bg_color: '#EAC5FF',
            icon_color: "#BC89D9",
            iconName: LockOutlinedIcon
        },
        titleFeature: 'Secure authentification',
        descFeatures: 'Passwords are stored securely using modern hashing techniques, meaning they are never stored in clear text.'
    },
]

export const featuresData2 = [
    {
        icon: {
            icon_color: '#A5A1A1',
            iconName: AssessmentOutlinedIcon
        },
        titleFeature: 'Analytics Dashboard',
        descFeatures: 'Analyze your performance and optimize your workflow with detailed graphs, giving you a clear view of your project efficiency, task management, and areas for improvement.'
    },
    {
        icon: {
            icon_color: '#A5A1A1',
            iconName: CleanHandsOutlinedIcon
        },
        titleFeature: 'Integration',
        descFeatures: 'Connect OREGON with your favorite tools like Google Drive, Slack, and Trello.'
    }
]

export const pricingData = [

    {
        type: "Free",
        recommended: false,
        price: 0,
        description: [
            '3 active projects',
            '5 members max',
            'Basic task management',
            'Google Drive Integration'
        ],
        textBtn: 'Sign up for Free',
        buttonVariant: 'outlined',
    },

    {
        type: "Professional",
        recommended: true,
        price: 10,
        description: [
            'Unlimited projects',
            'up to 20 members',
            'Advanced task management',
            'Google Drive Integration',
            'Statistics and reports',
            'Priority Support'
        ],
        textBtn: 'Start Now',
        buttonVariant: 'contained',
    },

    {
        type: "Enterprise",
        recommended: false,
        price: 30,
        description: [
            'up to 50 members',
            'Advanced task management',
            'Help center access',
            'Priority Support'
        ],
        textBtn: 'Contact us',
        buttonVariant: 'outlined'
    }

]

export const freequentQuestions = [
    {
        panel: '1',
        question: "What is OREGON2.0?",
        answer: `OREGON2.0 is a project management tool that helps you manage your tasks, projects, and deadlines effectively. With OREGON, you can easily create, assign, and track tasks, set deadlines, and monitor progress.`
    },
    {
        panel: '2',
        question: "How do l contact customer support if l have question?",
        answer: ` You can contact our customer support team by email at yebulaabraham@gmail.com or by phone at +243 907 657 180. Our support team is available 24/7 to assist you with any questions or concerns you may have.`
    },
    {
        panel: '3',
        question: "Is OREGON2.0 free to use?",
        answer: `Yes, OREGON2.0 is free to use for individuals and small businesses. but we also have a paid plan for businesses and Enterprises.`
    },
    {
        panel: '4',
        question: "Can I use OREGON2.0 on multiple devices?",
        answer: `Yes, OREGON2.0 is a cloud-based application, which means you can access it from anywhere with an internet connection.`
    }
]