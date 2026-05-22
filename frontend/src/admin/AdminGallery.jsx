import { useEffect, useState } from 'react';
import {
  Box, Card, Title, Text, Stack, Button, Group, SimpleGrid, Image,
  Badge, ActionIcon, Modal, TextInput, Textarea, Select, FileInput, Alert,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash, IconCheck, IconPhoto, IconAlertCircle } from '@tabler/icons-react';
import { galleryService } from '../services/api';

const CATEGORIES = ['events', 'church', 'festivals', 'community', 'other'];

const emptyForm = { title: '', description: '', category: 'other', image: null };

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmOpened, { open: openConfirm, close: closeConfirm }] = useDisclosure(false);
  const [preview, setPreview] = useState(null);

  const fetchImages = () => {
    setLoading(true);
    galleryService.getAllGallery()
      .then((res) => setImages(res.data.data || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchImages(); }, []);

  const handleFileChange = (file) => {
    setForm((prev) => ({ ...prev, image: file }));
    if (file) setPreview(URL.createObjectURL(file));
    else setPreview(null);
  };

  const handleUpload = async () => {
    if (!form.title || !form.image) {
      notifications.show({ title: 'Missing fields', message: 'Title and image are required.', color: 'orange' });
      return;
    }
    setUploading(true);
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('description', form.description);
    fd.append('category', form.category);
    fd.append('image', form.image);
    try {
      await galleryService.addImage(fd);
      notifications.show({ title: 'Uploaded!', message: 'Image added to gallery.', color: 'green', icon: <IconCheck size={16} /> });
      setForm(emptyForm);
      setPreview(null);
      close();
      fetchImages();
    } catch (err) {
      notifications.show({ title: 'Upload failed', message: err.response?.data?.message || 'Try again.', color: 'red', icon: <IconAlertCircle size={16} /> });
    } finally {
      setUploading(false);
    }
  };

  const confirmDelete = (id) => {
    setDeleteTarget(id);
    openConfirm();
  };

  const handleDelete = async () => {
    try {
      await galleryService.deleteImage(deleteTarget);
      notifications.show({ title: 'Deleted', message: 'Image removed.', color: 'green' });
      fetchImages();
    } catch {
      notifications.show({ title: 'Error', message: 'Delete failed.', color: 'red' });
    } finally {
      closeConfirm();
      setDeleteTarget(null);
    }
  };

  const togglePublish = async (img) => {
    try {
      await galleryService.updateImage(img._id, { isPublished: !img.isPublished });
      fetchImages();
    } catch {
      notifications.show({ title: 'Error', message: 'Update failed.', color: 'red' });
    }
  };

  return (
    <Box p={{ base: 'sm', sm: 'xl' }}>
      <Stack gap="xl">
        <Group justify="space-between" wrap="wrap">
          <Title order={2} style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744' }}>
            Gallery Management
          </Title>
          <Button leftSection={<IconPlus size={16} />} onClick={open}
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}>
            Upload Image
          </Button>
        </Group>

        {loading ? (
          <Text c="dimmed">Loading images...</Text>
        ) : images.length === 0 ? (
          <Alert icon={<IconPhoto size={16} />} color="gray">No images yet. Upload your first image!</Alert>
        ) : (
          <SimpleGrid cols={{ base: 2, sm: 3, md: 4 }} spacing="md">
            {images.map((img) => (
              <Card key={img._id} shadow="sm" p={0} style={{ border: '1px solid #e8e8e8', overflow: 'hidden' }}>
                <Box style={{ position: 'relative', height: 180, overflow: 'hidden' }}>
                  <Image
                    src={img.imageUrl}
                    alt={img.title}
                    style={{ height: 180, objectFit: 'cover' }}
                    fallbackSrc="https://placehold.co/300x200/e8e8e8/999?text=Image"
                  />
                  {!img.isPublished && (
                    <Badge
                      style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.6)', color: '#fff' }}
                      size="xs"
                    >
                      Hidden
                    </Badge>
                  )}
                </Box>
                <Box p="sm">
                  <Text fw={600} size="xs" lineClamp={1}>{img.title}</Text>
                  <Group justify="space-between" mt="xs">
                    <Badge size="xs" style={{ background: 'rgba(201,168,76,0.1)', color: '#c9a84c' }}>
                      {img.category}
                    </Badge>
                    <Group gap="xs">
                      <ActionIcon
                        size="sm"
                        variant="light"
                        color={img.isPublished ? 'gray' : 'green'}
                        onClick={() => togglePublish(img)}
                        title={img.isPublished ? 'Hide' : 'Publish'}
                      >
                        <IconCheck size={12} />
                      </ActionIcon>
                      <ActionIcon size="sm" color="red" variant="light" onClick={() => confirmDelete(img._id)}>
                        <IconTrash size={12} />
                      </ActionIcon>
                    </Group>
                  </Group>
                </Box>
              </Card>
            ))}
          </SimpleGrid>
        )}
      </Stack>

      {/* Upload Modal */}
      <Modal opened={opened} onClose={close} title="Upload New Image" centered size="md">
        <Stack gap="md">
          {preview && (
            <Image src={preview} alt="Preview" style={{ height: 200, objectFit: 'cover', borderRadius: 8 }} />
          )}
          <FileInput
            label="Select Image"
            placeholder="Click to select image"
            accept="image/*"
            required
            onChange={handleFileChange}
          />
          <TextInput
            label="Title"
            placeholder="Image title"
            required
            value={form.title}
            onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
          />
          <Textarea
            label="Description (optional)"
            placeholder="Brief description..."
            rows={2}
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
          />
          <Select
            label="Category"
            value={form.category}
            onChange={(v) => setForm((p) => ({ ...p, category: v }))}
            data={CATEGORIES.map((c) => ({ value: c, label: c.charAt(0).toUpperCase() + c.slice(1) }))}
          />
          <Button
            loading={uploading}
            onClick={handleUpload}
            style={{ background: 'linear-gradient(135deg, #c9a84c, #e8d08a)', color: '#1a2744', border: 'none' }}
          >
            Upload
          </Button>
        </Stack>
      </Modal>

      {/* Delete Confirm */}
      <Modal opened={confirmOpened} onClose={closeConfirm} title="Confirm Delete" centered size="sm">
        <Text mb="xl">Are you sure you want to delete this image? This cannot be undone.</Text>
        <Group justify="flex-end" gap="sm">
          <Button variant="default" onClick={closeConfirm}>Cancel</Button>
          <Button color="red" onClick={handleDelete}>Delete</Button>
        </Group>
      </Modal>
    </Box>
  );
}

