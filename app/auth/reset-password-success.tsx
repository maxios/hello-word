import {useEffect} from 'react';
import {useRouter} from 'expo-router';
import {useToastManager} from '@/components/Toast';

const ResetPasswordSuccessScreen = () => {
  const router = useRouter();
  const {showToast} = useToastManager();

  useEffect(() => {
    showToast({
      message:
        'Password reset successful! You can now log in with your new password.',
      type: 'success',
    });

    // Redirect to login page
    router.replace('/auth/login');
  }, [router, showToast]);

  return null;
};

export default ResetPasswordSuccessScreen;
