"use client";

import * as React from "react";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";

import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
// import { NavSecondary } from "@/components/nav-secondary"
// import { NavWorkspaces } from "@/components/nav-workspaces";
// import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects";
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
  QuotesIcon,
} from "@phosphor-icons/react";

import {
  History,
  ListStart,
  Bookmark,
  Crown,
  PencilSparkles,
  // AudioWaveform,
  // Blocks,
  // Calendar,
  // Command,
  // Home,
  // Inbox,
  // MessageCircleQuestion,
  // Search,
  // Settings2,
  // Sparkles,
} from "lucide-react";

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
        icon: <QuotesIcon />,
        isActive: true,
        items: [
          {
            title: "Timeline",
            url: "#",
          },
          {
            title: "Bookmark",
            url: "#",
          },
          {
            title: "History",
            url: "#",
          },
          {
            title: "Rated Works",
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
        url: "/write",
        icon: <PlusIcon />,
      },
      {
        name: "Create New Series",
        url: "#",
        icon: <StackPlusIcon />,
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

  const data2 = {
    navMain: [
      {
        title: "Timeline",
        url: "#",
        icon: ListStart,
      },
      {
        title: "Bookmark",
        url: "#",
        icon: Bookmark,
      },
      {
        title: "History",
        url: "#",
        icon: History,
        isActive: true,
      },
      {
        title: "Ranked",
        url: "#",
        icon: Crown,
        badge: "10",
      },
      {
        title: "Created",
        url: "#",
        icon: PencilSparkles,
        badge: "10",
      },
    ],
    favorites: [
      {
        name: "Project Management & Task Tracking",
        url: "#",
        emoji: "📊",
      },
      {
        name: "Family Recipe Collection & Meal Planning",
        url: "#",
        emoji: "🍳",
      },
      {
        name: "Fitness Tracker & Workout Routines",
        url: "#",
        emoji: "💪",
      },
      {
        name: "Book Notes & Reading List",
        url: "#",
        emoji: "📚",
      },
      {
        name: "Sustainable Gardening Tips & Plant Care",
        url: "#",
        emoji: "🌱",
      },
    ],
    workspaces: [
      {
        name: "Project Management & Task Tracking",
        url: "#",
        emoji: "📊",
      },
      {
        name: "Family Recipe Collection & Meal Planning",
        url: "#",
        emoji: "🍳",
      },
      {
        name: "Fitness Tracker & Workout Routines",
        url: "#",
        emoji: "💪",
      },
      {
        name: "Book Notes & Reading List",
        url: "#",
        emoji: "📚",
      },
      {
        name: "Sustainable Gardening Tips & Plant Care",
        url: "#",
        emoji: "🌱",
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
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
        <NavMain items={data2.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavFavorites favorites={data2.favorites} />
        <NavFavorites favorites={data2.workspaces} />
        {/* <NavWorkspaces workspaces={data2.workspaces} /> */}
        {/* <NavSecondary items={data2.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
