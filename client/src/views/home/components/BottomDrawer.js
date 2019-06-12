import React from 'react';

import Drawer from '@material-ui/core/Drawer';

export default function BottomDrawer(props){
    
    return (
        <Drawer anchor="bottom" open={props.bottomDrawerOpen} onClose={props.toggleBottomDrawer}>
            <p>
                SETTINGS
            </p>
        </Drawer>
    );
}