import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Stack,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Alert,
  Group,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconCross, IconLock, IconAlertCircle } from '@tabler/icons-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Invalid email'),
      password: (v) => (v.length >= 6 ? null : 'Password must be at least 6 characters'),
    },
  });

  const handleSubmit = async (values) => {
    setError('');
    const result = await login(values.email, values.password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message);
    }
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f1c38 0%, #1a2744 60%, #243357 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <Card
        shadow="xl"
        p="xl"
        style={{
          width: '100%',
          maxWidth: 420,
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(201,168,76,0.2)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <Stack gap="lg">
          <Stack align="center" gap="xs">
            <Box
              style={{
                width: 64,
                height: 64,
                background: 'rgba(201,168,76,0.15)',
                border: '2px solid rgba(201,168,76,0.4)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <IconCross size={28} color="#c9a84c" />
            </Box>
            <Title
              order={2}
              ta="center"
              style={{ fontFamily: 'Crimson Pro, serif', color: '#fff', fontSize: '1.8rem' }}
            >
              Admin Panel
            </Title>
            <Text size="sm" style={{ color: '#8899bb' }}>
              Infant Jesus Church, Puthenkad
            </Text>
          </Stack>

          {error && (
            <Alert icon={<IconAlertCircle size={16} />} color="red" variant="light">
              {error}
            </Alert>
          )}

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email Address"
                placeholder="admin@church.com"
                leftSection={<IconLock size={16} />}
                {...form.getInputProps('email')}
                styles={{
                  label: { color: '#c9d0e8', fontWeight: 500 },
                  input: {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: '#fff',
                  },
                }}
              />
              <PasswordInput
                label="Password"
                placeholder="••••••••"
                leftSection={<IconLock size={16} />}
                {...form.getInputProps('password')}
                styles={{
                  label: { color: '#c9d0e8', fontWeight: 500 },
                  input: {
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(201,168,76,0.2)',
                    color: '#fff',
                  },
                }}
              />
              <Button
                type="submit"
                size="md"
                loading={loading}
                fullWidth
                mt="xs"
                style={{
                  background: 'linear-gradient(135deg, #c9a84c, #e8d08a)',
                  color: '#1a2744',
                  fontWeight: 700,
                  border: 'none',
                }}
              >
                Sign In
              </Button>
            </Stack>
          </form>

          <Text size="xs" ta="center" style={{ color: '#667788' }}>
            Default: admin@infantjesuschurch.com / admin123
          </Text>
        </Stack>
      </Card>
    </Box>
  );
}
