import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="bg-gradient-to-r from-[#8b6fd0] via-[#7c4dd6] to-[#6a4bbf] text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-x-4 gap-y-4 px-5 py-5 sm:gap-x-6 md:min-h-[100px] md:flex-nowrap md:gap-x-9 md:px-8 md:py-0 lg:px-10">
          <Link
            className="shrink-0 text-[25px] font-bold tracking-[-1.3px] lg:text-[28px]"
            href="/"
            aria-label="Warehouse home"
          >
            Mini E-commerce
          </Link>
          <form
            className="order-3 flex h-12 w-full min-w-0 items-center overflow-hidden rounded-full bg-white text-[#6a4bbf] shadow-sm md:order-none md:flex-1"
            role="search"
            action="/"
          >
            <input
              className="h-full min-w-0 flex-1 border-0 px-5 text-sm text-zinc-800 outline-none placeholder:text-zinc-400"
              name="q"
              type="search"
              placeholder="ค้นหาสินค้า..."
              aria-label="ค้นหาสินค้า"
            />
            <button
              className="grid h-full w-12 shrink-0 cursor-pointer place-items-center"
              type="submit"
              aria-label="Search"
            >
              <Icon>
                <circle cx="10.8" cy="10.8" r="6.2" />
                <path d="m16 16 4.5 4.5" />
              </Icon>
            </button>
          </form>
          <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
            <a href="#account" aria-label="Account">
              <Icon>
                <circle cx="12" cy="7.5" r="3.5" />
                <path d="M4.5 20v-1.5a7.5 7.5 0 0 1 15 0V20" />
              </Icon>
            </a>
            <a href="#wishlist" aria-label="Wishlist">
              <Icon>
                <path d="M20.5 8.4c0 4.1-8.5 10-8.5 10s-8.5-5.9-8.5-10a4.5 4.5 0 0 1 8.5-2 4.5 4.5 0 0 1 8.5 2Z" />
              </Icon>
            </a>
            <a className="relative" href="#cart" aria-label="Cart, 0 items">
              <Icon>
                <path d="M4 9h16l-1.4 10H5.4L4 9ZM8 9l4-5 4 5M9 13v3m6-3v3" />
              </Icon>
              <span className="absolute -top-3 -right-2 grid size-4 place-items-center rounded-full bg-[#ff646b] text-[10px] font-bold">
                0
              </span>
            </a>
            <a href="#settings" aria-label="Settings">
              <Icon>
                <path
                  d="M12 2.5 13.2 5l2 .8 2.6-1 2.4 2.4-1 2.6.8 2 2.5 1.2v3.4L20 17.6l-.8 2 1 2.6-2.4 2.4-2.6-1-2 .8-1.2 2.5-3.4-1.2-.8-2-2.6 1-2.4-2.4 1-2.6-.8-2L.5 16.4V13l2.5-1.2.8-2-1-2.6 2.4-2.4 2.6 1 2-.8L11 2.5Z"
                  transform="translate(2 1) scale(.8)"
                />
                <circle cx="12" cy="13" r="3" />
              </Icon>
            </a>
          </div>
        </div>
        <nav
          className="grid grid-cols-2 gap-x-3 gap-y-1 border-t border-white/10 px-5 py-2 text-sm font-bold [&>a]:flex [&>a]:min-h-11 [&>a]:items-center [&>a]:justify-center [&>a]:rounded-md [&>a]:px-2 [&>a]:text-center [&>a]:hover:bg-white/10 [&>a]:focus-visible:outline-2 [&>a]:focus-visible:outline-white md:flex md:min-h-14 md:items-center md:justify-center md:gap-8 md:py-1 md:text-[15px] lg:gap-10"
          aria-label="เมนูหลัก"
        >
          <Link href="/">HOME</Link>
          <a href="#new-arrival">NEW ARRIVAL</a>
          <a href="#category">CATEGORY</a>
          <a href="#products">PRODUCTS</a>
          <a href="#sales">SALES</a>
          <a href="#contact">CONTACT</a>
        </nav>
      </header>
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#f8f5ff] via-[#eee7ff] to-[#dacbfa]">
          <div
            className="pointer-events-none absolute -top-24 right-[-80px] size-80 rounded-full bg-white/50 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-28 left-1/3 size-72 rounded-full bg-[#8b6fd0]/25 blur-3xl"
            aria-hidden="true"
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-4 px-5 py-12 sm:px-8 sm:py-16 md:min-h-[440px] md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-8 md:py-10 lg:px-10">
            <div className="relative z-10 max-w-lg text-center md:text-left">
              <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-semibold tracking-[0.15em] text-[#6a4bbf] shadow-sm">
                NEW SEASON · NEW FAVORITES
              </span>
              <h1 className="mt-6 text-4xl leading-[1.08] font-bold tracking-tight text-[#392567] sm:text-5xl lg:text-6xl">
                Upgrade your
                <br />
                everyday.
              </h1>
              <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#66577d] sm:text-base md:mx-0">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <a
                href="#products"
                className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-[#7c4dd6] px-7 text-sm font-semibold text-white shadow-lg shadow-purple-900/15 transition-colors hover:bg-[#6a4bbf] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6a4bbf]"
              >
                Shop <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="relative mx-auto flex w-full max-w-[580px] items-center justify-center md:max-w-none">
              <div
                className="absolute inset-[14%] rounded-full bg-white/50 blur-3xl"
                aria-hidden="true"
              />
              <Image
                src="/hero-products-purple.png"
                alt="Purple and cream headphones, portable speaker, and camera"
                width={1536}
                height={1024}
                priority
                className="relative h-auto w-full drop-shadow-[0_22px_28px_rgba(78,48,126,0.15)]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
