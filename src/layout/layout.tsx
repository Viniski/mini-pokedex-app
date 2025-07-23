import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Link as MuiLink,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex h-full flex-col">
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: 'transparent',
                    backdropFilter: 'blur(12px)',
                }}
                className="bg-gray-900 text-white"
            >
                <Toolbar className="flex items-center px-4 sm:px-6 md:px-12">
                    <MuiLink
                        component={RouterLink}
                        to="/"
                        underline="none"
                        className="flex items-center"
                    >
                        <Typography
                            variant="h6"
                            className="font-bold text-white hover:text-gray-300 transition-colors duration-200"
                        >
                            Pokédex
                        </Typography>
                    </MuiLink>
                </Toolbar>
            </AppBar>

            <div className="flex h-full overflow-hidden">
                <div className="flex h-full w-full flex-col overflow-auto bg-[--bg-secondary]">
                    <main className="flex grow-[1] flex-col px-6 py-14 md:px-8 md:py-10">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;
