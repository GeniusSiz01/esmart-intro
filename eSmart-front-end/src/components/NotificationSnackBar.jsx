import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LoadingButton from '@mui/lab/LoadingButton';
import axios from 'axios';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NotificationSnackBar({ cid }) {
    const [open, setOpen] = React.useState(false);

    const handleClick = async () => {
        let body = { cid }
        await axios.post('/end/trip', body).then(response => {
            console.log(response.data);
            if (response.data.isEnded) {
                setOpen(true);
            }
        });
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <LoadingButton loading={open} onClick={handleClick} color='warning' startIcon={<ExitToAppIcon />} >
                    End trip
                </LoadingButton>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        The trip has been ended successfully.
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}
