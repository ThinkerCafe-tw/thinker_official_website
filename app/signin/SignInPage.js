'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { TriangleAlert, LoaderCircle } from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Page from '@/components/core/Page.js';
import Cover from '@/components/core/Cover.js';
import Title from '@/components/core/Title.js';
import Subtitle from '@/components/core/Subtitle.js';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';
import { createClient } from '@/utils/supabase/client.ts';
import sanitizeRedirectPath from '@/utils/sanitizeRedirectPath.js';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = sanitizeRedirectPath(searchParams.get('redirect'));
  const signUpPath = {
    pathname: '/signup',
    query: redirectPath ? { redirect: redirectPath } : {},
  };

  const formSchema = z.object({
    email: z
      .string({ required_error: '請輸入電子信箱' })
      .min(1, '請輸入電子信箱'),

    password: z
      .string({ required_error: '請輸入密碼' })
      .min(1, '請輸入密碼'),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    setErrorMessage('');
    setLoading(true);

    const { email, password } = values;
    const supabase = createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      const { code, message } = error;
      if (code === 'invalid_credentials') {
        setErrorMessage('帳號或密碼錯誤。');
      } else {
        setErrorMessage(`[${code}] ${message}`);
      }
      setLoading(false);
      return;
    }

    router.replace(redirectPath ?? '/');
    router.refresh();
  }

  return (
    <Page>
      <Cover>
        <Title>學員登入</Title>
        <Subtitle>
          還不是學員嗎？<Link href={signUpPath} className="text-orange-400">前往註冊</Link>。
        </Subtitle>
      </Cover>
      <Form {...form}>
        <form
          className="max-w-md mx-auto space-y-5"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormCard singleColumn>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    電子信箱
                    <span className="-ml-1 text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    密碼
                    <span className="-ml-1 text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormCard>
          {errorMessage && (
            <FormCard error singleColumn>
              <p className="flex items-center gap-2">
                <TriangleAlert size={18} />
                {errorMessage}
              </p>
            </FormCard>
          )}
          <FormFooter>
            <FormButton
              primary
              type="submit"
              disabled={loading}
            >
              {loading && <LoaderCircle size={20} className="mr-1 animate-spin" />}
              登入
            </FormButton>
            <FormButton
              type="button"
              onClick={() => router.back()}
              disabled={loading}
            >
              返回
            </FormButton>
          </FormFooter>
        </form>
      </Form>
    </Page>
  );
}
