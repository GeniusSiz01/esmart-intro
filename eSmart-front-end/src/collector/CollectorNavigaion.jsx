import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Notifications';
import ArchiveIcon from '@mui/icons-material/Restore';
import Paper from '@mui/material/Paper';
import CollectorActivity from './CollectorActivity';
import CollectorNotifications from './CollectorNotifications';
import CollectorHistory from './CollectorHistory';


export default function CollectorNavigation() {
    const [value, setValue] = React.useState('home');
    const ref = React.useRef(null);

    React.useEffect(() => {
        ref.current.ownerDocument.body.scrollTop = 0;
    }, [value]);

    const renderScreen = () => {
        let screen = '';

        switch (value) {
            case 'home':
                screen = <CollectorActivity />
                break;
            case 'notifications':
                screen = <CollectorNotifications />
                break;
            case 'history':
                screen = <CollectorHistory />
                break;

            default:
                break;
        }
        return (
            screen
        );

    }


    return (
        <Box sx={{ pb: 7 }} ref={ref}>
            <CssBaseline />
            {renderScreen()}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    style={{ backgroundColor: 'rgba(196, 196, 196, 0.74)' }}
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                >
                    <BottomNavigationAction value='home' label="Home" icon={<HomeIcon />} />
                    <BottomNavigationAction value='notifications' label="Notifications" icon={<FavoriteIcon />} />
                    <BottomNavigationAction value='history' label="History" icon={<ArchiveIcon />} />
                </BottomNavigation>
            </Paper>
        </Box>
    );
}
