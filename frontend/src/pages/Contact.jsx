import { useState } from 'react';
import {
  Container,
  Grid,
  Title,
  Box,
  Stack,
  Card,
  Text,
  TextInput,
  Textarea,
  Button,
  Alert,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import { notifications } from '@mantine/notifications';
import {
  IconCross,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCheck,
  IconAlertCircle,
  IconClock,
  IconSend,
} from '@tabler/icons-react';
import { contactService } from '../services/api';

const contactInfo = [
  {
    icon: IconMapPin,
    label: 'Address',
    value: 'Puthenkada, Thirupuram\nNEYYATTINKARA, KERALA 695133\nIndia',
  },
  { icon: IconPhone, label: 'Phone', value: '+91 9822639678' },
  { icon: IconMail, label: 'Email', value: 'sajisac@gmail.com' },
  { icon: IconClock, label: 'Office Hours', value: 'Mon–Sat: 9 AM – 5 PM\nSunday: After Morning Mass' },
];

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm({
    initialValues: { name: '', email: '', phone: '', subject: '', message: '' },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Name is required' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Valid email required'),
      subject: (v) => (v.trim().length < 3 ? 'Subject is required' : null),
      message: (v) => (v.trim().length < 10 ? 'Message must be at least 10 characters' : null),
    },
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await contactService.sendMessage(values);
      setSubmitted(true);
      form.reset();
      notifications.show({
        title: 'Message Sent!',
        message: 'We will get back to you soon. God bless you!',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch (err) {
      notifications.show({
        title: 'Error',
        message: err.response?.data?.message || 'Failed to send message. Please try again.',
        color: 'red',
        icon: <IconAlertCircle size={16} />,
      });
    } finally {
      setSubmitting(false);
    }
  };

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
              <IconCross size={40} color="#c9a84c" />
              <Title
                order={1}
                ta="center"
                style={{ fontFamily: 'Crimson Pro, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#fff' }}
              >
                Contact Us
              </Title>
              <Box className="gold-divider" />
              <Text ta="center" style={{ color: '#c9d0e8', maxWidth: 500 }}>
                We'd love to hear from you. Reach out to us for any queries, prayers, or to join our community.
              </Text>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* ── Main Content ── */}
      <Box style={{ background: '#fdfaf5', padding: '80px 0' }}>
        <Container size="xl">
          <Grid gutter="xl">
            {/* Contact Info */}
            <Grid.Col span={{ base: 12, md: 5 }}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Stack gap="md">
                  <Title
                    order={2}
                    style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744', fontSize: '2rem' }}
                  >
                    Get In Touch
                  </Title>
                  <Box className="gold-divider" style={{ margin: 0 }} />
                  <Text style={{ color: '#555', lineHeight: 1.8 }}>
                    Whether you need spiritual guidance, want to participate in parish activities, or simply
                    want to connect with our community — we are here for you.
                  </Text>

                  <Stack gap="md" mt="md">
                    {contactInfo.map((info, i) => (
                      <Card
                        key={i}
                        p="md"
                        style={{ border: '1px solid rgba(201,168,76,0.15)', background: '#fff' }}
                      >
                        <Group gap="md" align="flex-start">
                          <Box
                            style={{
                              width: 44,
                              height: 44,
                              background: 'rgba(201,168,76,0.1)',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <info.icon size={20} color="#c9a84c" />
                          </Box>
                          <Box>
                            <Text size="xs" style={{ color: '#c9a84c', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                              {info.label}
                            </Text>
                            <Text size="sm" style={{ color: '#333', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                              {info.value}
                            </Text>
                          </Box>
                        </Group>
                      </Card>
                    ))}
                  </Stack>
                </Stack>
              </motion.div>
            </Grid.Col>

            {/* Contact Form */}
            <Grid.Col span={{ base: 12, md: 7 }}>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card
                  shadow="md"
                  p="xl"
                  style={{ border: '1px solid rgba(201,168,76,0.15)', background: '#fff' }}
                >
                  <Title
                    order={3}
                    mb="lg"
                    style={{ fontFamily: 'Crimson Pro, serif', color: '#1a2744', fontSize: '1.6rem' }}
                  >
                    Send Us a Message
                  </Title>

                  {submitted && (
                    <Alert
                      icon={<IconCheck size={16} />}
                      title="Message Sent!"
                      color="green"
                      mb="md"
                      withCloseButton
                      onClose={() => setSubmitted(false)}
                    >
                      Thank you for reaching out. We will respond to you shortly. God bless you!
                    </Alert>
                  )}

                  <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Your Name"
                            placeholder="John Joseph"
                            required
                            {...form.getInputProps('name')}
                            styles={{ label: { color: '#555', fontWeight: 500 } }}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Email Address"
                            placeholder="john@example.com"
                            required
                            {...form.getInputProps('email')}
                            styles={{ label: { color: '#555', fontWeight: 500 } }}
                          />
                        </Grid.Col>
                      </Grid>

                      <Grid>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Phone (Optional)"
                            placeholder="+91 9876 543 210"
                            {...form.getInputProps('phone')}
                            styles={{ label: { color: '#555', fontWeight: 500 } }}
                          />
                        </Grid.Col>
                        <Grid.Col span={{ base: 12, sm: 6 }}>
                          <TextInput
                            label="Subject"
                            placeholder="How can we help you?"
                            required
                            {...form.getInputProps('subject')}
                            styles={{ label: { color: '#555', fontWeight: 500 } }}
                          />
                        </Grid.Col>
                      </Grid>

                      <Textarea
                        label="Your Message"
                        placeholder="Write your message here..."
                        rows={5}
                        required
                        {...form.getInputProps('message')}
                        styles={{ label: { color: '#555', fontWeight: 500 } }}
                      />

                      <Button
                        type="submit"
                        size="md"
                        loading={submitting}
                        leftSection={<IconSend size={16} />}
                        style={{
                          background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                          color: '#1a2744',
                          fontWeight: 700,
                          border: 'none',
                          alignSelf: 'flex-start',
                        }}
                      >
                        Send Message
                      </Button>
                    </Stack>
                  </form>
                </Card>
              </motion.div>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* ── Map placeholder ── */}
      <Box
        style={{
          background: '#1a2744',
          height: 280,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stack align="center" gap="sm">
          <IconMapPin size={40} color="#c9a84c" />
          <Text style={{ color: '#c9d0e8', fontFamily: 'Crimson Pro, serif', fontSize: '1.2rem' }}>
            Puthenkada, Thirupuram, NEYYATTINKARA, Kerala
          </Text>
          <Text size="sm" c="dimmed">
            Embed Google Map here for production
          </Text>
        </Stack>
      </Box>
    </Box>
  );
}

