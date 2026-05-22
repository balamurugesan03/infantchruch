import { useEffect, useState } from 'react';
import {
  Container,
  Title,
  Box,
  Stack,
  SimpleGrid,
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  Modal,
  Flex,
} from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import { useDisclosure } from '@mantine/hooks';
import { IconCross, IconPhoto } from '@tabler/icons-react';
import { galleryService } from '../services/api';
import PageLoader from '../components/PageLoader';

const CATEGORIES = ['all', 'events', 'church', 'festivals', 'community', 'other'];

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [category, setCategory] = useState('all');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    galleryService
      .getGallery()
      .then((res) => {
        setImages(res.data.data);
        setFiltered(res.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (category === 'all') {
      setFiltered(images);
    } else {
      setFiltered(images.filter((img) => img.category === category));
    }
  }, [category, images]);

  const openImage = (img) => {
    setSelected(img);
    open();
  };

  if (loading) return <PageLoader />;

  return (
    <Box>
      {/* ── Hero ── */}
      <Box
        style={{
          background: 'linear-gradient(135deg, #0f1c38, #1a2744)',
          paddingTop: '140px',
          paddingBottom: '80px',
        }}
      >
        <Container size="xl">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Stack align="center" gap="md">
              <IconPhoto size={40} color="#c9a84c" />
              <Title
                order={1}
                ta="center"
                style={{ fontFamily: 'Crimson Pro, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}
              >
                Our Gallery
              </Title>
              <Box className="gold-divider" />
              <Text ta="center" style={{ color: '#c9d0e8', maxWidth: 500 }}>
                Glimpses of faith, community, and celebration at Infant Jesus Church, Puthenkad.
              </Text>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── Filter Tabs ── */}
      <Box style={{ background: '#fdfaf5', paddingTop: 40, paddingBottom: 0 }}>
        <Container size="xl">
          <Group justify="center" gap="sm" wrap="wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                onClick={() => setCategory(cat)}
                variant={category === cat ? 'filled' : 'outline'}
                size="sm"
                style={{
                  background: category === cat ? 'linear-gradient(135deg, #c9a84c, #e8d08a)' : 'transparent',
                  color: category === cat ? '#1a2744' : '#c9a84c',
                  borderColor: '#c9a84c',
                  fontWeight: category === cat ? 700 : 400,
                  textTransform: 'capitalize',
                }}
              >
                {cat}
              </Button>
            ))}
          </Group>
        </Container>
      </Box>

      {/* ── Grid ── */}
      <Box style={{ background: '#fdfaf5', padding: '40px 0 80px' }}>
        <Container size="xl">
          {filtered.length === 0 ? (
            <Stack align="center" py={60} gap="md">
              <IconPhoto size={48} color="#ccc" />
              <Text c="dimmed">No images in this category yet.</Text>
            </Stack>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing="md">
              <AnimatePresence>
                {filtered.map((img, i) => (
                  <motion.div
                    key={img._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05 }}
                    layout
                  >
                    <Card
                      className="card-hover"
                      shadow="sm"
                      p={0}
                      style={{
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: '1px solid rgba(201,168,76,0.15)',
                      }}
                      onClick={() => openImage(img)}
                    >
                      <Box style={{ overflow: 'hidden', height: 220 }}>
                        <Image
                          src={img.imageUrl}
                          alt={img.title}
                          className="gallery-img"
                          style={{ height: 220 }}
                          fallbackSrc="https://placehold.co/400x300/1a2744/c9a84c?text=Church+Photo"
                        />
                      </Box>
                      <Box p="sm">
                        <Text fw={600} size="sm" lineClamp={1} style={{ color: '#1a2744' }}>
                          {img.title}
                        </Text>
                        <Badge size="xs" variant="light" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c', marginTop: 4 }}>
                          {img.category}
                        </Badge>
                      </Box>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </SimpleGrid>
          )}
        </Container>
      </Box>

      {/* ── Lightbox ── */}
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        centered
        withCloseButton
        styles={{
          header: { background: '#1a2744' },
          body: { background: '#1a2744', padding: 0 },
          close: { color: '#c9a84c' },
        }}
      >
        {selected && (
          <Box>
            <Image
              src={selected.imageUrl}
              alt={selected.title}
              style={{ maxHeight: '70vh', objectFit: 'contain', width: '100%' }}
              fallbackSrc="https://placehold.co/800x600/1a2744/c9a84c?text=Church+Photo"
            />
            <Box p="md">
              <Text fw={700} style={{ color: '#fff', fontFamily: 'Crimson Pro, serif', fontSize: '1.2rem' }}>
                {selected.title}
              </Text>
              {selected.description && (
                <Text size="sm" style={{ color: '#c9d0e8' }} mt="xs">
                  {selected.description}
                </Text>
              )}
            </Box>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

