'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  RadioGroup,
  RadioGroupItem,
} from '@/components/ui/radio-group';
import FormCard from '@/components/core/FormCard.js';
import FormFooter from '@/components/core/FormFooter.js';
import FormButton from '@/components/core/FormButton.js';
import { createClient } from '@/utils/supabase/client.ts';

export default function BuyCourseForm({ courses, defaultCourseId }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const formSchema = z.object({
    courseId: z.number({ message: '請選擇課程' }).int().positive(),
    variant: z.union([z.literal(0), z.literal(1)], { message: '請選擇班制' }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: defaultCourseId,
      variant: 0,
    },
  });
  const courseId = form.watch('courseId'); 
  const variant = form.watch('variant'); 
  const selectedCourse = courses.find(({ course_id }) => course_id === courseId);
  const variantName = {
    0: '小班制',
    1: '一對一',
  }[variant];
  const price = selectedCourse ? {
    0: selectedCourse.group_price,
    1: selectedCourse.single_price,
  }[variant] : 0;
  const priceEarly = selectedCourse ? {
    0: selectedCourse.group_price_early,
    1: selectedCourse.single_price_early,
  }[variant] : 0;

  async function onSubmit(values) {
    setErrorMessage('');
    setLoading(true);

    const { courseId, variant } = values;
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        course_id: courseId,
        variant,
        total: priceEarly || price,
      })
      .select();

    if (error) {
      const { code, message } = error;
      setErrorMessage(`[${code}] ${message}`);
      setLoading(false);
      return;
    }

    router.replace(`/order/${data[0].order_id}`);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form
        className="max-w-3xl mx-auto space-y-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormCard title="選擇課程與班制">
          <div>
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    課程
                    <span className="-ml-1 text-red-700">*</span>
                  </FormLabel>
                  <Select
                    value={String(field.value)}
                    onValueChange={value => field.onChange(Number(value))}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full min-w-0">
                        <SelectValue placeholder="請選擇" className="truncate" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {courses.map(({ course_id, zh_name }) => (
                        <SelectItem key={course_id} value={String(course_id)}>
                          [{String(course_id).padStart(3, '0')}] {zh_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="variant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    班制
                    <span className="-ml-1 text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex items-center space-x-2"
                    >
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value={0} />
                        </FormControl>
                        <FormLabel>
                          小班制
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center">
                        <FormControl>
                          <RadioGroupItem value={1} />
                        </FormControl>
                        <FormLabel>
                          一對一
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </FormCard>
        <FormCard singleColumn title="訂單預覽">
          {selectedCourse ? (
            <>
              <p>
                [{String(selectedCourse.course_id).padStart(3, '0')}]
                {' '}
                {selectedCourse.zh_name}
                {'、'}
                {variantName}
              </p>
              <p>
                {priceEarly ? (
                  <>
                    <span className="line-through text-gray-500">原價 {price} 元</span>
                    <br />
                    早鳥價 <span className="font-bold text-orange-400">{priceEarly}</span> 元
                  </>
                ) : (
                  <>
                    售價 <span className="font-bold text-orange-400">{price}</span> 元
                  </>
                )}
              </p>
            </>
          ): (
            <p>無</p>
          )}
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
            前往結帳
          </FormButton>
          <FormButton
            type="button"
            onClick={() => router.back()}
            disabled={loading}
          >
            回上一頁
          </FormButton>
        </FormFooter>
      </form>
    </Form>
  );
}
