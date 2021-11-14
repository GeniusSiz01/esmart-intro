import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function NotificationSnackBar(props) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(props.open);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    return (
        <div onClick={handleClick}>
            <Stack spacing={2} sx={{ width: '100%' }}>

                <Button onClick={handleClick} autoFocus>
                    Accept
                </Button>
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        Request accepted check your nitfications.
                    </Alert>
                </Snackbar>
            </Stack>
        </div>
    );
}
