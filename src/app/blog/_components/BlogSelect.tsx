"use client";
import { useRouter } from 'next/navigation';

export function BlogSelect({ options, current }) {
  const { push } = useRouter();

  const handleSelectChange = (event) => {
    const category = event.target.value;

    // If "All" is selected (empty value), go to /blog
    // Otherwise, go to /blog/category-name
    if (!category || category === "all") {
      push('/blog');
    } else {
      // Clean the category string just in case it has spaces/caps
      const slug = category.replace(/\s+/g, '-');
      push(`/blog/${slug}`);
    }
  };


  return (
    <label className="flex items-center gap-2 text-gray-800 font-medium whitespace-nowrap">
      Select Category:
      <select 
        value={current} 
        onChange={handleSelectChange} 
        className="bg-white border border-gray-400 p-1 rounded text-sm focus:ring-2 focus:ring-gray-500 outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}