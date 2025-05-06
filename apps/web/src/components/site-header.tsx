interface SiteHeaderProperties {
  title: string;
}

export function SiteHeader({ title }: SiteHeaderProperties) {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="text-base font-medium">{title}</div>
      </div>
    </header>
  );
}
