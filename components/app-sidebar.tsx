"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarMenuButton,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  BooksIcon,
  CalendarDotsIcon,
  PlusIcon,
  StackPlusIcon,
  SmileyMeltingIcon,
  UsersIcon,
  QuotesIcon  ,
} from "@phosphor-icons/react";

// This is sample data.
const brand = {
  name: "Reading Platform",
  logo: <BooksIcon />,
  plan: "Social and Entertainment",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
const user = useAuthStore((state) => state.user);

const data = {
  user: {
    pen_name: user?.pen_name || "Guest",
    email: user?.email || "u@example.com",
    photo: user?.photo || "/dragon-book.avif",
  },
  navMain: [
    {
      title: "Discovery",
      url: "#",
      icon: <QuotesIcon   />,
      isActive: true,
      items: [
        {
          title: "Followed",
          url: "#",
        },
        {
          title: "Timeline",
          url: "#",
        },
        {
          title: "Book of Fame",
          url: "#",
        },
      ],
    },
    {
      title: "Activity",
      url: "#",
      icon: <CalendarDotsIcon />,
      items: [
                {
          title: "Finished",
          url: "#",
        },
        {
          title: "Ongoing",
          url: "#",
        },
        {
          title: "Rated Fiction",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Create New Story",
      url: "#",
      icon: <PlusIcon  />,
    },
    {
      name: "Create New Series",
      url: "#",
      icon: <StackPlusIcon  />,
    },
    {
      name: "Following",
      url: "#",
      icon: <SmileyMeltingIcon />,
    },
    {
      name: "Followers",
      url: "#",
      icon: <UsersIcon />,
    },
  ],
};


  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Link href="/" className="flex">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground mr-2">
              {brand.logo}
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{brand.name}</span>
              <span className="truncate text-xs">{brand.plan}</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
