import Image from "next/image";
import Link from "next/link";
import { NavLink } from "@/components/nav-link";
import { NavMenus } from "@/components/nav-menus";
import { primaryNav } from "@/lib/navigation";

/** The link to the page being viewed gets a solid yellow background (NavLink sets aria-current). */
const linkClass =
  "block rounded px-3 py-2 text-asphalt no-underline hover:bg-safety/40 aria-[current=page]:bg-safety";
/** A desktop menu heading whose dropdown holds the current page is marked the same way. */
const currentSectionClass = "group-has-[[aria-current=page]]:bg-safety";

export function SiteHeader() {
  return (
    <header className="border-b-4 border-safety bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center no-underline" aria-label="Lake Tahoe Bicycle Coalition home">
          <Image
            src="/images/2024/01/LTBC-Logo-new-2024.png"
            alt="Lake Tahoe Bicycle Coalition"
            width={200}
            height={65}
            priority
          />
        </Link>

        {/* No-JavaScript-required navigation: <details> handles the mobile menu and dropdowns;
            NavMenus adds click-outside/Escape closing when JavaScript is available. */}
        <NavMenus className="w-full md:w-auto">
          <details className="group md:hidden">
            <summary className="btn btn-secondary w-full cursor-pointer list-none">
              Menu
            </summary>
            <ul className="mt-2 space-y-1 border-t border-asphalt/10 pt-2">
              {primaryNav.map((item) => (
                <li key={item.label}>
                  <NavLink link={item} className={`${linkClass} font-bold`} />
                  {item.children ? (
                    <ul className="ml-4">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavLink link={child} className={linkClass} />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>
          </details>

          <ul className="hidden items-center gap-1 md:flex">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.label} className="relative">
                  <details className="group">
                    <summary className={`${linkClass} ${currentSectionClass} cursor-pointer list-none font-bold`}>
                      {item.label}
                      <span aria-hidden="true"> ▾</span>
                    </summary>
                    <ul className="absolute right-0 z-20 mt-1 min-w-56 rounded border border-asphalt/10 bg-white p-2 shadow-lg">
                      {item.indexLabel ? (
                        <li>
                          <NavLink link={{ label: item.indexLabel, href: item.href }} className={linkClass} />
                        </li>
                      ) : null}
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavLink link={child} className={linkClass} />
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              ) : (
                <li key={item.label}>
                  <NavLink link={item} className={`${linkClass} font-bold`} />
                </li>
              ),
            )}
          </ul>
        </NavMenus>
      </div>
    </header>
  );
}
