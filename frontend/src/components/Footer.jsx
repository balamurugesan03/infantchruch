import { Container, Grid, Text, Stack, Group, Anchor, Box, Divider } from '@mantine/core';
import { IconCross, IconPhone, IconMail, IconMapPin } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <Box
      component="footer"
      style={{
        background: 'linear-gradient(135deg, #0f1c38 0%, #1a2744 100%)',
        color: '#e8e8e8',
        paddingTop: '60px',
        paddingBottom: '24px',
      }}
    >
      <Container size="xl">
        <Grid gutter="xl">
          {/* Brand */}
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Stack gap="sm">
              <Group gap="xs">
                <IconCross size={24} color="#c9a84c" />
                <Text
                  fw={700}
                  size="xl"
                  style={{ fontFamily: 'Crimson Pro, serif', color: '#fff' }}
                >
                  Infant Jesus Church
                </Text>
              </Group>
              <Text size="sm" c="dimmed" style={{ color: '#9ab', lineHeight: 1.7 }}>
                Puthenkad, Neyyattinkara Diocese. A living witness to faith, unity, and
                reliance on God for generations.
              </Text>
              <Box
                style={{
                  width: 50,
                  height: 2,
                  background: 'linear-gradient(90deg, #c9a84c, #e8d08a)',
                  borderRadius: 2,
                }}
              />
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 6, sm: 4 }}>
            <Stack gap="xs">
              <Text fw={600} style={{ color: '#c9a84c', letterSpacing: '0.08em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Quick Links
              </Text>
              {[
                { label: 'Home', path: '/' },
                { label: 'About Us', path: '/about' },
                { label: 'Gallery', path: '/gallery' },
                { label: 'Contact', path: '/contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{
                    color: '#bbb',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.target.style.color = '#c9a84c')}
                  onMouseLeave={(e) => (e.target.style.color = '#bbb')}
                >
                  {link.label}
                </Link>
              ))}
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 6, sm: 4 }}>
            <Stack gap="sm">
              <Text fw={600} style={{ color: '#c9a84c', letterSpacing: '0.08em', fontSize: '0.8rem', textTransform: 'uppercase' }}>
                Contact Us
              </Text>
              <Group gap="xs" align="flex-start">
                <IconMapPin size={16} color="#c9a84c" style={{ marginTop: 2 }} />
                <Text size="sm" style={{ color: '#bbb', lineHeight: 1.6 }}>
                  Puthenkada, Thirupuram<br />
                  NEYYATTINKARA, KERALA 695133<br />
                  India
                </Text>
              </Group>
              <Group gap="xs">
                <IconPhone size={16} color="#c9a84c" />
                <Text size="sm" style={{ color: '#bbb' }}>+91 9822639678</Text>
              </Group>
              <Group gap="xs">
                <IconMail size={16} color="#c9a84c" />
                <Text size="sm" style={{ color: '#bbb' }}>sajisac@gmail.com</Text>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>

        <Divider my="xl" color="rgba(201,168,76,0.2)" />

        <Group justify="space-between" wrap="wrap" gap="xs">
          <Text size="xs" style={{ color: '#667' }}>
            © {new Date().getFullYear()} Infant Jesus Church, Puthenkad. All rights reserved.
          </Text>
          <Group gap="xs" align="center">
            <Text size="xs" style={{ color: '#556' }}>
              Designed & Developed by{' '}
              <span style={{ color: '#c9a84c', fontWeight: 600 }}>Balamurugesan</span>
            </Text>
            <Text size="xs" style={{ color: '#445' }}>·</Text>
            <Link
              to="/admin/login"
              style={{ color: '#667', fontSize: '0.75rem', textDecoration: 'none' }}
            >
              Admin Panel
            </Link>
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
