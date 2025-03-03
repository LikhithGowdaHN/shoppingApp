"use client";

type CategoryTabsProps = {
  selected: string;
  setSelected: (category: string) => void;
  categories: string[];
};

const CategoryTabs = ({ selected, setSelected, categories }: CategoryTabsProps) => {
  return (
    <div className="mt-4 flex gap-4 overflow-x-auto">
      {categories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
            selected === category ? "bg-yellow-500 text-black" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => setSelected(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;