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
    courseId: z.number({ message: '請選擇課程名稱' }).int().positive(),
    courseVariant: z.enum(['group', 'single'], { message: '請選擇上課方式' }),
  });
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      courseId: defaultCourseId,
      courseVariant: 'group',
    },
  });
  const courseId = form.watch('courseId'); 
  const courseVariant = form.watch('courseVariant'); 
  const selectedCourse = courses.find(({ course_id }) => course_id === courseId);
  const groupPrice = selectedCourse?.group_price.toLocaleString('zh-TW') ?? '';
  const groupPriceEarly = selectedCourse?.group_price_early.toLocaleString('zh-TW') ?? '';
  const singlePrice = selectedCourse?.single_price.toLocaleString('zh-TW') ?? '';
  const singlePriceEarly = selectedCourse?.single_price_early.toLocaleString('zh-TW') ?? '';
  const courseVariantName = {
    group: '小班制',
    single: '一對一',
  }[courseVariant];

  async function onSubmit(values) {
    setErrorMessage('');
    setLoading(true);

    const { courseId, courseVariant } = values;
    const price = {
      group: selectedCourse.group_price,
      single: selectedCourse.single_price,
    }[courseVariant];
    const priceEarly = {
      group: selectedCourse.group_price_early,
      single: selectedCourse.single_price_early,
    }[courseVariant];
    const supabase = createClient();
    const { data, error } = await supabase
      .from('orders')
      .insert({
        course_id: courseId,
        course_variant: courseVariant,
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
        <FormCard title="步驟 1. 選擇課程">
          <div>
            <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    課程名稱
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
                          【{String(course_id).padStart(3, '0')}】{zh_name}
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
              name="courseVariant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    上課方式
                    <span className="-ml-1 text-red-700">*</span>
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={field.value}
                      onValueChange={field.onChange}
                      className="grid grid-cols-2 gap-x-2 mt-2"
                    >
                      <FormItem className="flex items-start">
                        <FormControl>
                          <RadioGroupItem value="group" />
                        </FormControl>
                        <FormLabel className="flex-col items-start">
                          <span>小班制</span>
                          {selectedCourse && groupPriceEarly === '0' && (
                            <span className="font-bold text-orange-400">定價 {groupPrice} 元</span>
                          )}
                          {selectedCourse && groupPriceEarly !== '0' && (
                            <>
                              <span className="line-through text-gray-500">原價 {groupPrice} 元</span>
                              <span className="font-bold text-orange-400">早鳥價 {groupPriceEarly} 元</span>
                            </>
                          )}
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-start">
                        <FormControl>
                          <RadioGroupItem value="single" />
                        </FormControl>
                        <FormLabel className="flex-col items-start">
                          <span>一對一</span>
                          {selectedCourse && singlePriceEarly === '0' && (
                            <span className="font-bold text-orange-400">定價 {singlePrice} 元</span>
                          )}
                          {selectedCourse && singlePriceEarly !== '0' && (
                            <>
                              <span className="line-through text-gray-500">原價 {singlePrice} 元</span>
                              <span className="font-bold text-orange-400">早鳥價 {singlePriceEarly} 元</span>
                            </>
                          )}
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
            前往繳費
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
