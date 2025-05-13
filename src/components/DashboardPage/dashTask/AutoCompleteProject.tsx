import { Autocomplete, TextField, CircularProgress } from '@mui/material';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../../../lib/axios.js';

type ProjectOption = { // it's the type of the options
    label: string;
    value: string;
};
type ProjectSelectProps = { // it's the type of the props
    onSelect: (projectId: string) => void;
    selectedProjectId: string;
}

export default function ProjectSelect({ onSelect, selectedProjectId }: ProjectSelectProps) {

    const [options, setOptions] = useState<ProjectOption[]>([]); // it's the state of the options
    const [inputValue, setInputValue] = useState(''); // it's the state of the input value that will be used to fetch the projects
    const [loading, setLoading] = useState(false); //for loading when we fetch the projects

    const fetchProjects = async (searchTerm: string) => { // it's the function that will be used to fetch the projects
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/project/getAllProject?searchTerm=${searchTerm}`);
            const data = await res.data.projectCreated;
            const formatted: ProjectOption[] = data.map((proj: any) => ({
                label: proj.projectName,
                value: proj._id,
            }));
            setOptions(formatted);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (inputValue.trim() === '') return;
        fetchProjects(inputValue);

    }, [inputValue]);

    return (
        <Autocomplete
            fullWidth
            size='small'
            options={options}
            loading={loading}
            value={options.find(opt => opt.value === selectedProjectId) || null}
            onChange={(event, newValue) => {
                onSelect(newValue ? newValue.value : '');
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}

            getOptionLabel={(option) => option.label}
            noOptionsText="no project found"
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search project"
                    variant="outlined"
                    sx={{
                        width: '100%',
                        '& .MuiOutlinedInput-root': {
                            padding: '2px 4px ', fontSize: 14,
                        },
                    }}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {loading ? <CircularProgress sx={{ color: 'rgb(25, 125, 207)' }} size={15} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}

            renderOption={(props, option) => (
                <li {...props} key={option.value}
                    style={{ fontSize: 13, padding: '10px 5px', borderBottom: '1px solid rgba(163, 163, 163, 0.25)' }}>
                    {option.label}
                </li>
            )}
        />
    );
}
