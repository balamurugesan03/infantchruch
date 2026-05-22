import { useEffect, useState } from 'react';
import { Container, Grid, Text, Title, Box, Stack, Card, ThemeIcon, Group } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconCross, IconBuildingChurch, IconStar, IconUsers, IconHeart } from '@tabler/icons-react';
import { pageService } from '../services/api';
import PageLoader from '../components/PageLoader';

const icons = [IconBuildingChurch, IconStar, IconUsers, IconHeart];

export default function About() {
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    pageService
      .getPage('about')
      .then((res) => setPage(res.data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  const sortedSections = page?.sections?.sort((a, b) => a.order - b.order) || [];

  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #0f1c38 0%, #1a2744 60%, #243357 100%)',
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >
        <Container size="xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Stack align="center" gap="md">
              <IconCross size={40} color="#c9a84c" />
              <Title
                order={1}
                ta="center"
                style={{
                  fontFamily: 'Crimson Pro, serif',
                  fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                  color: '#fff',
                }}
              >
                {page?.heroTitle || 'About Our Church'}
              </Title>
              <Box className="gold-divider" />
              <Text ta="center" style={{ color: '#c9d0e8', maxWidth: 560, lineHeight: 1.7 }}>
                {page?.heroSubtitle}
              </Text>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── Sections ── */}
      <Box style={{ background: '#fdfaf5', padding: '80px 0' }}>
        <Container size="xl">
          <Stack gap={60}>
            {sortedSections.map((section, i) => {
              const Icon = icons[i % icons.length];
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={section._id || i}
                  initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Grid gutter="xl" align="center">
                    <Grid.Col span={{ base: 12, md: isEven ? 5 : 7 }}>
                      {isEven ? (
                        <Box
                          style={{
                            background: 'linear-gradient(135deg, #1a2744, #243357)',
                            borderRadius: 20,
                            padding: '48px 40px',
                            textAlign: 'center',
                          }}
                        >
                          <ThemeIcon
                            size={64}
                            radius="50%"
                            style={{
                              background: 'rgba(201,168,76,0.15)',
                              border: '2px solid rgba(201,168,76,0.3)',
                              margin: '0 auto 16px',
                              display: 'flex',
                            }}
                          >
                            <Icon size={28} color="#c9a84c" />
                          </ThemeIcon>
                          <Text
                            style={{ color: '#c9a84c', fontSize: '3rem', fontFamily: 'Crimson Pro, serif', fontWeight: 700 }}
                          >
                            {i + 1}.
                          </Text>
                        </Box>
                      ) : (
                        <Card
                          shadow="md"
                          p="xl"
                          style={{ border: '1px solid rgba(201,168,76,0.15)', background: '#fff' }}
                        >
                          <Group gap="sm" mb="md">
                            <Icon size={22} color="#c9a84c" />
                            <Title order={3} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744', fontSize: '1.5rem' }}>
                              {section.title}
                            </Title>
                          </Group>
                          <Text style={{ color: '#555', lineHeight: 1.9 }}>{section.content}</Text>
                        </Card>
                      )}
                    </Grid.Col>
                    <Grid.Col span={{ base: 12, md: isEven ? 7 : 5 }}>
                      {isEven ? (
                        <Card
                          shadow="md"
                          p="xl"
                          style={{ border: '1px solid rgba(201,168,76,0.15)', background: '#fff' }}
                        >
                          <Group gap="sm" mb="md">
                            <Icon size={22} color="#c9a84c" />
                            <Title order={3} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744', fontSize: '1.5rem' }}>
                              {section.title}
                            </Title>
                          </Group>
                          <Text style={{ color: '#555', lineHeight: 1.9 }}>{section.content}</Text>
                        </Card>
                      ) : (
                        <Box
                          style={{
                            background: 'linear-gradient(135deg, #1a2744, #243357)',
                            borderRadius: 20,
                            padding: '48px 40px',
                            textAlign: 'center',
                          }}
                        >
                          <ThemeIcon
                            size={64}
                            radius="50%"
                            style={{
                              background: 'rgba(201,168,76,0.15)',
                              border: '2px solid rgba(201,168,76,0.3)',
                              margin: '0 auto 16px',
                              display: 'flex',
                            }}
                          >
                            <Icon size={28} color="#c9a84c" />
                          </ThemeIcon>
                          <Text
                            style={{ color: '#c9a84c', fontSize: '3rem', fontFamily: 'Crimson Pro, serif', fontWeight: 700 }}
                          >
                            {i + 1}.
                          </Text>
                        </Box>
                      )}
                    </Grid.Col>
                  </Grid>
                </motion.div>
              );
            })}
          </Stack>
        </Container>
      </Box>

      {/* ── Stats Banner ── */}
      <Box style={{ background: 'linear-gradient(135deg, #1a2744, #243357)', padding: '60px 0' }}>
        <Container size="xl">
          <Grid>
            {[
              { value: '100+', label: 'Years of Faith' },
              { value: '5000+', label: 'Parishioners' },
              { value: '10+', label: 'Ministry Groups' },
              { value: '365', label: 'Days of Prayer' },
            ].map((stat, i) => (
              <Grid.Col key={i} span={{ base: 6, md: 3 }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Stack align="center" gap="xs">
                    <Text
                      style={{
                        fontFamily: 'Crimson Pro, serif',
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: '#c9a84c',
                        lineHeight: 1,
                      }}
                    >
                      {stat.value}
                    </Text>
                    <Text size="sm" style={{ color: '#c9d0e8', letterSpacing: '0.06em' }}>
                      {stat.label}
                    </Text>
                  </Stack>
                </motion.div>
              </Grid.Col>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

