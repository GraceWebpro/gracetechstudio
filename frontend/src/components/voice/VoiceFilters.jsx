import {
    Search,
    SlidersHorizontal,
    ArrowUpDown,
  } from "lucide-react";
  
  
  export default function VoiceFilters({
    search,
    onSearch,
  
    filter,
    onFilterChange,
  
    language,
    onLanguageChange,
  
    sort,
    onSortChange,
  
    total = 0,
  }) {
  
    return (
  
      <div
        className="
          mb-8
          flex
          flex-col
          gap-4
  
          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
  
  
        {/* LEFT SIDE */}
  
        <div
          className="
            flex
            flex-col
            gap-3
  
            sm:flex-row
            sm:items-center
  
            flex-1
            min-w-0
          "
        >
  
  
          {/* SEARCH */}
  
          <div
            className="
              flex
              items-center
              gap-2
  
              w-full
              sm:w-[260px]
              lg:w-[320px]
  
              rounded-xl
              border
              border-border
              bg-surface
  
              px-3
              py-3
  
              shrink-0
            "
          >
  
            <Search
              size={17}
              className="text-muted shrink-0"
            />
  
  
            <input
              value={search}
              onChange={(e)=>
                onSearch(e.target.value)
              }
              placeholder="Search voices..."
              className="
                w-full
                bg-transparent
                outline-none
                text-sm
              "
            />
  
          </div>
  
  
  
          {/* VOICE TYPE */}
  
          <div
  className="
    flex
    items-center

    w-fit

    rounded-xl
    border
    border-border
    bg-surface

    p-1
    gap-1
  "
>
  
            <FilterButton
              active={filter==="all"}
              onClick={()=>
                onFilterChange("all")
              }
            >
              All
            </FilterButton>
  
  
            <FilterButton
              active={filter==="mine"}
              onClick={()=>
                onFilterChange("mine")
              }
            >
              Mine
            </FilterButton>
  
  
            <FilterButton
              active={filter==="ai"}
              onClick={()=>
                onFilterChange("ai")
              }
            >
              AI
            </FilterButton>
  
  
          </div>
  
  
        </div>
  
  
  
  
        {/* RIGHT SIDE */}
  
        <div
          className="
            flex
            items-center
            gap-3
  
            flex-wrap
  
            lg:flex-nowrap
          "
        >
  
  
          {/* LANGUAGE */}
  
          <select
            value={language}
            onChange={(e)=>
              onLanguageChange(e.target.value)
            }
            className="
              rounded-xl
              border
              border-border
  
              bg-surface
  
              px-3
              py-3
  
              text-sm
  
              outline-none
  
              w-full
              sm:w-auto
            "
          >
  
            <option value="all">
              Languages
            </option>
  
            <option value="en">
              English
            </option>
  
            <option value="fr">
              French
            </option>
  
            <option value="es">
              Spanish
            </option>
  
            <option value="de">
              German
            </option>
  
          </select>
  
  
  
          {/* SORT */}
  
          <div
            className="
              flex
              items-center
              gap-2
  
              rounded-xl
  
              border
              border-border
  
              bg-surface
  
              px-3
  
              w-full
              sm:w-auto
            "
          >
  
            <ArrowUpDown
              size={15}
              className="text-muted"
            />
  
  
            <select
              value={sort}
              onChange={(e)=>
                onSortChange(e.target.value)
              }
              className="
                bg-transparent
  
                py-3
  
                text-sm
  
                outline-none
              "
            >
  
              <option value="recent">
                Recent
              </option>
  
              <option value="name">
                Name
              </option>
  
              <option value="usage">
                Usage
              </option>
  
            </select>
  
          </div>
  
  
  
  
          {/* COUNT */}
  
          <div
            className="
              flex
              items-center
              gap-2
  
              rounded-xl
  
              bg-primary/10
  
              px-3
              py-3
  
              text-primary
  
              text-sm
              font-medium
  
              whitespace-nowrap
            "
          >
  
            <SlidersHorizontal size={15}/>
  
            {total}
  
          </div>
  
  
        </div>
  
  
      </div>
  
    );
  
  }
  
  
  
  
  function FilterButton({
    children,
    active,
    onClick,
  }) {
  
  
  return (
  
  <button
  
  onClick={onClick}
  
  className={`
    px-3
    py-2
  
    text-xs
    sm:text-sm
  
    font-medium
    rounded-lg
    whitespace-nowrap
  
    transition-all
    duration-200
  
    ${
      active
      ?
      "bg-primary text-white rounded-xl shadow-md"
      :
      "hover:bg-background rounded-xl text-muted"
    }
  
  `}
  
  >
  
  {children}
  
  </button>
  
  );
  
  
  }