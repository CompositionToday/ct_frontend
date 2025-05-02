import { useEffect, useState } from 'react';
import { TextInput, Textarea, Button, Container, Title, Group } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { deleteUser } from 'firebase/auth';

const BACKEND_URL = 'https://oyster-app-7l5vz.ondigitalocean.app/compositiontoday';

export default function UpdateInfo() {
  const [bio, setBio] = useState('');
  const [link, setLink] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;
      const res = await fetch(`${BACKEND_URL}/users/${user.uid}`);
      const data = await res.json();
      setBio(data.bio || '');
      setLink(data.link || '');
    };

    fetchUserData();
  }, [user]);

  const handleUpdate = async () => {
    if (!user) return;
    try {
      const res = await fetch(`${BACKEND_URL}/users/${user.uid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio, link }),
      });

      if (!res.ok) throw new Error('Failed to update');

      showNotification({
        title: 'Updated',
        message: 'Your profile was updated successfully.',
        color: 'green',
      });
    } catch (err) {
      showNotification({
        title: 'Error',
        message: 'Failed to update profile.',
        color: 'red',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This cannot be undone.'
    );

    if (!confirmed) return;

    try {
      await fetch(`${BACKEND_URL}/users/${user.uid}`, {
        method: 'DELETE',
      });

      await deleteUser(user);

      showNotification({
        title: 'Account Deleted',
        message: 'Your account has been permanently deleted.',
        color: 'green',
      });

      navigate('/');
    } catch (error) {
      showNotification({
        title: 'Error',
        message: 'Failed to delete account. Please try again.',
        color: 'red',
      });
    }
  };

  return (
    <Container size="sm" mt="md">
      <Title order={2} mb="lg">
        Update Your Profile
      </Title>

      <Textarea
        label="Biography"
        placeholder="Your Biography"
        value={bio}
        onChange={(e) => setBio(e.currentTarget.value)}
        mb="md"
      />

      <TextInput
        label="Personal Link"
        placeholder="Your website link"
        value={link}
        onChange={(e) => setLink(e.currentTarget.value)}
        mb="md"
      />

      <Group position="apart" mt="lg">
        <Button onClick={handleUpdate}>Save Changes</Button>
        <Button color="red" onClick={handleDeleteAccount}>
          Delete Account
        </Button>
      </Group>
    </Container>
  );
}
