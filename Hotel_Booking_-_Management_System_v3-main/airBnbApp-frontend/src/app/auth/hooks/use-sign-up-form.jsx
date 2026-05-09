import API_CONFIG from '@/config/api.config';
import { PATHS } from '@/config/path.config';
import useMutation from '@/lib/hooks/useMutation';
import { signUpSchema } from '@/lib/validators/auth-form-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const useSignUpForm = () => {

  const navigate = useNavigate();

  const { pending, mutate } = useMutation(
    API_CONFIG.AUTH.SIGN_UP,
    'POST'
  );

  const form = useForm({
    // resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  function handleSignUpSubmit(data) {
    mutate(data, {
      onSuccess: (response) => {
        console.log(response);
        toast("Sign up successful", {
          description: "User your credentials to Sign in",
          type: "success"
        })
        navigate(PATHS.SIGN_IN);
      },
      onError: (err) => {
        console.log(err);
        toast('Error: '+(err.status || ''), {
          description: err.message,
          type: 'error',
        });
      },
    });
  }

  return { form, handleSignUpSubmit, pending };
};

export { useSignUpForm };
