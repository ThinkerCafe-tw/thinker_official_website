export function parseCourseName(course) {
  const { course_id, zh_name } = course;
  return course ? `【${String(course_id).padStart(3, '0')}】${zh_name}` : '--';
}

export function parseCourseVariantName(courseVariant) {
  return {
    group: '小班制',
    single: '一對一',
  }[courseVariant] ?? '--';
}

export function parsePriceString(price) {
  return price ? price.toLocaleString('zh-TW') : '--';
}
