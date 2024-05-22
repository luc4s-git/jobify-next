import React from 'react';

import { AppWindow, AreaChart, Layers } from 'lucide-react';

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const navLinks: NavLink[] = [
  { href: '/add-job', label: 'Add Job', icon: <Layers /> },
  { href: '/jobs', label: 'All Jobs', icon: <AppWindow /> },
  { href: '/stats', label: 'Stats', icon: <AreaChart /> },
];

export default navLinks;
