import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AppShell,
  Box,
  NavLink,
  Text,
  Group,
  Stack,
  Button,
  Avatar,
  Divider,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconCross,
  IconHome,
  IconInfoCircle,
  IconPhoto,
  IconMail,
  IconCalendar,
  IconLogout,
  IconMenu2,
  IconLayoutDashboard,
  IconBuildingChurch,
  IconBook,
} from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: IconLayoutDashboard, exact: true },
  { path: '/admin/home', label: 'Home Page', icon: IconHome },
  { path: '/admin/introduction', label: 'Introduction Page', icon: IconBook },
  { path: '/admin/church-intro', label: 'Church Intro Page', icon: IconBuildingChurch },
  { path: '/admin/about', label: 'About Page', icon: IconInfoCircle },
  { path: '/admin/gallery', label: 'Gallery', icon: IconPhoto },
  { path: '/admin/events', label: 'Events', icon: IconCalendar },
  { path: '/admin/messages', label: 'Messages', icon: IconMail },
];

export default function AdminLayout() {
  const [opened, { toggle }] = useDisclosure();
  const { pathname } = useLocation();
  const { admin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const isActive = (path, exact) => {
    if (exact) return pathname === path;
    return pathname.startsWith(path);
  };

  return (
    <AppShell
      navbar={{ width: 250, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      header={{ height: 60 }}
      padding={0}
    >
      <AppShell.Header
        style={{
          background: 'linear-gradient(135deg, #0f1c38, #1a2744)',
          borderBottom: '1px solid rgba(201,168,76,0.2)',
        }}
      >
        <Group h="100%" px="md" justify="space-between">
          <Group gap="sm">
            <Box hiddenFrom="sm">
              <Button variant="subtle" onClick={toggle} p="xs" style={{ color: '#c9a84c' }}>
                <IconMenu2 size={20} />
              </Button>
            </Box>
            <IconCross size={22} color="#c9a84c" />
            <Text fw={700} style={{ fontFamily: 'Crimson Pro, serif', color: '#fff', fontSize: '1.1rem' }}>
              Church Admin
            </Text>
          </Group>
          <Button
            variant="subtle"
            size="xs"
            leftSection={<IconLogout size={14} />}
            onClick={handleLogout}
            style={{ color: '#c9a84c' }}
          >
            Logout
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          background: 'linear-gradient(180deg, #0f1c38 0%, #1a2744 100%)',
          borderRight: '1px solid rgba(201,168,76,0.15)',
        }}
      >
        <Box p="md">
          {/* Admin info */}
          <Group gap="sm" mb="lg">
            <Avatar radius="xl" size="md" style={{ background: 'rgba(201,168,76,0.2)', color: '#c9a84c' }}>
              {admin?.name?.[0] || 'A'}
            </Avatar>
            <Box>
              <Text size="sm" fw={600} style={{ color: '#fff' }}>
                {admin?.name}
              </Text>
              <Text size="xs" style={{ color: '#7788aa' }}>
                Administrator
              </Text>
            </Box>
          </Group>

          <Divider mb="md" color="rgba(201,168,76,0.15)" />

          <Stack gap="xs">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                component={Link}
                to={item.path}
                label={item.label}
                leftSection={<item.icon size={18} />}
                active={isActive(item.path, item.exact)}
                styles={{
                  root: {
                    borderRadius: 8,
                    color: isActive(item.path, item.exact) ? '#1a2744' : '#c9d0e8',
                    background: isActive(item.path, item.exact)
                      ? 'linear-gradient(135deg, #c9a84c, #e8d08a)'
                      : 'transparent',
                    '&:hover': { background: 'rgba(201,168,76,0.1)' },
                  },
                  label: {
                    fontWeight: isActive(item.path, item.exact) ? 600 : 400,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>

        <Box p="md" style={{ marginTop: 'auto' }}>
          <Divider mb="md" color="rgba(201,168,76,0.15)" />
          <Link to="/" target="_blank" style={{ textDecoration: 'none' }}>
            <Text size="xs" style={{ color: '#7788aa' }}>
              View Website →
            </Text>
          </Link>
        </Box>
      </AppShell.Navbar>

      <AppShell.Main style={{ background: '#f0f2f5' }}>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
}
