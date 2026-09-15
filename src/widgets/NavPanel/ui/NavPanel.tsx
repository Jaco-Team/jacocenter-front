"use client";
import { navPanelMock } from "../utils/mock";
import { NavLink } from "@/shared/ui/NavLink/NavLink";
import Image from "next/image";
import "./NavPanel.style.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSessionStore } from "@/entities/auth/store/sessionStore/sessionStore";
import { ProfileAvatar } from "@/entities/auth/ui/profile-avatar/ProfileAvatar";

export function NavPanel() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const logout = useSessionStore((s) => s.logout);
  const user = useSessionStore((s) => s.user);

  return (
    <div className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className={`sidebar-header ${collapsed ? 'sidebar-header-collapsed' : ''}`}>
        <button
          type="button"
          className="sidebar-toggle"
          aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
          onClick={() => setCollapsed(!collapsed)}
        >
          <span className="h-px w-[23px] bg-accent"></span>
          <span className="h-px w-[23px] bg-accent"></span>
          <span className="h-px w-[23px] bg-accent"></span>
        </button>
      </div>
      <nav className="sidebar-nav">
        <ul className={`sidebar-list ${collapsed ? 'sidebar-list-collapsed' : ''}`}>
          {navPanelMock.map((item) => (
            <li key={item.href}>
              <NavLink
                href={item.href}
                icon={item.icon}
                size={collapsed ? 'sm' : 'lg'}
              >
                {!collapsed && item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <footer className="sidebar-footer">
        <Link
          href="/lk"
          aria-label="Открыть личный кабинет"
          title={user?.name || user?.login || "Личный кабинет"}
          className={`sidebar-profile-link ${pathname === "/lk" ? "sidebar-profile-link-active" : ""}`}
        >
          <ProfileAvatar user={user} />
        </Link>
        <button
          type="button"
          className="sidebar-logout"
          style={{color: '#5E5E5E', fontSize: '16px'}}
          onClick={async () => {
            try {
              await logout();
            } finally {
              router.replace("/auth/sign-in");
            }
          }}
        >
          Выйти
        </button>
      </footer>
    </div>
  )
}
