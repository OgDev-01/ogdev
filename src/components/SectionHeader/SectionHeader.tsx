interface SectionHeaderProps {
  title: string;
}

function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-primary-white/75 px-6 py-5 backdrop-blur-sm dark:bg-secondary-black/75 md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
      <h2 className="text-sm font-bold uppercase tracking-widest text-secondary-black dark:text-primary-white lg:sr-only">
        {title}
      </h2>
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
