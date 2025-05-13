import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../../lib/axios.js';

type UserOption = { // it's the type of the users
    label: string; //will be the email of user
    value: string;
};
type UserSelectProps = { // it's the type of the props
    onSelect: (userId: string) => void;
    selectedUser: string;
}

const AutoCompletUser = ({ onSelect, selectedUser }: UserSelectProps) => {

    const [options, setOptions] = useState<UserOption[]>([]); // it's the state of the options
    const [inputValue, setInputValue] = useState(''); // it's the state of the input value that will be used to fetch the users
    const [loading, setLoading] = useState(false); //for loading when we fetch the users

    const fetchUsers = async (searchTerm: string) => { // it's the function that will be used to fetch the users
        try {
            setLoading(true);
            const res = await axiosInstance.get(`/auth/allUser?searchTerm=${searchTerm}`);
            const data = await res.data;
            const formatted: UserOption[] = data.map((user: any) => ({
                label: user.email,
                value: user._id,
            }));
            setOptions(formatted);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (inputValue.trim() === '') return;
        fetchUsers(inputValue);
    }, [inputValue]);

    return (
        <Autocomplete
            fullWidth
            size='small'
            options={options}
            loading={loading}
            value={options.find(opt => opt.value === selectedUser) || null}
            onChange={(_event, newValue) => {
                onSelect(newValue ? newValue.value : ''); //onSelect will get the userId like value
            }}
            onInputChange={(_event, newInputValue) => {
                setInputValue(newInputValue);
            }}

            getOptionLabel={(option) => option.label}
            noOptionsText="no project found"
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Search task"
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
    )
}

export default AutoCompletUser
